// =====================================
// ADMIN MODEL
// =====================================

const db = require("../config/database");

class Admin {

    // Get All Admins
    static getAll(callback) {

        db.query(

            "SELECT * FROM admins ORDER BY id DESC",

            callback

        );

    }

    // Get Admin By ID
    static getById(id, callback) {

        db.query(

            "SELECT * FROM admins WHERE id=?",

            [id],

            callback

        );

    }

    // Get Admin By Username
    static getByUsername(username, callback) {

        db.query(

            "SELECT * FROM admins WHERE username=?",

            [username],

            callback

        );

    }

    // Admin Login
    static login(username, password, callback) {

        db.query(

            "SELECT * FROM admins WHERE username=? AND password=?",

            [

                username,
                password

            ],

            callback

        );

    }

    // Update Profile
    static updateProfile(id, data, callback) {

        db.query(

            `UPDATE admins
            SET
            fullname=?,
            username=?
            WHERE id=?`,

            [

                data.fullname,
                data.username,
                id

            ],

            callback

        );

    }

    // Change Password
    static changePassword(id, password, callback) {

        db.query(

            "UPDATE admins SET password=? WHERE id=?",

            [

                password,
                id

            ],

            callback

        );

    }

    // Delete Admin
    static delete(id, callback) {

        db.query(

            "DELETE FROM admins WHERE id=?",

            [id],

            callback

        );

    }

}

module.exports = Admin;
