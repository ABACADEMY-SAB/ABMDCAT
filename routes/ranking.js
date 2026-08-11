const express = require("express");
const router = express.Router();

const rankingController = require("../controllers/rankingController");

// Overall Ranking
router.get("/overall", rankingController.overall);

// Daily Ranking
router.get("/daily", rankingController.daily);

// Weekly Ranking
router.get("/weekly", rankingController.weekly);

// Monthly Ranking
router.get("/monthly", rankingController.monthly);

// Subject Ranking
router.get("/subject/:subject", rankingController.subject);

// Chapter Ranking
router.get("/chapter/:chapter", rankingController.chapter);

// Top 10 Students
router.get("/top10", rankingController.top10);

// Student Rank
router.get("/student/:studentId", rankingController.student);

// Merit List
router.get("/merit-list", rankingController.meritList);

module.exports = router;
