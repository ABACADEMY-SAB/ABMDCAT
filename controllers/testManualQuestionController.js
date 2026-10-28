
const db = require("../config/database");
const TestManualQuestion = require("../models/testManualQuestion");

class TestManualQuestionController {

    // Get manual questions for a test
    static getByTestId(req, res) {
        const testId = req.params.testId;

        TestManualQuestion.getByTestId(testId, (err, result) => {
            if (err) {
                console.error("Get manual questions error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to load manual questions"
                });
            }

            return res.json({
                success: true,
                questions: result.rows
            });
        });
    }

    // Add a manual question to both the test and general MCQ bank
    static async add(req, res) {
        const testId = req.params.testId;

        const {
            subject,
            chapter,
            topic,
            question,
            optiona,
            optionb,
            optionc,
            optiond,
            answer,
            explanation
        } = req.body;

        if (
            !subject ||
            !chapter ||
            !topic ||
            !question ||
            !optiona ||
            !optionb ||
            !optionc ||
            !optiond ||
            !answer
        ) {
            return res.status(400).json({
                success: false,
                message: "Subject, chapter, topic, question, all four options, and answer are required"
            });
        }

        const normalizedAnswer = String(answer).trim().toUpperCase();

        if (!["A", "B", "C", "D"].includes(normalizedAnswer)) {
            return res.status(400).json({
                success: false,
                message: "Answer must be A, B, C, or D"
            });
        }

        const client = await db.connect();

        try {
            await client.query("BEGIN");

            // Determine the next order for this test
            const countResult = await client.query(
                `SELECT COUNT(*) AS total
                 FROM test_manual_questions
                 WHERE test_id = $1`,
                [testId]
            );

            const nextOrder = Number(countResult.rows[0].total) + 1;

            // Save to the general practice MCQ bank
            await client.query(
                `INSERT INTO mcqs (
                    subject, chapter, topic, question,
                    optiona, optionb, optionc, optiond,
                    answer, explanation
                )
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
                [
                    subject,
                    chapter,
                    topic,
                    question,
                    optiona,
                    optionb,
                    optionc,
                    optiond,
                    normalizedAnswer,
                    explanation || null
                ]
            );

            // Save to the selected test
            const result = await client.query(
                `INSERT INTO test_manual_questions (
                    test_id, question_order, subject, chapter,
                    topic, question, optiona, optionb, optionc,
                    optiond, answer, explanation
                )
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
                RETURNING *`,
                [
                    testId,
                    nextOrder,
                    subject,
                    chapter,
                    topic,
                    question,
                    optiona,
                    optionb,
                    optionc,
                    optiond,
                    normalizedAnswer,
                    explanation || null
                ]
            );

            await client.query("COMMIT");

            return res.status(201).json({
                success: true,
                message: "Question added to test and MCQ practice bank",
                question: result.rows[0]
            });

        } catch (err) {
            await client.query("ROLLBACK");

            console.error("Add manual test question error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to save question to test and MCQ bank"
            });

        } finally {
            client.release();
        }
    }

    // Delete from the test only; keep the general MCQ bank entry
    static delete(req, res) {
        TestManualQuestion.delete(req.params.id, (err, result) => {
            if (err) {
                console.error("Delete manual question error:", err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to delete manual question"
                });
            }

            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Manual question not found"
                });
            }

            return res.json({
                success: true,
                message: "Question removed from test; MCQ bank entry retained"
            });
        });
    }
}

module.exports = TestManualQuestionController;
