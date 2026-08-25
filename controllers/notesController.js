// =====================================
// NOTES CONTROLLER - PostgreSQL
// =====================================

const Notes = require("../models/notes");


// =====================================
// GET ALL NOTES
// =====================================

exports.getAllNotes = (req, res) => {

    Notes.getAll((err, result) => {

        if (err) {

            console.error(
                "Get notes error:",
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

            notes: result.rows

        });

    });

};


// =====================================
// GET NOTE BY ID
// =====================================

exports.getNoteById = (req, res) => {

    const { id } = req.params;

    Notes.getById(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Get note error:",
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
                    message: "Note not found"
                });

            }


            return res.json({

                success: true,

                note: result.rows[0]

            });

        }
    );

};


// =====================================
// ADD NOTE
// =====================================

exports.addNote = (req, res) => {

    const {
        subject,
        chapter,
        title,
        description,
        price,
        pdf_link
    } = req.body;


    if (
        !subject ||
        !chapter ||
        !title
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Subject, chapter and title are required"

        });

    }


    Notes.create(
        {
            subject,
            chapter,
            title,
            description,
            price,
            pdf_link
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Add note error:",
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
                    "Note Added Successfully",

                note:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// UPDATE NOTE
// =====================================

exports.updateNote = (req, res) => {

    const { id } = req.params;

    const {
        subject,
        chapter,
        title,
        description,
        price,
        pdf_link
    } = req.body;


    if (
        !subject ||
        !chapter ||
        !title
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Subject, chapter and title are required"

        });

    }


    Notes.update(
        id,
        {
            subject,
            chapter,
            title,
            description,
            price,
            pdf_link
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Update note error:",
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
                        "Note not found"

                });

            }


            return res.json({

                success: true,

                message:
                    "Note Updated Successfully",

                note:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// DELETE NOTE
// =====================================

exports.deleteNote = (req, res) => {

    const { id } = req.params;


    Notes.delete(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Delete note error:",
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
                        "Note not found"

                });

            }


            return res.json({

                success: true,

                message:
                    "Note Deleted Successfully"

            });

        }
    );

};


// =====================================
// BUY NOTE
// =====================================

exports.buyNote = (req, res) => {

    const { id } = req.params;

    const {
        student_id,
        payment_method
    } = req.body;


    if (!student_id) {

        return res.status(400).json({

            success: false,

            message:
                "Student ID is required"

        });

    }


    Notes.buy(
        student_id,
        id,
        payment_method || "manual",
        (err, result) => {

            if (err) {

                console.error(
                    "Buy note error:",
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
                    "Purchase Successful",

                purchase:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// PURCHASE HISTORY
// =====================================

exports.purchaseHistory = (req, res) => {

    const { studentId } = req.params;


    Notes.purchases(
        studentId,
        (err, result) => {

            if (err) {

                console.error(
                    "Purchase history error:",
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

                purchases:
                    result.rows

            });

        }
    );

};


// =====================================
// NOTE CATEGORIES
// =====================================

exports.categories = (req, res) => {

    const query = `

        SELECT DISTINCT subject

        FROM notes

        WHERE subject IS NOT NULL

        ORDER BY subject ASC

    `;


    require("../config/database").query(
        query,
        (err, result) => {

            if (err) {

                console.error(
                    "Categories error:",
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

                categories:
                    result.rows.map(
                        row => row.subject
                    )

            });

        }
    );

};


// =====================================
// DOWNLOAD NOTE
// =====================================

exports.downloadNote = (req, res) => {

    const { id } = req.params;


    Notes.getById(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Download note error:",
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
                        "Note not found"

                });

            }


            const note =
                result.rows[0];


            if (!note.pdf_link) {

                return res.status(404).json({

                    success: false,

                    message:
                        "PDF not available"

                });

            }


            return res.json({

                success: true,

                download:
                    note.pdf_link

            });

        }
    );

};


// =====================================
// UPLOAD PDF
// =====================================

exports.uploadPdf = (req, res) => {

    return res.status(501).json({

        success: false,

        message:
            "PDF upload will be connected after the file upload system is completed"

    });

};
