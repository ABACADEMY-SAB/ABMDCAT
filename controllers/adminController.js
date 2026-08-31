// =====================================
// ADMIN CONTROLLER
// =====================================

const db = require("../config/database");
const Admin = require("../models/admin");
const Settings = require("../models/settings");


// =====================================
// DASHBOARD
// =====================================

exports.dashboard = (req, res) => {

    res.json({
        success: true,
        message: "Welcome to ABMDCAT Admin Dashboard"
    });

};


// =====================================
// ADMIN LOGIN
// =====================================

exports.login = (req, res) => {

    const {
        username,
        password
    } = req.body;


    if (!username || !password) {

        return res.status(400).json({
            success: false,
            message: "Username and password are required"
        });

    }


    Admin.login(
        username,
        password,
        (err, result) => {

            if (err) {

                console.error(
                    "Admin login error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }


            if (result.rows.length === 0) {

                return res.status(401).json({
                    success: false,
                    message:
                        "Invalid username or password"
                });

            }


            const admin = result.rows[0];


            return res.json({

                success: true,

                message:
                    "Admin Login Successful",

                admin: {

                    id: admin.id,

                    username:
                        admin.username,

                    fullname:
                        admin.fullname,

                    created_at:
                        admin.created_at

                }

            });

        }
    );

};


// =====================================
// ADMIN PROFILE
// =====================================

exports.profile = (req, res) => {

    const id =
        req.query.id ||
        req.body.id;


    if (!id) {

        return res.status(400).json({
            success: false,
            message:
                "Admin ID is required"
        });

    }


    Admin.getById(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Admin profile error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }


            if (result.rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Admin not found"
                });

            }


            const admin =
                result.rows[0];


            return res.json({

                success: true,

                admin: {

                    id: admin.id,

                    username:
                        admin.username,

                    fullname:
                        admin.fullname,

                    created_at:
                        admin.created_at

                }

            });

        }
    );

};


// =====================================
// UPDATE ADMIN PROFILE
// =====================================

exports.updateProfile = (req, res) => {

    const id =
        req.body.id;

    const {
        username,
        fullname
    } = req.body;


    if (!id || !username || !fullname) {

        return res.status(400).json({

            success: false,

            message:
                "Admin ID, username and full name are required"

        });

    }


    Admin.updateProfile(
        id,
        {
            username: username,
            fullname: fullname
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Update profile error:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Database error",

                    error:
                        err.message

                });

            }


            return res.json({

                success: true,

                message:
                    "Profile updated successfully"

            });

        }
    );

};


// =====================================
// CHANGE ADMIN PASSWORD
// =====================================

exports.changePassword = (req, res) => {

    const id =
        req.body.id;

    const password =
        req.body.password;


    if (!id || !password) {

        return res.status(400).json({

            success: false,

            message:
                "Admin ID and password are required"

        });

    }


    Admin.changePassword(
        id,
        password,
        (err, result) => {

            if (err) {

                console.error(
                    "Change password error:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Database error",

                    error:
                        err.message

                });

            }


            return res.json({

                success: true,

                message:
                    "Password changed successfully"

            });

        }
    );

};


// =====================================
// DASHBOARD STATISTICS
// =====================================

exports.statistics = (req, res) => {

    const queries = [

        `SELECT COUNT(*) AS total FROM students`,

        `SELECT COUNT(*) AS total FROM mcqs`,

        `SELECT COUNT(*) AS total FROM tests`,

        `SELECT COUNT(*) AS total FROM notes`,

        `SELECT COUNT(*) AS total FROM results`

    ];


    Promise.all(

        queries.map(query => {

            return new Promise(
                (resolve, reject) => {

                    db.query(
                        query,
                        (err, result) => {

                            if (err) {

                                reject(err);

                            } else {

                                resolve(
                                    Number(
                                        result.rows[0].total
                                    )
                                );

                            }

                        }
                    );

                }
            );

        })

    )

    .then(counts => {

        return res.json({

            success: true,

            totalStudents:
                counts[0],

            totalMcqs:
                counts[1],

            totalTests:
                counts[2],

            totalNotes:
                counts[3],

            totalResults:
                counts[4]

        });

    })

    .catch(err => {

        console.error(
            "Admin statistics error:",
            err
        );

        return res.status(500).json({

            success: false,

            message:
                "Database error",

            error:
                err.message

        });

    });

};


// =====================================
// WEBSITE SETTINGS
// =====================================

exports.settings = (req, res) => {

    Settings.getSettings(
        (err, result) => {

            if (err) {

                console.error(
                    "Settings error:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Database error",

                    error:
                        err.message

                });

            }


            if (result.rows.length === 0) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Settings not found"

                });

            }


            const settings =
                result.rows[0];


            return res.json({

                success: true,

                settings: settings

            });

        }
    );

};


// =====================================
// PUBLIC MAINTENANCE STATUS
// =====================================

exports.maintenanceStatus = (req, res) => {

    Settings.getSettings(
        (err, result) => {

            if (err) {

                console.error(
                    "Maintenance status error:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Database error"

                });

            }


            if (result.rows.length === 0) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Settings not found"

                });

            }


            const settings =
                result.rows[0];


            return res.json({

                success: true,

                maintenance:
                    settings.maintenance === true ||
                    settings.maintenance === "true"

            });

        }
    );

};


// =====================================
// UPDATE SINGLE SETTING
// =====================================

exports.updateSetting = (req, res) => {

    const {
        setting,
        value
    } = req.body;


    if (!setting) {

        return res.status(400).json({

            success: false,

            message:
                "Setting name is required"

        });

    }


    Settings.updateSingleSetting(
        setting,
        Boolean(value),
        (err, result) => {

            if (err) {

                console.error(
                    "Update setting error:",
                    err
                );

                return res.status(400).json({

                    success: false,

                    message:
                        err.message

                });

            }


            return res.json({

                success: true,

                message:
                    "Setting updated successfully",

                setting:
                    setting,

                value:
                    Boolean(value)

            });

        }
    );

};


// =====================================
// ENABLE MAINTENANCE
// =====================================

exports.enableMaintenance = (req, res) => {

    res.json({

        success: true,

        message:
            "Maintenance Mode Enabled"

    });

};


// =====================================
// DISABLE MAINTENANCE
// =====================================

exports.disableMaintenance = (req, res) => {

    res.json({

        success: true,

        message:
            "Maintenance Mode Disabled"

    });

};


// =====================================
// LOGOUT
// =====================================

exports.logout = (req, res) => {

    res.json({

        success: true,

        message:
            "Admin Logged Out Successfully"

    });

};
