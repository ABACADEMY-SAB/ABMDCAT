// =====================================
// ADMIN STUDENT ROUTES
// =====================================

const express = require("express");

const router = express.Router();

const controller =
    require("../controllers/adminStudentController");


// Get All Students
router.get(
    "/",
    controller.getAllStudents
);


// Get Student
router.get(
    "/:id",
    controller.getStudent
);


// Add Student
router.post(
    "/",
    controller.addStudent
);


// Update Student
router.put(
    "/:id",
    controller.updateStudent
);


// Block Student
router.put(
    "/:id/block",
    controller.blockStudent
);


// Unblock Student
router.put(
    "/:id/unblock",
    controller.unblockStudent
);


// Delete Student
router.delete(
    "/:id",
    controller.deleteStudent
);


module.exports = router;
