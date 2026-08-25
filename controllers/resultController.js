// =====================================
// RESULT CONTROLLER - PostgreSQL
// =====================================

const Result = require("../models/result");


// =====================================
// GET ALL RESULTS
// =====================================

exports.getAllResults = (req, res) => {

    Result.getAll((err, result) => {

        if (err) {

            console.error(
                "Get all results error:",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err.message
            });

        }

        return res.json({

            success: true,

            results: result.rows

        });

    });

};


// =====================================
// GET STUDENT RESULTS
// =====================================

exports.getStudentResults = (req, res) => {

    const { studentId } = req.params;

    Result.getStudentResults(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Get student results error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }

            return res.json({

                success: true,

                studentId,

                results:
                    result.rows

            });

        }
    );

};


// =====================================
// GET RESULT BY ID
// =====================================

exports.getResultById = (req, res) => {

    const { resultId } = req.params;

    Result.getById(
        resultId,
        (err, result) => {

            if (err) {

                console.error(
                    "Get result error:",
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
                    message: "Result not found"
                });

            }

            return res.json({

                success: true,

                result:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// SAVE PRACTICE RESULT
// =====================================

exports.savePracticeResult = (req, res) => {

    const {
        student_id,
        subject,
        chapter,
        topic,
        total_questions,
        correct_answers,
        wrong_answers,
        percentage
    } = req.body;


    if (
        !student_id ||
        !total_questions ||
        correct_answers === undefined ||
        wrong_answers === undefined ||
        percentage === undefined
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Required result fields are missing"

        });

    }


    Result.create(
        {
            student_id,
            subject,
            chapter,
            topic,
            total_questions,
            correct_answers,
            wrong_answers,
            percentage
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Save practice result error:",
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


            return res.status(201).json({

                success: true,

                message:
                    "Practice Result Saved Successfully",

                result:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// SAVE ONLINE TEST RESULT
// =====================================

exports.saveOnlineTestResult = (req, res) => {

    const {
        student_id,
        subject,
        chapter,
        topic,
        total_questions,
        correct_answers,
        wrong_answers,
        percentage
    } = req.body;


    if (
        !student_id ||
        !total_questions ||
        correct_answers === undefined ||
        wrong_answers === undefined ||
        percentage === undefined
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Required result fields are missing"

        });

    }


    Result.create(
        {
            student_id,
            subject,
            chapter,
            topic,
            total_questions,
            correct_answers,
            wrong_answers,
            percentage
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Save online test result error:",
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


            return res.status(201).json({

                success: true,

                message:
                    "Online Test Result Saved Successfully",

                result:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// PERFORMANCE REPORT
// =====================================

exports.performanceReport = (req, res) => {

    const { studentId } = req.params;

    Result.statistics(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Performance report error:",
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


            const stats =
                result.rows[0];


            return res.json({

                success: true,

                averageScore:
                    Number(
                        stats.average || 0
                    ),

                highestScore:
                    Number(
                        stats.highest || 0
                    ),

                lowestScore:
                    Number(
                        stats.lowest || 0
                    ),

                totalTests:
                    Number(
                        stats.tests || 0
                    )

            });

        }
    );

};


// =====================================
// OVERALL RANKING
// =====================================

exports.overallRanking = (req, res) => {

    Result.ranking(
        (err, result) => {

            if (err) {

                console.error(
                    "Ranking error:",
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

                ranking:
                    result.rows

            });

        }
    );

};


// =====================================
// CERTIFICATE
// =====================================

exports.generateCertificate = (req, res) => {

    const { studentId } = req.params;


    Result.statistics(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Certificate error:",
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


            const stats =
                result.rows[0];


            return res.json({

                success: true,

                certificate: {

                    studentId,

                    averageScore:
                        Number(
                            stats.average || 0
                        ),

                    totalTests:
                        Number(
                            stats.tests || 0
                        )

                }

            });

        }
    );

};


// =====================================
// PROGRESS ANALYTICS
// =====================================

exports.progressAnalytics = (req, res) => {

    const { studentId } = req.params;


    Result.getStudentResults(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Progress analytics error:",
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

                analytics: {

                    totalResults:
                        result.rows.length,

                    results:
                        result.rows

                }

            });

        }
    );

};


// =====================================
// DASHBOARD STATISTICS
// =====================================

exports.dashboardStatistics = (req, res) => {

    const { studentId } = req.params;


    Result.statistics(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Dashboard statistics error:",
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


            const stats =
                result.rows[0];


            return res.json({

                success: true,

                statistics: {

                    tests:
                        Number(
                            stats.tests || 0
                        ),

                    average:
                        Number(
                            stats.average || 0
                        ),

                    highest:
                        Number(
                            stats.highest || 0
                        ),

                    lowest:
                        Number(
                            stats.lowest || 0
                        )

                }

            });

        }
    );

};
