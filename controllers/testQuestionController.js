// =====================================
// TEST QUESTION CONTROLLER
// =====================================

const TestQuestion =
    require("../models/testQuestion");


// =====================================
// GET QUESTIONS OF TEST
// =====================================

exports.getTestQuestions = (req, res) => {

    const { testId } = req.params;

    TestQuestion.getByTestId(
        testId,
        (err, result) => {

            if (err) {

                console.error(
                    "Get test questions error:",
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

                questions:
                    result.rows

            });

        }
    );

};


// =====================================
// ADD MCQ TO TEST
// =====================================

exports.addQuestion = (req, res) => {

    const { testId } = req.params;

    const {
        mcq_id,
        question_order
    } = req.body;


    if (!mcq_id) {

        return res.status(400).json({

            success: false,

            message:
                "MCQ ID is required"

        });

    }


    const order =
        Number(question_order) || 1;


    TestQuestion.exists(
        testId,
        mcq_id,
        (err, existing) => {

            if (err) {

                console.error(
                    "Check duplicate error:",
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


            if (existing.rows.length > 0) {

                return res.status(409).json({

                    success: false,

                    message:
                        "This MCQ is already added to this test"

                });

            }


            TestQuestion.add(
                {
                    test_id: testId,
                    mcq_id,
                    question_order: order
                },
                (err, result) => {

                    if (err) {

                        console.error(
                            "Add test question error:",
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
                            "MCQ added to test successfully",

                        question:
                            result.rows[0]

                    });

                }
            );

        }
    );

};


// =====================================
// REMOVE MCQ FROM TEST
// =====================================

exports.deleteQuestion = (req, res) => {

    const { id } = req.params;

    TestQuestion.delete(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Delete test question error:",
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


            if (result.rowCount === 0) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Test question not found"

                });

            }


            return res.json({

                success: true,

                message:
                    "MCQ removed from test"

            });

        }
    );

};


// =====================================
// REMOVE ALL QUESTIONS FROM TEST
// =====================================

exports.clearTest = (req, res) => {

    const { testId } = req.params;

    TestQuestion.deleteByTestId(
        testId,
        (err, result) => {

            if (err) {

                console.error(
                    "Clear test questions error:",
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
                    "All MCQs removed from test",

                deleted:
                    result.rowCount

            });

        }
    );

};


// =====================================
// COUNT QUESTIONS
// =====================================

exports.countQuestions = (req, res) => {

    const { testId } = req.params;

    TestQuestion.countByTestId(
        testId,
        (err, result) => {

            if (err) {

                console.error(
                    "Count test questions error:",
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

                total:
                    Number(
                        result.rows[0].total
                    )

            });

        }
    );

};
