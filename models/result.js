// =====================================
// RESULT MODEL
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

            "SELECT * FROM results WHERE id=?",

            [id],

            callback

        );

    }

    // Get Student Results
    static getStudentResults(studentId, callback) {

        db.query(

            "SELECT * FROM results WHERE student_id=? ORDER BY id DESC",

            [

                studentId

            ],

            callback

        );

    }

    // Save Result
    static create(data, callback) {

        db.query(

            `INSERT INTO results
            (
                student_id,
                subject,
                chapter,
                topic,
                total_questions,
                correct_answers,
                wrong_answers,
                percentage
            )
            VALUES(?,?,?,?,?,?,?,?)`,

            [

                data.student_id,
                data.subject,
                data.chapter,
                data.topic,
                data.total_questions,
                data.correct_answers,
                data.wrong_answers,
                data.percentage

            ],

            callback

        );

    }

    // Delete Result
    static delete(id, callback) {

        db.query(

            "DELETE FROM results WHERE id=?",

            [

                id

            ],

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
            LIMIT ?`,

            [

                Number(limit)

            ],

            callback

        );

    }

    // Student Statistics
    static statistics(studentId, callback) {

        db.query(

            `SELECT
            COUNT(*) AS tests,
            AVG(percentage) AS average,
            MAX(percentage) AS highest,
            MIN(percentage) AS lowest
            FROM results
            WHERE student_id=?`,

            [

                studentId

            ],

            callback

        );

    }

}

module.exports = Result;
