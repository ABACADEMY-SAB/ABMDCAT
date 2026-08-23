// =====================================
// ADMIN STUDENT ROUTES
// =====================================

const express = require("express");

const router = express.Router();

const adminStudentController =
    require("../controllers/adminStudentController");


// =====================================
// Get All Students
// =====================================

router.get(
    "/",
    adminStudentController.getAllStudents
);


// =====================================
// Get Student By ID
// =====================================

router.get(
    "/:id",
    adminStudentController.getStudent
);


// =====================================
// Add Student
// =====================================

router.post(
    "/",
    adminStudentController.addStudent
);


// =====================================
// Update Student
// =====================================

router.put(
    "/:id",
    adminStudentController.updateStudent
);


// =====================================
// Block Student
// =====================================

router.put(
    "/:id/block",
    adminStudentController.blockStudent
);


// =====================================
// Unblock Student
// =====================================

router.put(
    "/:id/unblock",
    adminStudentController.unblockStudent
);


// =====================================
// Delete Student
// =====================================

router.delete(
    "/:id",
    adminStudentController.deleteStudent
);


module.exports = router;
