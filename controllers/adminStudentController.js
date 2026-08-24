// =====================================
// ADMIN STUDENT CONTROLLER
// =====================================

const Student = require("../models/student");


// =====================================
// Get All Students
// =====================================

exports.getAllStudents = (req, res) => {

    Student.getAll((err, result) => {

        if (err) {

            console.error(
                "Get students error:",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Database error"
            });

        }

        res.json({
            success: true,
            students: result.rows
        });

    });

};


// =====================================
// Get Student
// =====================================

exports.getStudent = (req, res) => {

    const id = req.params.id;

    Student.getById(id, (err, result) => {

        if (err) {

            console.error(
                "Get student error:",
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
                message: "Student not found"
            });

        }

        res.json({
            success: true,
            student: result.rows[0]
        });

    });

};


// =====================================
// Add Student
// =====================================

exports.addStudent = (req, res) => {

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
                    "Username check error:",
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
                            "Add student error:",
                            err
                        );

                        return res.status(500).json({
                            success: false,
                            message: "Database error"
                        });

                    }

                    res.status(201).json({
                        success: true,
                        message: "Student added successfully",
                        student: result.rows[0]
                    });

                }
            );

        }
    );

};


// =====================================
// Update Student
// =====================================

exports.updateStudent = (req, res) => {

    const id = req.params.id;

    const {
        fullname,
        email,
        phone
    } = req.body;

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
                    "Update student error:",
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
                    message: "Student not found"
                });

            }

            res.json({
                success: true,
                message: "Student updated successfully",
                student: result.rows[0]
            });

        }
    );

};


// =====================================
// Block Student
// =====================================

exports.blockStudent = (req, res) => {

    const id = req.params.id;

    Student.block(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Block student error:",
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
                    message: "Student not found"
                });

            }

            res.json({
                success: true,
                message: "Student blocked successfully",
                student: result.rows[0]
            });

        }
    );

};


// =====================================
// Unblock Student
// =====================================

exports.unblockStudent = (req, res) => {

    const id = req.params.id;

    Student.unblock(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Unblock student error:",
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
                    message: "Student not found"
                });

            }

            res.json({
                success: true,
                message: "Student unblocked successfully",
                student: result.rows[0]
            });

        }
    );

};


// =====================================
// Delete Student
// =====================================

exports.deleteStudent = (req, res) => {

    const id = req.params.id;

    Student.delete(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Delete student error:",
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
                    message: "Student not found"
                });

            }

            res.json({
                success: true,
                message: "Student deleted successfully"
            });

        }
    );

};
