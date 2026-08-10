// =====================================
// STUDENT MODEL
// =====================================

const db = require("../config/database");

class Student {

    // Get All Students
    static getAll(callback) {

        db.query(

            "SELECT * FROM students ORDER BY id DESC",

            callback

        );

    }

    // Get Student By ID
    static getById(id, callback) {

        db.query(

            "SELECT * FROM students WHERE id=?",

            [id],

            callback

        );

    }

    // Get Student By Username
    static getByUsername(username, callback) {

        db.query(

            "SELECT * FROM students WHERE username=?",

            [username],

            callback

        );

    }

    // Create Student
    static create(data, callback) {

        db.query(

            `INSERT INTO students
            (username,password,fullname,email,phone)
            VALUES(?,?,?,?,?)`,

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
            fullname=?,
            email=?,
            phone=?
            WHERE id=?`,

            [

                data.fullname,
                data.email,
                data.phone,
                id

            ],

            callback

        );

    }

    // Delete Student
    static delete(id, callback) {

        db.query(

            "DELETE FROM students WHERE id=?",

            [id],

            callback

        );

    }

    // Block Student
    static block(id, callback) {

        db.query(

            "UPDATE students SET status='blocked' WHERE id=?",

            [id],

            callback

        );

    }

    // Unblock Student
    static unblock(id, callback) {

        db.query(

            "UPDATE students SET status='active' WHERE id=?",

            [id],

            callback

        );

    }

}

module.exports = Student;
