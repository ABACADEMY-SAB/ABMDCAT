// =====================================
// STUDENT MODEL - PostgreSQL
// =====================================

const db = require("../config/database");

class Student {

    // Get All Students
    static getAll(callback) {
        db.query(
            `SELECT
                id,
                username,
                fullname,
                email,
                phone,
                status
             FROM students
             ORDER BY id DESC`,
            callback
        );
    }


    // Get Student By ID
    static getById(id, callback) {
        db.query(
            `SELECT
                id,
                username,
                fullname,
                email,
                phone,
                status
             FROM students
             WHERE id = $1`,
            [id],
            callback
        );
    }


    // Get Student By Username
    static getByUsername(username, callback) {
        db.query(
            `SELECT *
             FROM students
             WHERE username = $1`,
            [username],
            callback
        );
    }


    // Create Student
    static create(data, callback) {

        db.query(
            `INSERT INTO students
                (username, password, fullname, email, phone)
             VALUES
                ($1, $2, $3, $4, $5)
             RETURNING
                id,
                username,
                fullname,
                email,
                phone,
                status`,
            [
                data.username,
                data.password,
                data.fullname,
                data.email,
                data.phone
            ],
            callback
        );

    }


    // Update Student
    static update(id, data, callback) {

        db.query(
            `UPDATE students
             SET
                fullname = $1,
                email = $2,
                phone = $3
             WHERE id = $4
             RETURNING
                id,
                username,
                fullname,
                email,
                phone,
                status`,
            [
                data.fullname,
                data.email,
                data.phone,
                id
            ],
            callback
        );

    }


    // Change Password
    static changePassword(id, password, callback) {

        db.query(
            `UPDATE students
             SET password = $1
             WHERE id = $2`,
            [
                password,
                id
            ],
            callback
        );

    }


    // Delete Student
    static delete(id, callback) {

        db.query(
            `DELETE FROM students
             WHERE id = $1`,
            [id],
            callback
        );

    }


    // Block Student
    static block(id, callback) {

        db.query(
            `UPDATE students
             SET status = 'blocked'
             WHERE id = $1
             RETURNING
                id,
                username,
                fullname,
                email,
                phone,
                status`,
            [id],
            callback
        );

    }


    // Unblock Student
    static unblock(id, callback) {

        db.query(
            `UPDATE students
             SET status = 'active'
             WHERE id = $1
             RETURNING
                id,
                username,
                fullname,
                email,
                phone,
                status`,
            [id],
            callback
        );

    }

}

module.exports = Student;
