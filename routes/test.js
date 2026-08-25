// =====================================
// TEST ROUTES
// =====================================

const express = require("express");

const router = express.Router();

const testController =
    require("../controllers/testController");


// =====================================
// Get All Tests
// =====================================

router.get(
    "/",
    testController.getAllTests
);


// =====================================
// Create Test
// =====================================

router.post(
    "/create",
    testController.createTest
);


// =====================================
// Update Test
// =====================================

router.put(
    "/update/:id",
    testController.updateTest
);


// =====================================
// Schedule Test
// =====================================

router.put(
    "/schedule/:id",
    testController.scheduleTest
);


// =====================================
// Delete Test
// =====================================

router.delete(
    "/delete/:id",
    testController.deleteTest
);


// =====================================
// Start Test
// =====================================

router.post(
    "/start/:id",
    testController.startTest
);


// =====================================
// Submit Test
// =====================================

router.post(
    "/submit/:id",
    testController.submitTest
);


// =====================================
// Test History
// =====================================

router.get(
    "/history/:studentId",
    testController.testHistory
);


// =====================================
// Leaderboard
// =====================================

router.get(
    "/leaderboard/:id",
    testController.leaderboard
);


// =====================================
// Get Test By ID
// IMPORTANT: Keep this LAST
// =====================================

router.get(
    "/:id",
    testController.getTestById
);


module.exports = router;
