// =====================================
// NOTIFICATION CONTROLLER
// =====================================

const Notification =
    require("../models/notification");


// =====================================
// GET ALL NOTIFICATIONS
// =====================================

exports.getAllNotifications = (req, res) => {

    Notification.getAll(
        (err, result) => {

            if (err) {

                console.error(
                    "Get notifications error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }

            return res.json({
                success: true,
                notifications: result.rows
            });

        }
    );

};


// =====================================
// GET NOTIFICATION BY ID
// =====================================

exports.getNotificationById = (req, res) => {

    const { id } = req.params;

    Notification.getById(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Get notification error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }

            if (result.rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Notification not found"
                });

            }

            return res.json({
                success: true,
                notification: result.rows[0]
            });

        }
    );

};


// =====================================
// GET STUDENT NOTIFICATIONS
// =====================================

exports.getStudentNotifications = (req, res) => {

    const { studentId } = req.params;

    Notification.getByStudentId(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Get student notifications error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }

            return res.json({
                success: true,
                studentId,
                notifications: result.rows
            });

        }
    );

};


// =====================================
// CREATE NOTIFICATION
// =====================================

exports.createNotification = (req, res) => {

    const {
        title,
        message,
        notification_type,
        student_id
    } = req.body;


    if (!title || !message) {

        return res.status(400).json({
            success: false,
            message: "Title and message are required"
        });

    }


    Notification.create(
        {
            title,
            message,
            notification_type:
                notification_type || "general",
            student_id:
                student_id || null,
            is_read: false
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Create notification error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }

            return res.status(201).json({

                success: true,

                message:
                    "Notification Created Successfully",

                notification:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// MARK NOTIFICATION AS READ
// =====================================

exports.markAsRead = (req, res) => {

    const { id } = req.params;

    Notification.markAsRead(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Mark notification read error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }

            if (result.rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Notification not found"
                });

            }

            return res.json({

                success: true,

                message:
                    "Notification Marked As Read",

                notification:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// MARK ALL AS READ
// =====================================

exports.markAllAsRead = (req, res) => {

    const { studentId } = req.params;

    Notification.markAllAsRead(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Mark all notifications read error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }

            return res.json({

                success: true,

                message:
                    "All Notifications Marked As Read",

                updated:
                    result.rowCount

            });

        }
    );

};


// =====================================
// DELETE NOTIFICATION
// =====================================

exports.deleteNotification = (req, res) => {

    const { id } = req.params;

    Notification.delete(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Delete notification error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }

            if (result.rowCount === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Notification not found"
                });

            }

            return res.json({

                success: true,

                message:
                    "Notification Deleted Successfully"

            });

        }
    );

};


// =====================================
// UNREAD COUNT
// =====================================

exports.unreadCount = (req, res) => {

    const { studentId } = req.params;

    Notification.unreadCount(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Unread count error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }

            return res.json({

                success: true,

                studentId,

                unread:
                    Number(
                        result.rows[0].total
                    )

            });

        }
    );

};
