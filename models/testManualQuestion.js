const db = require("../config/database");

class TestManualQuestion {

    // Get manual questions for a specific test
    static getByTestId(testId, callback) {
        db.query(
            `SELECT *
             FROM test_manual_questions
             WHERE test_id = $1
             ORDER BY question_order ASC`,
            [testId],
            callback
        );
    }

    // Add a manual question to a specific test
    static add(data, callback) {
        db.query(
            `INSERT INTO test_manual_questions (
                test_id,
                question_order,
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
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
            RETURNING *`,
            [
                data.test_id,
                data.question_order,
                data.subject,
                data.chapter || null,
                data.topic || null,
                data.question,
                data.optiona,
                data.optionb,
                data.optionc,
                data.optiond,
                data.answer,
                data.explanation || null
            ],
            callback
        );
    }

    // Remove one manual question
    static delete(id, callback) {
        db.query(
            `DELETE FROM test_manual_questions
             WHERE id = $1
             RETURNING *`,
            [id],
            callback
        );
    }

    // Remove all manual questions belonging to a test
    static deleteByTestId(testId, callback) {
        db.query(
            `DELETE FROM test_manual_questions
             WHERE test_id = $1`,
            [testId],
            callback
        );
    }

    // Count manual questions belonging to a test
    static countByTestId(testId, callback) {
        db.query(
            `SELECT COUNT(*) AS total
             FROM test_manual_questions
             WHERE test_id = $1`,
            [testId],
            callback
        );
    }
}

module.exports = TestManualQuestion;
