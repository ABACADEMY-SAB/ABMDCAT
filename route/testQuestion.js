// =====================================
// TEST QUESTION ROUTES
// =====================================

const express = require("express");

const router = express.Router();

const controller =
    require("../controllers/testQuestionController");


// Get all MCQs belonging to a test
router.get(
    "/test/:testId",
    controller.getTestQuestions
);


// Add MCQ to test
router.post(
    "/test/:testId",
    controller.addQuestion
);


// Delete one test question
router.delete(
    "/:id",
    controller.deleteQuestion
);


// Remove all MCQs from test
router.delete(
    "/test/:testId/clear",
    controller.clearTest
);


// Count MCQs in test
router.get(
    "/test/:testId/count",
    controller.countQuestions
);


module.exports = router;
