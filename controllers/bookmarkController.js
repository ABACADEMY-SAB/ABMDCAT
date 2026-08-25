// =====================================
// BOOKMARK CONTROLLER
// =====================================

const Bookmark = require("../models/bookmark");


// =====================================
// GET ALL BOOKMARKS
// =====================================

exports.getBookmarks = (req, res) => {

    const { studentId } = req.params;

    Bookmark.getByStudentId(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Get bookmarks error:",
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
                bookmarks: result.rows
            });

        }
    );

};


// =====================================
// ADD BOOKMARK
// =====================================

exports.addBookmark = (req, res) => {

    const {
        student_id,
        mcq_id
    } = req.body;


    if (!student_id || !mcq_id) {

        return res.status(400).json({
            success: false,
            message: "student_id and mcq_id are required"
        });

    }


    Bookmark.exists(
        student_id,
        mcq_id,
        (err, existing) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }


            if (existing.rows.length > 0) {

                return res.status(409).json({
                    success: false,
                    message: "MCQ already bookmarked"
                });

            }


            Bookmark.create(
                {
                    student_id,
                    mcq_id
                },
                (err, result) => {

                    if (err) {

                        console.error(
                            "Add bookmark error:",
                            err
                        );

                        return res.status(500).json({
                            success: false,
                            message: "Database error",
                            error: err.message
                        });

                    }


                    return res.status(201).json({
                        success: true,
                        message: "MCQ Bookmarked Successfully",
                        bookmark: result.rows[0]
                    });

                }
            );

        }
    );

};


// =====================================
// REMOVE BOOKMARK
// =====================================

exports.removeBookmark = (req, res) => {

    const { id } = req.params;

    Bookmark.delete(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Remove bookmark error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }


            if (result.rowCount === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Bookmark not found"
                });

            }


            return res.json({
                success: true,
                message: "Bookmark Removed Successfully"
            });

        }
    );

};


// =====================================
// FAVORITES
// =====================================

exports.getFavorites = (req, res) => {

    const { studentId } = req.params;

    Bookmark.getFavorites(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Get favorites error:",
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
                favorites: result.rows
            });

        }
    );

};


// =====================================
// ADD WRONG QUESTION
// =====================================

exports.addWrongQuestion = (req, res) => {

    const {
        student_id,
        mcq_id
    } = req.body;


    if (!student_id || !mcq_id) {

        return res.status(400).json({
            success: false,
            message: "student_id and mcq_id are required"
        });

    }


    Bookmark.addWrong(
        {
            student_id,
            mcq_id
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Add wrong question error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error",
                    error: err.message
                });

            }


            return res.status(201).json({
                success: true,
                message: "Wrong Question Saved",
                question: result.rows[0]
            });

        }
    );

};


// =====================================
// GET WRONG QUESTIONS
// =====================================

exports.getWrongQuestions = (req, res) => {

    const { studentId } = req.params;

    Bookmark.getWrong(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Get wrong questions error:",
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
                wrongQuestions: result.rows
            });

        }
    );

};


// =====================================
// REVISION
// =====================================

exports.getRevision = (req, res) => {

    const { studentId } = req.params;

    Bookmark.getRevision(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Revision error:",
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
                revision: result.rows
            });

        }
    );

};


// =====================================
// SMART PRACTICE
// =====================================

exports.smartPractice = (req, res) => {

    const { studentId } = req.params;

    Bookmark.smartPractice(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Smart practice error:",
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
                questions: result.rows
            });

        }
    );

};
