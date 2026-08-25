// =====================================
// BOOKMARK MODEL - PostgreSQL
// =====================================

const db = require("../config/database");

class Bookmark {

    // Get student's bookmarks
    static getByStudentId(studentId, callback) {

        db.query(
            `SELECT *
             FROM bookmarks
             WHERE student_id = $1
             ORDER BY id DESC`,
            [studentId],
            callback
        );

    }


    // Add bookmark
    static create(data, callback) {

        db.query(
            `INSERT INTO bookmarks
            (
                student_id,
                mcq_id
            )
            VALUES ($1, $2)
            RETURNING *`,
            [
                data.student_id,
                data.mcq_id
            ],
            callback
        );

    }


    // Remove bookmark
    static delete(id, callback) {

        db.query(
            `DELETE FROM bookmarks
             WHERE id = $1`,
            [id],
            callback
        );

    }


    // Check duplicate bookmark
    static exists(studentId, mcqId, callback) {

        db.query(
            `SELECT id
             FROM bookmarks
             WHERE student_id = $1
             AND mcq_id = $2
             LIMIT 1`,
            [
                studentId,
                mcqId
            ],
            callback
        );

    }


    // Get favorite MCQs
    static getFavorites(studentId, callback) {

        db.query(
            `SELECT
                b.id AS bookmark_id,
                m.*
             FROM bookmarks b
             INNER JOIN mcqs m
                ON m.id = b.mcq_id
             WHERE b.student_id = $1
             ORDER BY b.id DESC`,
            [studentId],
            callback
        );

    }


    // Add wrong question
    static addWrong(data, callback) {

        db.query(
            `INSERT INTO wrong_questions
            (
                student_id,
                mcq_id
            )
            VALUES ($1, $2)
            RETURNING *`,
            [
                data.student_id,
                data.mcq_id
            ],
            callback
        );

    }


    // Get wrong questions
    static getWrong(studentId, callback) {

        db.query(
            `SELECT
                w.id AS wrong_question_id,
                m.*
             FROM wrong_questions w
             INNER JOIN mcqs m
                ON m.id = w.mcq_id
             WHERE w.student_id = $1
             ORDER BY w.id DESC`,
            [studentId],
            callback
        );

    }


    // Get revision questions
    static getRevision(studentId, callback) {

        db.query(
            `SELECT
                w.id AS wrong_question_id,
                m.*
             FROM wrong_questions w
             INNER JOIN mcqs m
                ON m.id = w.mcq_id
             WHERE w.student_id = $1
             ORDER BY w.id DESC`,
            [studentId],
            callback
        );

    }


    // Smart practice
    static smartPractice(studentId, callback) {

        db.query(
            `SELECT
                w.id AS wrong_question_id,
                m.*
             FROM wrong_questions w
             INNER JOIN mcqs m
                ON m.id = w.mcq_id
             WHERE w.student_id = $1
             ORDER BY RANDOM()
             LIMIT 180`,
            [studentId],
            callback
        );

    }

}

module.exports = Bookmark;
