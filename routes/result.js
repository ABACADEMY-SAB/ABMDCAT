const express = require("express");

const router = express.Router();

// Get All Results
router.get("/", (req, res) => {

    res.json({
        success: true,
        results: []
    });

});

// Student Results
router.get("/student/:studentId", (req, res) => {

    res.json({
        success: true,
        studentId: req.params.studentId,
        results: []
    });

});

// Result Details
router.get("/:resultId", (req, res) => {

    res.json({
        success: true,
        resultId: req.params.resultId
    });

});

// Performance Report
router.get("/report/:studentId", (req, res) => {

    res.json({
        success: true,
        studentId: req.params.studentId,
        average: 0,
        highest: 0,
        lowest: 0
    });

});

// Ranking
router.get("/ranking/all", (req, res) => {

    res.json({
        success: true,
        ranking: []
    });

});

// Certificate
router.get("/certificate/:studentId", (req, res) => {

    res.json({
        success: true,
        message: "Certificate Ready"
    });

});

module.exports = router;
