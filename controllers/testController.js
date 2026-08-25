// =====================================
// TEST CONTROLLER - PostgreSQL
// =====================================

const Test = require("../models/test");


// =====================================
// Get All Tests
// =====================================

exports.getAllTests = (req, res) => {

    Test.getAll((err, result) => {

        if (err) {

            console.error(
                "Get tests error:",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Database error"
            });

        }

        return res.json({
            success: true,
            tests: result.rows
        });

    });

};


// =====================================
// Get Test By ID
// =====================================

exports.getTestById = (req, res) => {

    const { id } = req.params;

    Test.getById(id, (err, result) => {

        if (err) {

            console.error(
                "Get test error:",
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
                message: "Test not found"
            });

        }

        return res.json({
            success: true,
            test: result.rows[0]
        });

    });

};


// =====================================
// Create Test
// =====================================

exports.createTest = (req, res) => {

    const {
        title,
        description,
        subject,
        chapter,
        topic,
        total_questions,
        duration_minutes,
        start_time
    } = req.body;


    if (
        !title ||
        !subject ||
        !total_questions ||
        !duration_minutes
    ) {

        return res.status(400).json({
            success: false,
            message:
                "Title, subject, total questions and duration are required"
        });

    }


    Test.create(
        {
            title,
            description,
            subject,
            chapter,
            topic,
            total_questions,
            duration_minutes,
            start_time
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Create test error:",
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
                    "Online Test Created Successfully",

                test:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// Update Test
// =====================================

exports.updateTest = (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        subject,
        chapter,
        topic,
        total_questions,
        duration_minutes,
        start_time
    } = req.body;


    Test.update(
        id,
        {
            title,
            description,
            subject,
            chapter,
            topic,
            total_questions,
            duration_minutes,
            start_time
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Update test error:",
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
                    message: "Test not found"
                });

            }

            return res.json({

                success: true,

                message:
                    "Test Updated Successfully",

                test:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// Delete Test
// =====================================

exports.deleteTest = (req, res) => {

    const { id } = req.params;

    Test.delete(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Delete test error:",
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
                    message: "Test not found"
                });

            }

            return res.json({

                success: true,

                message:
                    "Test Deleted Successfully"

            });

        }
    );

};


// =====================================
// Start Test
// =====================================

exports.startTest = (req, res) => {

    const { id } = req.params;

    Test.getById(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Start test error:",
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
                    message: "Test not found"
                });

            }

            return res.json({

                success: true,

                status: "Test Started",

                test:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// Schedule Test
// =====================================

exports.scheduleTest = (req, res) => {

    const { id } = req.params;

    const { start_time } = req.body;


    if (!start_time) {

        return res.status(400).json({
            success: false,
            message: "Start time is required"
        });

    }


    Test.update(
        id,
        {
            title: req.body.title,
            description: req.body.description,
            subject: req.body.subject,
            chapter: req.body.chapter,
            topic: req.body.topic,
            total_questions: req.body.total_questions,
            duration_minutes: req.body.duration_minutes,
            start_time
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Schedule test error:",
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
                    message: "Test not found"
                });

            }

            return res.json({

                success: true,

                message:
                    "Test Scheduled Successfully",

                test:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// Submit Test
// =====================================

exports.submitTest = (req, res) => {

    res.json({

        success: true,

        score: 0,

        percentage: 0,

        message:
            "Test submission system will be connected with Results module"

    });

};


// =====================================
// Test History
// =====================================

exports.testHistory = (req, res) => {

    res.json({

        success: true,

        history: []

    });

};


// =====================================
// Leaderboard
// =====================================

exports.leaderboard = (req, res) => {

    res.json({

        success: true,

        leaderboard: []

    });

};
