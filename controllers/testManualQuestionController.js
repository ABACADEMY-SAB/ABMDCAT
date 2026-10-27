
const TestManualQuestion = require("../models/testManualQuestion");

class TestManualQuestionController {

    // Get manual questions for a test
    static getByTestId(req, res) {
        const testId = req.params.testId;

        TestManualQuestion.getByTestId(testId, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to load manual questions"
                });
            }

            res.json({
                success: true,
                questions: result.rows
            });
        });
    }

    // Add a manual question to a test
    static add(req, res) {
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
            !question ||
            !optiona ||
            !optionb ||
            !optionc ||
            !optiond ||
            !answer
        ) {
            return res.status(400).json({
                success: false,
                message: "Question, all four options, and answer are required"
            });
        }

        const normalizedAnswer = String(answer).trim().toLowerCase();

        if (!["a", "b", "c", "d"].includes(normalizedAnswer)) {
            return res.status(400).json({
                success: false,
                message: "Answer must be A, B, C, or D"
            });
        }

        TestManualQuestion.countByTestId(testId, (countErr, countResult) => {
            if (countErr) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to count test questions"
                });
            }

            const nextOrder = Number(countResult.rows[0].total) + 1;

            TestManualQuestion.add({
                test_id: testId,
                question_order: nextOrder,
                subject: subject || null,
                chapter,
                topic,
                question,
                optiona,
                optionb,
                optionc,
                optiond,
                answer: normalizedAnswer.toUpperCase(),
                explanation
            }, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Failed to add manual question"
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Manual question added to this test",
                    question: result.rows[0]
                });
            });
        });
    }

    // Delete one manual question
    static delete(req, res) {
        TestManualQuestion.delete(req.params.id, (err, result) => {
            if (err) {
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

            res.json({
                success: true,
                message: "Manual question deleted"
            });
        });
    }
}

module.exports = TestManualQuestionController;
