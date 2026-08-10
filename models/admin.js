// =====================================
// ADMIN MODEL - PostgreSQL
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
            "SELECT * FROM admins WHERE id = $1",
            [id],
            callback
        );
    }

    // Get Admin By Username
    static getByUsername(username, callback) {
        db.query(
            "SELECT * FROM admins WHERE username = $1",
            [username],
            callback
        );
    }

    // Admin Login
    static login(username, password, callback) {
        db.query(
            "SELECT * FROM admins WHERE username = $1 AND password = $2",
            [username, password],
            callback
        );
    }

    // Update Profile
    static updateProfile(id, data, callback) {
        db.query(
            `UPDATE admins
             SET fullname = $1,
                 username = $2
             WHERE id = $3`,
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
            "UPDATE admins SET password = $1 WHERE id = $2",
            [password, id],
            callback
        );
    }

    // Delete Admin
    static delete(id, callback) {
        db.query(
            "DELETE FROM admins WHERE id = $1",
            [id],
            callback
        );
    }

}

module.exports = Admin;
