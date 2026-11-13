// =====================================
// TEST CONTROLLER - PostgreSQL
// =====================================

const Test = require("../models/test");

const db = require("../config/database");

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
// Start Test
// =====================================

exports.startTest = (req, res) => {

    const { id } = req.params;

    Test.getById(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Start test error:",
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

                status: "Test Started",

                test:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// Schedule Test
// =====================================

exports.scheduleTest = (req, res) => {

    const { id } = req.params;

    const { start_time } = req.body;


    if (!start_time) {

        return res.status(400).json({
            success: false,
            message: "Start time is required"
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
            start_time
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
// Submit Test
// =====================================

exports.submitTest = async (req, res) => {
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
            message: "Invalid test submission data"
        });
    }

    const client = await db.connect();

    try {
        await client.query("BEGIN");

        // Check that the test exists and is published
        const testResult = await client.query(
            `SELECT *
             FROM tests
             WHERE id = $1
             AND LOWER(status) = 'published'`,
            [testId]
        );

        if (testResult.rows.length === 0) {
            await client.query("ROLLBACK");
            return res.status(404).json({
                success: false,
                message: "Published test not found"
            });
        }

        const test = testResult.rows[0];

        // Get the actual questions and answers from the database
        const questionResult = await client.query(
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

        const questions = questionResult.rows;

        if (questions.length === 0) {
            await client.query("ROLLBACK");
            return res.status(400).json({
                success: false,
                message: "This test has no questions"
            });
        }

        // Match submitted answers with actual test questions
        const answerMap = new Map();

        for (const item of submittedAnswers) {
            const key =
                `${item.question_source}:${item.test_question_id}`;

            if (
                !["bank", "manual"].includes(item.question_source) ||
                !Number.isInteger(Number(item.test_question_id)) ||
                answerMap.has(key)
            ) {
                await client.query("ROLLBACK");
                return res.status(400).json({
                    success: false,
                    message: "Invalid or duplicate question submission"
                });
            }

            answerMap.set(key, item.selected_answer);
        }

        if (answerMap.size !== questions.length) {
            await client.query("ROLLBACK");
            return res.status(400).json({
                success: false,
                message: "Submitted answers do not match the test questions"
            });
        }

        let correct = 0;

        const questionMap = new Map(
    questions.map(question => [
        `${question.question_source}:${question.test_question_id}`,
        question
    ])
);

const snapshots = submittedAnswers.map((item, index) => {
    const key =
        `${item.question_source}:${item.test_question_id}`;

    const question = questionMap.get(key);

    if (!question) {
        throw new Error("A test question is missing");
    }

    const selected = answerMap.get(key);

    const selectedAnswer =
        selected == null || selected === ""
            ? null
            : String(selected).trim().toLowerCase();

    const correctAnswer =
        String(question.correct_answer).trim().toLowerCase();

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

        // Save the result summary
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
                percentage,
                result_type
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'test')
            RETURNING id`,
            [
                studentId,
                testId,
                test.subject,
                test.chapter,
                test.topic,
                total,
                correct,
                wrong,
                percentage
            ]
        );

        const resultId = resultInsert.rows[0].id;

        // Save every question and its answer for later review
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
                    testId,
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

        await client.query("COMMIT");

        return res.json({
            success: true,
            message: "Test submitted successfully",
            resultId,
            totalQuestions: total,
            correctAnswers: correct,
            wrongAnswers: wrong,
            percentage
        });

    } catch (error) {
        await client.query("ROLLBACK");

        console.error("Test submission error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to submit test"
        });

    } finally {
        client.release();
    }
};


// =====================================
// Test History
// =====================================

exports.testHistory = (req, res) => {

    res.json({

        success: true,

        history: []

    });

};


// =====================================
// Leaderboard
// =====================================

exports.leaderboard = (req, res) => {

    res.json({

        success: true,

        leaderboard: []

    });

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
