const express = require("express");

const router = express.Router();

const notificationController =
    require("../controllers/notificationController");


// =====================================
// GET ALL NOTIFICATIONS
// =====================================

router.get(
    "/",
    notificationController.getAllNotifications
);


// =====================================
// GET STUDENT NOTIFICATIONS
// =====================================

router.get(
    "/student/:studentId",
    notificationController.getStudentNotifications
);


// =====================================
// UNREAD COUNT
// =====================================

router.get(
    "/unread/:studentId",
    notificationController.unreadCount
);


// =====================================
// CREATE NOTIFICATION
// =====================================

router.post(
    "/add",
    notificationController.createNotification
);


// =====================================
// MARK ALL AS READ
// =====================================

router.put(
    "/read-all/:studentId",
    notificationController.markAllAsRead
);


// =====================================
// MARK ONE AS READ
// =====================================

router.put(
    "/read/:id",
    notificationController.markAsRead
);


// =====================================
// DELETE NOTIFICATION
// =====================================

router.delete(
    "/delete/:id",
    notificationController.deleteNotification
);


// =====================================
// GET NOTIFICATION BY ID
// =====================================

router.get(
    "/:id",
    notificationController.getNotificationById
);


module.exports = router;
