const express = require("express");

const router = express.Router();

// Get All Bookmarks
router.get("/:studentId", (req, res) => {

    res.json({
        success: true,
        studentId: req.params.studentId,
        bookmarks: []
    });

});

// Add Bookmark
router.post("/add", (req, res) => {

    res.json({
        success: true,
        message: "MCQ Bookmarked Successfully"
    });

});

// Remove Bookmark
router.delete("/remove/:id", (req, res) => {

    res.json({
        success: true,
        message: "Bookmark Removed Successfully"
    });

});

// Get Favorite MCQs
router.get("/favorites/:studentId", (req, res) => {

    res.json({
        success: true,
        favorites: []
    });

});

// Add Wrong Question
router.post("/wrong/add", (req, res) => {

    res.json({
        success: true,
        message: "Wrong Question Saved"
    });

});

// Get Wrong Questions
router.get("/wrong/:studentId", (req, res) => {

    res.json({
        success: true,
        wrongQuestions: []
    });

});

// Revision List
router.get("/revision/:studentId", (req, res) => {

    res.json({
        success: true,
        revision: []
    });

});

// Smart Practice
router.get("/smart-practice/:studentId", (req, res) => {

    res.json({
        success: true,
        questions: []
    });

});

module.exports = router;
