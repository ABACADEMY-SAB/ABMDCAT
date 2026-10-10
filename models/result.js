// =====================================
// RESULT MODEL - PostgreSQL
// =====================================

const db = require("../config/database");

class Result {

    // Get All Results
    static getAll(callback) {
        db.query(
            "SELECT * FROM results ORDER BY id DESC",
            callback
        );
    }

    // Get Result By ID
    static getById(id, callback) {
        db.query(
            "SELECT * FROM results WHERE id = $1",
            [id],
            callback
        );
    }

    // Get Student Results
    static getStudentResults(studentId, callback) {
        db.query(
            "SELECT * FROM results WHERE student_id = $1 ORDER BY id DESC",
            [studentId],
            callback
        );
    }

// Save Result
static create(data, callback) {
    db.query(
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
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING *`,
        [
            data.student_id,
            data.test_id || null,
            data.subject || null,
            data.chapter || null,
            data.topic || null,
            data.total_questions,
            data.correct_answers,
            data.wrong_answers,
            data.percentage,
            data.result_type
        ],
        callback
    );
}

    // Delete Result
    static delete(id, callback) {
        db.query(
            "DELETE FROM results WHERE id = $1",
            [id],
            callback
        );
    }

    // Overall Ranking
    static ranking(callback) {
        db.query(
            `SELECT
                student_id,
                AVG(percentage) AS average_percentage
             FROM results
             GROUP BY student_id
             ORDER BY average_percentage DESC`,
            callback
        );
    }

    // Top Students
    static topStudents(limit, callback) {
        db.query(
            `SELECT
                student_id,
                AVG(percentage) AS average_percentage
             FROM results
             GROUP BY student_id
             ORDER BY average_percentage DESC
             LIMIT $1`,
            [Number(limit)],
            callback
        );
    }

// Student Statistics
static statistics(studentId, callback) {
    db.query(
        `SELECT
            COUNT(*) FILTER (
                WHERE result_type = 'test'
            ) AS tests,

            COALESCE(
                SUM(total_questions) FILTER (
                    WHERE result_type = 'practice'
                ),
                0
            ) AS mcqs_practiced,

            COALESCE(
                SUM(wrong_answers),
                0
            ) AS wrong_questions,

            COALESCE(
                AVG(percentage) FILTER (
                    WHERE result_type = 'test'
                ),
                0
            ) AS average,

            COALESCE(
                MAX(percentage) FILTER (
                    WHERE result_type = 'test'
                ),
                0
            ) AS highest,

            COALESCE(
                MIN(percentage) FILTER (
                    WHERE result_type = 'test'
                ),
                0
            ) AS lowest

         FROM results
         WHERE student_id = $1`,
        [studentId],
        callback
    );
}

}

module.exports = Result;
