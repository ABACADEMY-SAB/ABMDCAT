const express = require("express");

const router = express.Router();

// Overall Ranking
router.get("/overall", (req, res) => {

    res.json({
        success: true,
        ranking: []
    });

});

// Daily Ranking
router.get("/daily", (req, res) => {

    res.json({
        success: true,
        ranking: []
    });

});

// Weekly Ranking
router.get("/weekly", (req, res) => {

    res.json({
        success: true,
        ranking: []
    });

});

// Monthly Ranking
router.get("/monthly", (req, res) => {

    res.json({
        success: true,
        ranking: []
    });

});

// Subject Ranking
router.get("/subject/:subject", (req, res) => {

    res.json({
        success: true,
        subject: req.params.subject,
        ranking: []
    });

});

// Chapter Ranking
router.get("/chapter/:chapter", (req, res) => {

    res.json({
        success: true,
        chapter: req.params.chapter,
        ranking: []
    });

});

// Top 10 Students
router.get("/top10", (req, res) => {

    res.json({
        success: true,
        students: []
    });

});

// Student Rank
router.get("/student/:studentId", (req, res) => {

    res.json({
        success: true,
        studentId: req.params.studentId,
        rank: null
    });

});

// Merit List
router.get("/merit-list", (req, res) => {

    res.json({
        success: true,
        meritList: []
    });

});

module.exports = router;
