const express = require("express");

const router = express.Router();

// Student Dashboard
router.get("/dashboard", (req, res) => {

    res.json({
        success: true,
        message: "Welcome to ABMDCAT Student Dashboard"
    });

});

// Student Profile
router.get("/profile", (req, res) => {

    res.json({
        success: true,
        student: {
            id: 1,
            username: "student",
            fullname: "Student Name",
            email: "student@example.com",
            phone: "03000000000"
        }
    });

});

// Update Profile
router.put("/profile", (req, res) => {

    res.json({
        success: true,
        message: "Profile Updated Successfully"
    });

});

// Change Password
router.put("/change-password", (req, res) => {

    res.json({
        success: true,
        message: "Password Changed Successfully"
    });

});

// Logout
router.post("/logout", (req, res) => {

    res.json({
        success: true,
        message: "Student Logged Out Successfully"
    });

});

// Student Statistics
router.get("/statistics", (req, res) => {

    res.json({
        testsAttempted: 0,
        averageScore: 0,
        bookmarks: 0,
        wrongQuestions: 0
    });

});

module.exports = router;
