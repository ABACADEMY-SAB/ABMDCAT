const express = require("express");

const router = express.Router();

// Get All MCQs
router.get("/", (req, res) => {

    res.json({
        success: true,
        message: "All MCQs",
        data: []
    });

});

// Get MCQ By ID
router.get("/:id", (req, res) => {

    res.json({
        success: true,
        mcqId: req.params.id
    });

});

// Add MCQ
router.post("/add", (req, res) => {

    res.json({
        success: true,
        message: "MCQ Added Successfully"
    });

});

// Update MCQ
router.put("/update/:id", (req, res) => {

    res.json({
        success: true,
        message: "MCQ Updated Successfully"
    });

});

// Delete MCQ
router.delete("/delete/:id", (req, res) => {

    res.json({
        success: true,
        message: "MCQ Deleted Successfully"
    });

});

// Search MCQ
router.get("/search/:keyword", (req, res) => {

    res.json({
        success: true,
        keyword: req.params.keyword,
        results: []
    });

});

// Filter by Subject
router.get("/subject/:subject", (req, res) => {

    res.json({
        success: true,
        subject: req.params.subject,
        mcqs: []
    });

});

// Filter by Chapter
router.get("/chapter/:chapter", (req, res) => {

    res.json({
        success: true,
        chapter: req.params.chapter,
        mcqs: []
    });

});

// Filter by Topic
router.get("/topic/:topic", (req, res) => {

    res.json({
        success: true,
        topic: req.params.topic,
        mcqs: []
    });

});

// Random Practice MCQs
router.get("/practice/random/:count", (req, res) => {

    res.json({
        success: true,
        total: req.params.count,
        questions: []
    });

});

module.exports = router;
