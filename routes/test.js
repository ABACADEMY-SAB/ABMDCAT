const express = require("express");

const router = express.Router();

// Get All Tests
router.get("/", (req, res) => {

    res.json({
        success: true,
        tests: []
    });

});

// Get Test By ID
router.get("/:id", (req, res) => {

    res.json({
        success: true,
        testId: req.params.id
    });

});

// Create Test
router.post("/create", (req, res) => {

    res.json({
        success: true,
        message: "Test Created Successfully"
    });

});

// Update Test
router.put("/update/:id", (req, res) => {

    res.json({
        success: true,
        message: "Test Updated Successfully"
    });

});

// Delete Test
router.delete("/delete/:id", (req, res) => {

    res.json({
        success: true,
        message: "Test Deleted Successfully"
    });

});

// Start Test
router.post("/start/:id", (req, res) => {

    res.json({
        success: true,
        message: "Test Started",
        testId: req.params.id
    });

});

// Submit Test
router.post("/submit/:id", (req, res) => {

    res.json({
        success: true,
        message: "Test Submitted Successfully",
        score: 0,
        percentage: 0
    });

});

// Test History
router.get("/history/:studentId", (req, res) => {

    res.json({
        success: true,
        studentId: req.params.studentId,
        history: []
    });

});

// Leaderboard
router.get("/leaderboard/:id", (req, res) => {

    res.json({
        success: true,
        leaderboard: []
    });

});

module.exports = router;
