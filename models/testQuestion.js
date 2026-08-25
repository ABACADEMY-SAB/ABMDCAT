// =====================================
// TEST QUESTION MODEL - PostgreSQL
// =====================================

const db = require("../config/database");

class TestQuestion {

    // =====================================
    // Get all questions of a test
    // =====================================

    static getByTestId(testId, callback) {

        db.query(
            `SELECT
                tq.id,
                tq.test_id,
                tq.mcq_id,
                tq.question_order,

                m.subject,
                m.chapter,
                m.topic,
                m.question,
                m.optiona,
                m.optionb,
                m.optionc,
                m.optiond,
                m.answer,
                m.explanation

             FROM test_questions tq

             INNER JOIN mcqs m
                ON m.id = tq.mcq_id

             WHERE tq.test_id = $1

             ORDER BY tq.question_order ASC`,
            [testId],
            callback
        );

    }


    // =====================================
    // Add one MCQ to a test
    // =====================================

    static add(data, callback) {

        db.query(
            `INSERT INTO test_questions
            (
                test_id,
                mcq_id,
                question_order
            )
            VALUES ($1,$2,$3)
            RETURNING *`,
            [
                data.test_id,
                data.mcq_id,
                data.question_order
            ],
            callback
        );

    }


    // =====================================
    // Remove one MCQ from a test
    // =====================================

    static delete(id, callback) {

        db.query(
            `DELETE FROM test_questions
             WHERE id = $1`,
            [id],
            callback
        );

    }


    // =====================================
    // Remove all MCQs from a test
    // =====================================

    static deleteByTestId(testId, callback) {

        db.query(
            `DELETE FROM test_questions
             WHERE test_id = $1`,
            [testId],
            callback
        );

    }


    // =====================================
    // Count questions in a test
    // =====================================

    static countByTestId(testId, callback) {

        db.query(
            `SELECT COUNT(*) AS total
             FROM test_questions
             WHERE test_id = $1`,
            [testId],
            callback
        );

    }


    // =====================================
    // Check whether MCQ is already attached
    // =====================================

    static exists(testId, mcqId, callback) {

        db.query(
            `SELECT id
             FROM test_questions
             WHERE test_id = $1
             AND mcq_id = $2
             LIMIT 1`,
            [
                testId,
                mcqId
            ],
            callback
        );

    }

}

module.exports = TestQuestion;
