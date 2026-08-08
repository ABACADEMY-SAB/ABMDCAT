// =====================================
// ADMIN CONTROLLER
// =====================================

// Dashboard
exports.dashboard = (req, res) => {

    res.json({

        success: true,
        message: "Welcome to ABMDCAT Admin Dashboard"

    });

};

// Admin Profile
exports.profile = (req, res) => {

    res.json({

        success: true,

        admin: {

            username: "SAB@madina06",

            fullname: "Super Admin"

        }

    });

};

// Dashboard Statistics
exports.statistics = (req, res) => {

    res.json({

        totalStudents: 0,

        totalMcqs: 0,

        totalTests: 0,

        totalNotes: 0,

        totalResults: 0

    });

};

// Website Settings
exports.settings = (req, res) => {

    res.json({

        website: "ABMDCAT",

        version: "1.0",

        maintenance: false

    });

};

// Enable Maintenance
exports.enableMaintenance = (req, res) => {

    res.json({

        success: true,

        message: "Maintenance Mode Enabled"

    });

};

// Disable Maintenance
exports.disableMaintenance = (req, res) => {

    res.json({

        success: true,

        message: "Maintenance Mode Disabled"

    });

};

// Logout
exports.logout = (req, res) => {

    res.json({

        success: true,

        message: "Admin Logged Out Successfully"

    });

};
