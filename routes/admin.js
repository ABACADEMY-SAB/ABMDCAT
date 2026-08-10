const express = require("express");

const router = express.Router();

// Dashboard
router.get("/dashboard", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to ABMDCAT Admin Dashboard"
    });
});

// Admin Profile
router.get("/profile", (req, res) => {
    res.json({
        success: true,
        username: "SAB@madina06",
        fullname: "Super Admin"
    });
});

// Dashboard Statistics
router.get("/statistics", (req, res) => {
    res.json({
        totalStudents: 0,
        totalMcqs: 0,
        totalTests: 0,
        totalNotes: 0
    });
});

// Website Settings
router.get("/settings", (req, res) => {
    res.json({
        website: "ABMDCAT",
        version: "1.0",
        maintenance: false
    });
});

// Enable Maintenance
router.post("/maintenance/on", (req, res) => {
    res.json({
        success: true,
        message: "Maintenance mode enabled"
    });
});

// Export router
module.exports = router;
