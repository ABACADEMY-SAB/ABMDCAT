// =====================================
// TEST QUESTION ROUTES
// =====================================

const express = require("express");

const router = express.Router();

const testQuestionController =
    require("../controllers/testQuestionController");


// =====================================
// GET QUESTIONS OF TEST
// =====================================

router.get(
    "/test/:testId",
    testQuestionController.getTestQuestions
);


// =====================================
// ADD MCQ TO TEST
// =====================================

router.post(
    "/test/:testId",
    testQuestionController.addQuestion
);


// =====================================
// REMOVE MCQ FROM TEST
// =====================================

router.delete(
    "/:id",
    testQuestionController.deleteQuestion
);


// =====================================
// REMOVE ALL QUESTIONS FROM TEST
// =====================================

router.delete(
    "/test/:testId/clear",
    testQuestionController.clearTest
);


// =====================================
// COUNT QUESTIONS IN TEST
// =====================================

router.get(
    "/test/:testId/count",
    testQuestionController.countQuestions
);


module.exports = router;
