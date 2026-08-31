const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// Admin Login
router.post("/login", adminController.login);

// Dashboard
router.get("/dashboard", adminController.dashboard);

// Profile
router.get("/profile", adminController.profile);

router.put(
    "/profile",
    adminController.updateProfile
);

router.put(
    "/profile/password",
    adminController.changePassword
);

// Statistics
router.get("/statistics", adminController.statistics);

// Settings
router.get("/settings", adminController.settings);

// Update Setting
router.put(
    "/settings",
    adminController.updateSetting
);

// Enable Maintenance
router.post(
    "/maintenance/on",
    adminController.enableMaintenance
);

// Disable Maintenance
router.post(
    "/maintenance/off",
    adminController.disableMaintenance
);

// Maintenance Status
router.get(
    "/maintenance/status",
    adminController.maintenanceStatus
);

// Logout
router.post("/logout", adminController.logout);

module.exports = router;
