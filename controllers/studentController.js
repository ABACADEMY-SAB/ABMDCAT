// =====================================
// STUDENT CONTROLLER - PostgreSQL
// =====================================

const Student = require("../models/student");


// =====================================
// Student Registration
// =====================================

exports.register = (req, res) => {

    const {
        username,
        password,
        fullname,
        email,
        phone
    } = req.body;


    if (
        !username ||
        !password ||
        !fullname ||
        !email ||
        !phone
    ) {

        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });

    }


    Student.getByUsername(
        username,
        (err, result) => {

            if (err) {

                console.error(
                    "Student username check error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }


            if (result.rows.length > 0) {

                return res.status(409).json({
                    success: false,
                    message: "Username already exists"
                });

            }


            Student.create(
                {
                    username,
                    password,
                    fullname,
                    email,
                    phone
                },
                (err, result) => {

                    if (err) {

                        console.error(
                            "Student registration error:",
                            err
                        );

                        return res.status(500).json({
                            success: false,
                            message: "Database error"
                        });

                    }


                    return res.status(201).json({

                        success: true,

                        message:
                            "Student Registered Successfully",

                        student:
                            result.rows[0]

                    });

                }
            );

        }
    );

};


// =====================================
// Student Login
// =====================================

exports.login = (req, res) => {

    const {
        username,
        password
    } = req.body;


    if (!username || !password) {

        return res.status(400).json({
            success: false,
            message:
                "Username and password are required"
        });

    }


    Student.getByUsername(
        username,
        (err, result) => {

            if (err) {

                console.error(
                    "Student login error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }


            if (result.rows.length === 0) {

                return res.status(401).json({
                    success: false,
                    message:
                        "Invalid username or password"
                });

            }


            const student =
                result.rows[0];


            if (student.password !== password) {

                return res.status(401).json({
                    success: false,
                    message:
                        "Invalid username or password"
                });

            }


            if (student.status === "blocked") {

                return res.status(403).json({
                    success: false,
                    message:
                        "Your account has been blocked"
                });

            }


            return res.json({

                success: true,

                message:
                    "Student Login Successful",

                student: {

                    id: student.id,

                    username:
                        student.username,

                    fullname:
                        student.fullname,

                    email:
                        student.email,

                    phone:
                        student.phone,

                    status:
                        student.status

                }

            });

        }
    );

};


// =====================================
// Student Dashboard
// =====================================

exports.dashboard = (req, res) => {

    res.json({

        success: true,

        message:
            "Welcome to ABMDCAT Student Dashboard"

    });

};


// =====================================
// Student Profile
// =====================================

exports.profile = (req, res) => {

    const id =
        req.query.id ||
        req.body.id;


    if (!id) {

        return res.status(400).json({
            success: false,
            message:
                "Student ID is required"
        });

    }


    Student.getById(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Student profile error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }


            if (result.rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Student not found"
                });

            }


            return res.json({

                success: true,

                student:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// Update Student Profile
// =====================================

exports.updateProfile = (req, res) => {

    const {
        id,
        fullname,
        email,
        phone
    } = req.body;


    if (!id) {

        return res.status(400).json({
            success: false,
            message:
                "Student ID is required"
        });

    }


    if (!fullname || !email || !phone) {

        return res.status(400).json({
            success: false,
            message:
                "Full name, email and phone are required"
        });

    }


    Student.update(
        id,
        {
            fullname,
            email,
            phone
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Student profile update error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }


            if (result.rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Student not found"
                });

            }


            return res.json({

                success: true,

                message:
                    "Profile Updated Successfully",

                student:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// Change Password
// =====================================

exports.changePassword = (req, res) => {

    const {
        id,
        password
    } = req.body;


    if (!id || !password) {

        return res.status(400).json({
            success: false,
            message:
                "Student ID and password are required"
        });

    }


    Student.changePassword(
        id,
        password,
        (err, result) => {

            if (err) {

                console.error(
                    "Student password change error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }


            if (result.rowCount === 0) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Student not found"
                });

            }


            return res.json({

                success: true,

                message:
                    "Password Changed Successfully"

            });

        }
    );

};


// =====================================
// Student Statistics
// =====================================

exports.statistics = (req, res) => {

    res.json({

        success: true,

        testsAttempted: 0,

        averageScore: 0,

        bookmarks: 0,

        wrongQuestions: 0

    });

};


// =====================================
// Delete Student Account
// =====================================

exports.deleteAccount = (req, res) => {

    const id =
        req.body.id ||
        req.query.id;


    if (!id) {

        return res.status(400).json({
            success: false,
            message:
                "Student ID is required"
        });

    }


    Student.delete(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Student deletion error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }


            if (result.rowCount === 0) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Student not found"
                });

            }


            return res.json({

                success: true,

                message:
                    "Student Account Deleted Successfully"

            });

        }
    );

};


// =====================================
// Student Logout
// =====================================

exports.logout = (req, res) => {

    res.json({

        success: true,

        message:
            "Student Logged Out Successfully"

    });

};
