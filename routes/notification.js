const express = require("express");

const router = express.Router();

// Get All Notifications
router.get("/", (req, res) => {

    res.json({
        success: true,
        notifications: []
    });

});

// Get Notification By ID
router.get("/:id", (req, res) => {

    res.json({
        success: true,
        notificationId: req.params.id
    });

});

// Send Notification
router.post("/send", (req, res) => {

    res.json({
        success: true,
        message: "Notification Sent Successfully"
    });

});

// Send Announcement
router.post("/announcement", (req, res) => {

    res.json({
        success: true,
        message: "Announcement Published Successfully"
    });

});

// Broadcast Message
router.post("/broadcast", (req, res) => {

    res.json({
        success: true,
        message: "Broadcast Sent To All Students"
    });

});

// Mark As Read
router.put("/read/:id", (req, res) => {

    res.json({
        success: true,
        message: "Notification Marked As Read"
    });

});

// Delete Notification
router.delete("/delete/:id", (req, res) => {

    res.json({
        success: true,
        message: "Notification Deleted Successfully"
    });

});

// Notification History
router.get("/history/all", (req, res) => {

    res.json({
        success: true,
        history: []
    });

});

module.exports = router;
