const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notificationController");

// Get All Notifications
router.get("/", notificationController.getAllNotifications);

// Get Notification By ID
router.get("/:id", notificationController.getNotificationById);

// Send Notification
router.post("/send", notificationController.sendNotification);

// Send Announcement
router.post("/announcement", notificationController.sendAnnouncement);

// Broadcast Message
router.post("/broadcast", notificationController.broadcast);

// Mark As Read
router.put("/read/:id", notificationController.markAsRead);

// Delete Notification
router.delete("/delete/:id", notificationController.deleteNotification);

// Notification History
router.get("/history/all", notificationController.history);

module.exports = router;
