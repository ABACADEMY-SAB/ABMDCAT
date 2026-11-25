// =====================================
// TEST CONTROLLER - PostgreSQL
// =====================================

const Test = require("../models/test");

const db = require("../config/database");

// =====================================
// PREPARE FIXED TEST QUESTIONS
// =====================================

async function createQuestionsSnapshot(testId) {

    const result = await db.query(
        `SELECT
            tq.id AS test_question_id,
            tq.mcq_id AS source_question_id,
            'bank' AS question_source,
            m.subject,
            m.chapter,
            m.topic,
            m.question,
            m.optiona,
            m.optionb,
            m.optionc,
            m.optiond,
            m.answer AS correct_answer,
            m.explanation
         FROM test_questions tq
         INNER JOIN mcqs m ON m.id = tq.mcq_id
         WHERE tq.test_id = $1

         UNION ALL

         SELECT
            tmq.id AS test_question_id,
            tmq.id AS source_question_id,
            'manual' AS question_source,
            tmq.subject,
            tmq.chapter,
            tmq.topic,
            tmq.question,
            tmq.optiona,
            tmq.optionb,
            tmq.optionc,
            tmq.optiond,
            tmq.answer AS correct_answer,
            tmq.explanation
         FROM test_manual_questions tmq
         WHERE tmq.test_id = $1`,
        [testId]
    );

    const questions = result.rows;

    // Randomize once when the attempt is created
    questions.sort(() => Math.random() - 0.5);

    return questions.map((question, index) => ({
        ...question,
        question_order: index + 1
    }));
}


// =====================================
// Get All Tests
// =====================================

exports.getAllTests = (req, res) => {

    Test.getAll((err, result) => {

        if (err) {

            console.error(
                "Get tests error:",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Database error"
            });

        }

        return res.json({
            success: true,
            tests: result.rows
        });

    });

};


// =====================================
// Get Test By ID
// =====================================

exports.getTestById = (req, res) => {

    const { id } = req.params;

    Test.getById(id, (err, result) => {

        if (err) {

            console.error(
                "Get test error:",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Database error"
            });

        }

        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Test not found"
            });

        }

        return res.json({
            success: true,
            test: result.rows[0]
        });

    });

};


// =====================================
// Create Test
// =====================================

exports.createTest = (req, res) => {

    const {
        title,
        description,
        subject,
        chapter,
        topic,
        total_questions,
        duration_minutes,
        start_time,
        end_time,
        status
    } = req.body;


    if (
        !title ||
        !subject ||
        !total_questions ||
        !duration_minutes
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Title, subject, total questions and duration are required"
        });

    }


    Test.create(
        {
            title,
            description,
            subject,
            chapter,
            topic,
            total_questions,
            duration_minutes,
            start_time,
            end_time,
            status
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Create test error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }

            return res.status(201).json({

                success: true,

                message:
                    "Online Test Created Successfully",

                test:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// Update Test
// =====================================

exports.updateTest = (req, res) => {

    const { id } = req.params;

    const {
    title,
    description,
    subject,
    chapter,
    topic,
    total_questions,
    duration_minutes,
    start_time,
    end_time,
    status
} = req.body;


    Test.update(
        id,
        {
            title,
            description,
            subject,
            chapter,
            topic,
            total_questions,
            duration_minutes,
            start_time,
            end_time,
            status
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Update test error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }

            if (result.rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Test not found"
                });

            }

            return res.json({

                success: true,

                message:
                    "Test Updated Successfully",

                test:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// Delete Test
// =====================================

exports.deleteTest = (req, res) => {

    const { id } = req.params;

    Test.delete(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Delete test error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }

            if (result.rowCount === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Test not found"
                });

            }

            return res.json({

                success: true,

                message:
                    "Test Deleted Successfully"

            });

        }
    );

};


// =====================================
// Start or Resume Test
// =====================================

exports.startTest = async (req, res) => {

    try {

        const testId = Number(req.params.id);
        const studentId = Number(req.body.student_id);

        if (
            !Number.isInteger(testId) || testId <= 0 ||
            !Number.isInteger(studentId) || studentId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid test or student ID."
            });
        }

        // Get test details
        const testResult = await db.query(
            "SELECT * FROM tests WHERE id = $1",
            [testId]
        );

        if (testResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Test not found."
            });
        }

        const test = testResult.rows[0];

        if (String(test.status).toLowerCase() !== "published") {
            return res.status(400).json({
                success: false,
                message: "This test is not available."
            });
        }

        if (!test.start_time || !test.end_time) {
            return res.status(400).json({
                success: false,
                message: "Test schedule is not configured."
            });
        }

        const now = new Date();
        const startTime = new Date(test.start_time);
        const endTime = new Date(test.end_time);

        if (now < startTime) {
            return res.status(400).json({
                success: false,
                message: "This test has not started yet."
            });
        }

        const isOfficial = now <= endTime;

        // Prepare safe attempt data for the student
        const prepareAttemptResponse = (attempt) => {

            const safeQuestions = (
                attempt.questions_snapshot || []
            ).map(question => {

                const {
                    correct_answer,
                    answer,
                    explanation,
                    ...safeQuestion
                } = question;

                return safeQuestion;
            });

            return {
                ...attempt,
                questions_snapshot: safeQuestions
            };

        };

        // Find existing official attempt
        const officialResult = await db.query(
            `SELECT *
             FROM test_attempts
             WHERE student_id = $1
             AND test_id = $2
             AND attempt_type = 'official'
             LIMIT 1`,
            [studentId, testId]
        );

        let officialAttempt = officialResult.rows[0];

        if (officialAttempt) {

            // Automatically submit expired official attempt
            if (
                officialAttempt.status === "in_progress" &&
                new Date(officialAttempt.expires_at) <= now
            ) {

                await finalizeTestAttempt(
                    officialAttempt.id,
                    "auto_submitted"
                );

                const refreshed = await db.query(
                    `SELECT *
                     FROM test_attempts
                     WHERE id = $1`,
                    [officialAttempt.id]
                );

                officialAttempt = refreshed.rows[0];

            }

            // Resume unfinished official attempt
            if (
                officialAttempt.status === "in_progress"
            ) {

                return res.json({
                    success: true,
                    message: "Resuming your official attempt.",
                    attempt: prepareAttemptResponse(officialAttempt),
                    test,
                    attempt_type: "official"
                });

            }

            // Already submitted during official period
            if (
                isOfficial &&
                (
                    officialAttempt.status === "submitted" ||
                    officialAttempt.status === "auto_submitted"
                )
            ) {

                return res.status(409).json({
                    success: false,
                    message: "You have already submitted this test."
                });

            }

        }

        // After official end time, allow practice
        if (!isOfficial) {

            const practiceResult = await db.query(
                `SELECT *
                 FROM test_attempts
                 WHERE student_id = $1
                 AND test_id = $2
                 AND attempt_type = 'practice'
                 AND status = 'in_progress'
                 ORDER BY started_at DESC
                 LIMIT 1`,
                [studentId, testId]
            );

            if (practiceResult.rows.length > 0) {

                return res.json({
                    success: true,
                    message: "Resuming practice attempt.",
                    attempt: prepareAttemptResponse(
                        practiceResult.rows[0]
                    ),
                    test,
                    attempt_type: "practice"
                });

            }

        }

        // Create a fixed question snapshot
        const questions = await createQuestionsSnapshot(testId);

        if (!questions.length) {
            return res.status(400).json({
                success: false,
                message: "This test has no questions."
            });
        }

        const attemptType = isOfficial
            ? "official"
            : "practice";

        const insertResult = await db.query(
            `INSERT INTO test_attempts
            (
                student_id,
                test_id,
                attempt_type,
                expires_at,
                questions_snapshot
            )
            VALUES
            (
                $1,
                $2,
                $3,
                CASE
                    WHEN $3 = 'official'
                    THEN NOW() + ($4 * INTERVAL '1 minute')
                    ELSE 'infinity'::timestamptz
                END,
                $5::jsonb
            )
            RETURNING *`,
            [
                studentId,
                testId,
                attemptType,
                test.duration_minutes,
                JSON.stringify(questions)
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Test attempt created successfully.",
            attempt: prepareAttemptResponse(
                insertResult.rows[0]
            ),
            test,
            attempt_type: attemptType
        });

    } catch (err) {

        console.error("Start test error:", err);

        if (err.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "An official attempt already exists."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Unable to start test."
        });

    }

};


// =====================================
// Schedule Test
// =====================================

exports.scheduleTest = (req, res) => {

    const { id } = req.params;

    const { start_time, end_time } = req.body;

    if (!start_time || !end_time) {

        return res.status(400).json({
            success: false,
            message: "Start time and end time are required"
        });

    }

    Test.update(
        id,
        {
            title: req.body.title,
            description: req.body.description,
            subject: req.body.subject,
            chapter: req.body.chapter,
            topic: req.body.topic,
            total_questions: req.body.total_questions,
            duration_minutes: req.body.duration_minutes,
            start_time,
            end_time
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Schedule test error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }

            if (result.rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Test not found"
                });

            }

            return res.json({

                success: true,

                message:
                    "Test Scheduled Successfully",

                test:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// Save Test Attempt Answers
// =====================================

exports.saveAttemptAnswers = async (req, res) => {

    try {

        const attemptId = Number(req.params.attemptId);
        const studentId = Number(req.body.student_id);
        const answers = req.body.answers;

        if (
            !Number.isInteger(attemptId) || attemptId <= 0 ||
            !Number.isInteger(studentId) || studentId <= 0 ||
            !answers ||
            typeof answers !== "object" ||
            Array.isArray(answers)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid answer data."
            });
        }

        const attemptResult = await db.query(
            `SELECT questions_snapshot
             FROM test_attempts
             WHERE id = $1
             AND student_id = $2
             AND status = 'in_progress'
             AND (
                attempt_type = 'practice'
                OR expires_at > NOW()
             )`,
            [attemptId, studentId]
        );

        if (attemptResult.rows.length === 0) {
            return res.status(409).json({
                success: false,
                message: "Attempt has expired or is no longer active."
            });
        }

        const questions =
            attemptResult.rows[0].questions_snapshot || [];

        const validKeys = new Set(
            questions.map(question =>
                `${question.question_source}:${question.test_question_id}`
            )
        );

        for (const key of Object.keys(answers)) {

            if (!validKeys.has(key)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid question in saved answers."
                });
            }

            const answer = answers[key];

            if (
                answer !== null &&
                typeof answer !== "string"
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid answer format."
                });
            }
        }

        const result = await db.query(
            `UPDATE test_attempts
             SET answers = $1::jsonb
             WHERE id = $2
             AND student_id = $3
             AND status = 'in_progress'
             AND (
                attempt_type = 'practice'
                OR expires_at > NOW()
             )
             RETURNING id`,
            [
                JSON.stringify(answers),
                attemptId,
                studentId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(409).json({
                success: false,
                message: "Attempt has expired or is no longer active."
            });
        }

        return res.json({
            success: true,
            message: "Answers saved successfully."
        });

    } catch (error) {

        console.error("Save attempt answers error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to save answers."
        });

    }

};


// =====================================
// Process Expired Official Attempts
// =====================================

exports.processExpiredAttempts = async () => {

    try {

        const result = await db.query(
            `SELECT id
             FROM test_attempts
             WHERE attempt_type = 'official'
             AND status = 'in_progress'
             AND expires_at <= NOW()
             ORDER BY expires_at ASC`
        );

        for (const attempt of result.rows) {

            try {

                await finalizeTestAttempt(
                    attempt.id,
                    "auto_submitted"
                );

                console.log(
                    `Attempt ${attempt.id} auto-submitted.`
                );

            } catch (error) {

                console.error(
                    `Auto-submit failed for attempt ${attempt.id}:`,
                    error
                );

            }

        }

    } catch (error) {

        console.error(
            "Expired attempts processing error:",
            error
        );

    }

};


// =====================================
// FINALIZE TEST ATTEMPT
// Handles manual and automatic submission
// =====================================

async function finalizeTestAttempt(attemptId, finalStatus = "submitted") {

    if (!["submitted", "auto_submitted"].includes(finalStatus)) {
        throw new Error("Invalid final attempt status");
    }

    const client = await db.connect();

    try {

        await client.query("BEGIN");

        // Lock attempt to prevent duplicate submissions
        const attemptResult = await client.query(
            `SELECT *
             FROM test_attempts
             WHERE id = $1
             FOR UPDATE`,
            [attemptId]
        );

        if (attemptResult.rows.length === 0) {
            throw new Error("Test attempt not found");
        }

        const attempt = attemptResult.rows[0];

        // Already submitted
        if (attempt.status !== "in_progress") {

            await client.query("COMMIT");

            return {
                alreadySubmitted: true,
                resultId: attempt.result_id
            };
        }

        const questions = attempt.questions_snapshot || [];
        const answers = attempt.answers || {};

        if (!questions.length) {
            throw new Error("Attempt has no saved questions");
        }

        const testResult = await client.query(
            `SELECT *
             FROM tests
             WHERE id = $1`,
            [attempt.test_id]
        );

        if (!testResult.rows.length) {
            throw new Error("Test not found");
        }

        const test = testResult.rows[0];

        let correct = 0;
        let attempted = 0;

        const snapshots = questions.map((question, index) => {

            const key =
                `${question.question_source}:${question.test_question_id}`;

            const selected = answers[key];

            const selectedAnswer =
                selected == null || selected === ""
                    ? null
                    : String(selected).trim().toLowerCase();

            const correctAnswer =
                String(question.correct_answer).trim().toLowerCase();

            if (selectedAnswer !== null) {
                attempted++;
            }

            if (
                selectedAnswer !== null &&
                selectedAnswer === correctAnswer
            ) {
                correct++;
            }

            return {
                question,
                selectedAnswer,
                questionOrder: index + 1
            };
        });

        const total = questions.length;
        const wrong = attempted - correct;
        const unattempted = total - attempted;

        const percentage = Number(
            ((correct / total) * 100).toFixed(2)
        );

        // Save result summary
        const resultInsert = await client.query(
            `INSERT INTO results
            (
                student_id,
                test_id,
                subject,
                chapter,
                topic,
                total_questions,
                correct_answers,
                wrong_answers,
                unattempted_answers,
                percentage,
                result_type
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'test')
            RETURNING id`,
            [
                attempt.student_id,
                attempt.test_id,
                test.subject,
                test.chapter,
                test.topic,
                total,
                correct,
                wrong,
                unattempted,
                percentage
            ]
        );

        const resultId = resultInsert.rows[0].id;

        // Save answers for review
        for (const item of snapshots) {

            const q = item.question;

            await client.query(
                `INSERT INTO test_attempt_answers
                (
                    result_id,
                    test_id,
                    question_order,
                    question_source,
                    source_question_id,
                    question,
                    optiona,
                    optionb,
                    optionc,
                    optiond,
                    correct_answer,
                    selected_answer,
                    explanation
                )
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
                [
                    resultId,
                    attempt.test_id,
                    item.questionOrder,
                    q.question_source,
                    q.source_question_id,
                    q.question,
                    q.optiona,
                    q.optionb,
                    q.optionc,
                    q.optiond,
                    q.correct_answer,
                    item.selectedAnswer,
                    q.explanation
                ]
            );
        }

        // Mark attempt as submitted
        await client.query(
            `UPDATE test_attempts
             SET status = $1,
                 submitted_at = NOW(),
                 result_id = $2
             WHERE id = $3`,
            [finalStatus, resultId, attemptId]
        );

        await client.query("COMMIT");

        return {
            alreadySubmitted: false,
            resultId,
            totalQuestions: total,
            correctAnswers: correct,
            wrongAnswers: wrong,
            unattemptedAnswers: unattempted,
            percentage,
            status: finalStatus
        };

    } catch (error) {

        await client.query("ROLLBACK");
        throw error;

    } finally {

        client.release();

    }

}


// =====================================
// Submit Saved Test Attempt
// =====================================

exports.submitAttempt = async (req, res) => {

    try {

        const attemptId = Number(req.params.attemptId);
        const studentId = Number(req.body.student_id);

        if (
            !Number.isInteger(attemptId) || attemptId <= 0 ||
            !Number.isInteger(studentId) || studentId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid attempt submission data."
            });
        }

        // Verify that this attempt belongs to this student
        const attemptResult = await db.query(
            `SELECT id, student_id, attempt_type,
                    status, expires_at, result_id
             FROM test_attempts
             WHERE id = $1
             AND student_id = $2`,
            [attemptId, studentId]
        );

        if (attemptResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Test attempt not found."
            });
        }

        const attempt = attemptResult.rows[0];

        if (attempt.status !== "in_progress") {
            return res.json({
                success: true,
                message: "This attempt has already been submitted.",
                resultId: attempt.result_id
            });
        }

        // If the official timer has expired, mark as auto-submitted
        const isExpired =
            attempt.attempt_type === "official" &&
            new Date(attempt.expires_at) <= new Date();

        const finalStatus = isExpired
            ? "auto_submitted"
            : "submitted";

        const result = await finalizeTestAttempt(
            attemptId,
            finalStatus
        );

        return res.json({
            success: true,
            message: isExpired
                ? "Time expired. Test submitted automatically."
                : "Test submitted successfully.",
            ...result
        });

    } catch (error) {

        console.error("Submit attempt error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to submit test attempt."
        });

    }

};


// =====================================
// Submit Test
// Uses the saved test attempt
// =====================================

exports.submitTest = async (req, res) => {

    try {

        const testId = Number(req.params.id);
        const studentId = Number(req.body.student_id);
        const submittedAnswers = req.body.answers;

        if (
            !Number.isInteger(testId) || testId <= 0 ||
            !Number.isInteger(studentId) || studentId <= 0 ||
            !Array.isArray(submittedAnswers)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid test submission data."
            });
        }

        // Find the student's active attempt
        const attemptResult = await db.query(
            `SELECT *
             FROM test_attempts
             WHERE test_id = $1
             AND student_id = $2
             AND status = 'in_progress'
             ORDER BY started_at DESC
             LIMIT 1`,
            [testId, studentId]
        );

        if (attemptResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No active test attempt found."
            });
        }

        const attempt = attemptResult.rows[0];
        const questions = attempt.questions_snapshot || [];

        // Convert submitted answers into the saved-answer format
        const answerMap = {};

        for (const item of submittedAnswers) {

            if (
                !item ||
                !["bank", "manual"].includes(item.question_source) ||
                !Number.isInteger(Number(item.test_question_id))
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid question submission."
                });
            }

            const key =
                `${item.question_source}:${item.test_question_id}`;

            if (
                !questions.some(question =>
                    `${question.question_source}:${question.test_question_id}` === key
                ) ||
                Object.prototype.hasOwnProperty.call(answerMap, key)
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid or duplicate question submission."
                });
            }

            answerMap[key] = item.selected_answer == null ||
                item.selected_answer === ""
                ? null
                : String(item.selected_answer).trim().toLowerCase();
        }

        if (Object.keys(answerMap).length !== questions.length) {
            return res.status(400).json({
                success: false,
                message: "Submitted answers do not match the test questions."
            });
        }

        // Save answers before finalization
        await db.query(
            `UPDATE test_attempts
             SET answers = $1::jsonb
             WHERE id = $2
             AND student_id = $3
             AND status = 'in_progress'`,
            [
                JSON.stringify(answerMap),
                attempt.id,
                studentId
            ]
        );

        const isExpired =
            attempt.attempt_type === "official" &&
            new Date(attempt.expires_at) <= new Date();

        const result = await finalizeTestAttempt(
            attempt.id,
            isExpired ? "auto_submitted" : "submitted"
        );

        return res.json({
            success: true,
            message: "Test submitted successfully.",
            ...result
        });

    } catch (error) {

        console.error("Test submission error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to submit test."
        });

    }

};


// =====================================
// Test History
// =====================================

exports.testHistory = async (req, res) => {

    const studentId = Number(req.params.studentId);

    if (
        !Number.isInteger(studentId) ||
        studentId <= 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });
    }

    try {

        const result = await db.query(
            `SELECT
                r.id AS result_id,
                r.test_id,
                t.title AS test_title,
                r.total_questions,
                r.correct_answers,
                r.wrong_answers,
                r.unattempted_answers,
                r.percentage,
                ta.attempt_type,
                ta.status AS attempt_status,
                ta.submitted_at
             FROM results r
             LEFT JOIN tests t
                ON t.id = r.test_id
             LEFT JOIN test_attempts ta
                ON ta.result_id = r.id
             WHERE r.student_id = $1
             AND r.result_type = 'test'
             ORDER BY r.id DESC`,
            [studentId]
        );

        return res.json({
            success: true,
            history: result.rows
        });

    } catch (error) {

        console.error("Test history error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to load test history"
        });

    }
};


// =====================================
// Leaderboard - Official Attempts Only
// =====================================

exports.leaderboard = async (req, res) => {

    const testId = Number(req.params.id);

    if (!Number.isInteger(testId) || testId <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid test ID"
        });
    }

    try {

        const result = await db.query(
            `SELECT
                s.id AS student_id,
                s.fullname AS student_name,
                r.percentage AS average_percentage,
                r.correct_answers,
                r.wrong_answers,
                r.unattempted_answers,
                r.total_questions,
                ta.status AS attempt_status
             FROM test_attempts ta
             INNER JOIN results r
                ON r.id = ta.result_id
             INNER JOIN students s
                ON s.id = ta.student_id
             WHERE ta.test_id = $1
             AND ta.attempt_type = 'official'
             AND ta.status IN ('submitted', 'auto_submitted')
             AND r.result_type = 'test'
             ORDER BY r.percentage DESC,
                      s.fullname ASC`,
            [testId]
        );

        const leaderboard = result.rows.map((student, index) => ({
            rank: index + 1,
            student_id: student.student_id,
            student_name: student.student_name,
            percentage: Number(student.average_percentage),
            correct: Number(student.correct_answers),
            wrong: Number(student.wrong_answers),
            unattempted: Number(student.unattempted_answers),
            total_questions: Number(student.total_questions),
            status: student.attempt_status
        }));

        return res.json({
            success: true,
            total_students: leaderboard.length,
            leaderboard
        });

    } catch (error) {

        console.error("Leaderboard error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to load leaderboard"
        });
    }
};


// =====================================
// Review Submitted Test
// =====================================

exports.getTestReview = async (req, res) => {
    const resultId = Number(req.params.resultId);
    const studentId = Number(req.params.studentId);

    if (
        !Number.isInteger(resultId) || resultId <= 0 ||
        !Number.isInteger(studentId) || studentId <= 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid result or student ID"
        });
    }

    try {
        // Confirm that this result belongs to this student
        const result = await db.query(
            `SELECT *
             FROM results
             WHERE id = $1
             AND student_id = $2
             AND result_type = 'test'`,
            [resultId, studentId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Test result not found"
            });
        }

        // Get saved questions and answers
        const answers = await db.query(
            `SELECT
                question_order,
                question_source,
                question,
                optiona,
                optionb,
                optionc,
                optiond,
                correct_answer,
                selected_answer,
                explanation
             FROM test_attempt_answers
             WHERE result_id = $1
             ORDER BY question_order ASC`,
            [resultId]
        );

        return res.json({
            success: true,
            result: result.rows[0],
            questions: answers.rows
        });

    } catch (error) {
        console.error("Test review error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to load test review"
        });
    }
};
