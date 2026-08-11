const express = require("express");
const router = express.Router();

const resultController = require("../controllers/resultController");

// Get All Results
router.get("/", resultController.getAllResults);

// Student Results
router.get("/student/:studentId", resultController.getStudentResults);

// Result Details
router.get("/:resultId", resultController.getResultById);

// Performance Report
router.get("/report/:studentId", resultController.performanceReport);

// Ranking
router.get("/ranking/all", resultController.overallRanking);

// Certificate
router.get("/certificate/:studentId", resultController.generateCertificate);

// Save Practice Result
router.post("/practice", resultController.savePracticeResult);

// Save Online Test Result
router.post("/test", resultController.saveOnlineTestResult);

// Progress Analytics
router.get("/analytics/:studentId", resultController.progressAnalytics);

// Dashboard Statistics
router.get("/statistics/:studentId", resultController.dashboardStatistics);

module.exports = router;
