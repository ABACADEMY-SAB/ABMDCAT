// =====================================
// NOTIFICATION MODEL - PostgreSQL
// =====================================

const db = require("../config/database");

class Notification {

    // =====================================
    // Get All Notifications
    // =====================================

    static getAll(callback) {

        db.query(
            `SELECT *
             FROM notifications
             ORDER BY id DESC`,
            callback
        );

    }


    // =====================================
    // Get Notification By ID
    // =====================================

    static getById(id, callback) {

        db.query(
            `SELECT *
             FROM notifications
             WHERE id = $1`,
            [id],
            callback
        );

    }


    // =====================================
    // Get Student Notifications
    // =====================================

    static getByStudentId(studentId, callback) {

        db.query(
            `SELECT *
             FROM notifications
             WHERE student_id = $1
                OR student_id IS NULL
             ORDER BY id DESC`,
            [studentId],
            callback
        );

    }


    // =====================================
    // Create Notification
    // =====================================

    static create(data, callback) {

        db.query(
            `INSERT INTO notifications
            (
                title,
                message,
                notification_type,
                student_id,
                is_read
            )
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *`,
            [
                data.title,
                data.message,
                data.notification_type,
                data.student_id,
                data.is_read
            ],
            callback
        );

    }


    // =====================================
    // Mark As Read
    // =====================================

    static markAsRead(id, callback) {

        db.query(
            `UPDATE notifications
             SET is_read = true
             WHERE id = $1
             RETURNING *`,
            [id],
            callback
        );

    }


    // =====================================
    // Mark All Student Notifications Read
    // =====================================

    static markAllAsRead(studentId, callback) {

        db.query(
            `UPDATE notifications
             SET is_read = true
             WHERE student_id = $1
             RETURNING *`,
            [studentId],
            callback
        );

    }


    // =====================================
    // Delete Notification
    // =====================================

    static delete(id, callback) {

        db.query(
            `DELETE FROM notifications
             WHERE id = $1`,
            [id],
            callback
        );

    }


    // =====================================
    // Unread Count
    // =====================================

    static unreadCount(studentId, callback) {

        db.query(
            `SELECT COUNT(*) AS total
             FROM notifications
             WHERE student_id = $1
             AND is_read = false`,
            [studentId],
            callback
        );

    }

}

module.exports = Notification;
