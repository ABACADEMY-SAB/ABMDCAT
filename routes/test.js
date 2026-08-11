const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController");

// Get All Tests
router.get("/", testController.getAllTests);

// Get Test By ID
router.get("/:id", testController.getTestById);

// Create Test
router.post("/create", testController.createTest);

// Update Test
router.put("/update/:id", testController.updateTest);

// Delete Test
router.delete("/delete/:id", testController.deleteTest);

// Start Test
router.post("/start/:id", testController.startTest);

// Submit Test
router.post("/submit/:id", testController.submitTest);

// Test History
router.get("/history/:studentId", testController.testHistory);

// Leaderboard
router.get("/leaderboard/:id", testController.leaderboard);

module.exports = router;
