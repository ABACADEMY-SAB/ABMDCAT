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
            `SELECT *
             FROM (
                SELECT
                    tq.id AS test_question_id,
                    tq.test_id,
                    tq.mcq_id,
                    NULL::INTEGER AS manual_question_id,
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
                    m.explanation,
                    'bank' AS question_source
                FROM test_questions tq
                INNER JOIN mcqs m
                    ON m.id = tq.mcq_id
                WHERE tq.test_id = $1

                UNION ALL

                SELECT
                    tmq.id AS test_question_id,
                    tmq.test_id,
                    NULL::INTEGER AS mcq_id,
                    tmq.id AS manual_question_id,
                    tmq.question_order,
                    tmq.subject,
                    tmq.chapter,
                    tmq.topic,
                    tmq.question,
                    tmq.optiona,
                    tmq.optionb,
                    tmq.optionc,
                    tmq.optiond,
                    tmq.answer,
                    tmq.explanation,
                    'manual' AS question_source
                FROM test_manual_questions tmq
                WHERE tmq.test_id = $1
             ) AS questions
             ORDER BY
                CASE LOWER(TRIM(COALESCE(subject, '')))
                    WHEN 'biology' THEN 1
                    WHEN 'bio' THEN 1
                    WHEN 'chemistry' THEN 2
                    WHEN 'chem' THEN 2
                    WHEN 'physics' THEN 3
                    WHEN 'phy' THEN 3
                    WHEN 'english' THEN 4
                    WHEN 'eng' THEN 4
                    ELSE 5
                END,
                RANDOM()`,
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
