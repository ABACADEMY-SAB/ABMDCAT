// =====================================
// UPLOAD MODEL - PostgreSQL
// =====================================

const db = require("../config/database");

class Upload {

    // =====================================
    // Get All Uploads
    // =====================================

    static getAll(callback) {

        db.query(
            `SELECT *
             FROM uploads
             ORDER BY id DESC`,
            callback
        );

    }


    // =====================================
    // Get Upload By ID
    // =====================================

    static getById(id, callback) {

        db.query(
            `SELECT *
             FROM uploads
             WHERE id = $1`,
            [id],
            callback
        );

    }


    // =====================================
    // Get Uploads By User
    // =====================================

    static getByUser(userId, callback) {

        db.query(
            `SELECT *
             FROM uploads
             WHERE uploaded_by = $1
             ORDER BY id DESC`,
            [userId],
            callback
        );

    }


    // =====================================
    // Save Upload Information
    // =====================================

    static create(data, callback) {

        db.query(
            `INSERT INTO uploads
            (
                filename,
                original_name,
                file_path,
                file_type,
                file_size,
                uploaded_by
            )
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *`,
            [
                data.filename,
                data.original_name,
                data.file_path,
                data.file_type,
                data.file_size,
                data.uploaded_by
            ],
            callback
        );

    }


    // =====================================
    // Delete Upload
    // =====================================

    static delete(id, callback) {

        db.query(
            `DELETE FROM uploads
             WHERE id = $1`,
            [id],
            callback
        );

    }


    // =====================================
    // Count Uploads
    // =====================================

    static count(callback) {

        db.query(
            `SELECT COUNT(*) AS total
             FROM uploads`,
            callback
        );

    }

}

module.exports = Upload;
