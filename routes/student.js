// =====================================
// STUDENT ROUTES
// =====================================

const express = require("express");

const router = express.Router();

const studentController =
    require("../controllers/studentController");


// =====================================
// Student Registration
// =====================================

router.post(
    "/register",
    studentController.register
);


// =====================================
// Student Login
// =====================================

router.post(
    "/login",
    studentController.login
);


// =====================================
// Student Dashboard
// =====================================

router.get(
    "/dashboard",
    studentController.dashboard
);


// =====================================
// Student Profile
// =====================================

router.get(
    "/profile",
    studentController.profile
);


// =====================================
// Update Profile
// =====================================

router.put(
    "/profile",
    studentController.updateProfile
);


// =====================================
// Change Password
// =====================================

router.put(
    "/change-password",
    studentController.changePassword
);


// =====================================
// Student Statistics
// =====================================

router.get(
    "/statistics",
    studentController.statistics
);


// =====================================
// Delete Account
// =====================================

router.delete(
    "/account",
    studentController.deleteAccount
);


// =====================================
// Logout
// =====================================

router.post(
    "/logout",
    studentController.logout
);


module.exports = router;
