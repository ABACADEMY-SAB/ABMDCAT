// =====================================
// MCQ CONTROLLER - PostgreSQL
// =====================================

const Mcq = require("../models/mcq");

const XLSX = require("xlsx");


// =====================================
// Get All MCQs
// =====================================

exports.getAllMcqs = (req, res) => {

    Mcq.getAll((err, result) => {

        if (err) {

            console.error(
                "Get MCQs error:",
                err
            );

            return res.status(500).json({
                success: false,
                message: "Database error"
            });

        }

        return res.json({
            success: true,
            mcqs: result.rows
        });

    });

};


// =====================================
// Get MCQ By ID
// =====================================

exports.getMcqById = (req, res) => {

    const { id } = req.params;

    Mcq.getById(id, (err, result) => {

        if (err) {

            console.error(
                "Get MCQ error:",
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
                message: "MCQ not found"
            });

        }

        return res.json({
            success: true,
            mcq: result.rows[0]
        });

    });

};


// =====================================
// Add MCQ
// =====================================

exports.addMcq = (req, res) => {

    const {
        subject,
        chapter,
        topic,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        answer,
        explanation
    } = req.body;


    if (
        !subject ||
        !chapter ||
        !topic ||
        !question ||
        !optionA ||
        !optionB ||
        !optionC ||
        !optionD ||
        !answer
    ) {

        return res.status(400).json({
            success: false,
            message: "Required MCQ fields are missing"
        });

    }


    Mcq.create(
        {
            subject,
            chapter,
            topic,
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            answer,
            explanation
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Add MCQ error:",
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
                    "MCQ Added Successfully",

                mcq:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// Update MCQ
// =====================================

exports.updateMcq = (req, res) => {

    const { id } = req.params;

    const {
        subject,
        chapter,
        topic,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        answer,
        explanation
    } = req.body;


    if (
        !subject ||
        !chapter ||
        !topic ||
        !question ||
        !optionA ||
        !optionB ||
        !optionC ||
        !optionD ||
        !answer
    ) {

        return res.status(400).json({
            success: false,
            message: "Required MCQ fields are missing"
        });

    }


    Mcq.update(
        id,
        {
            subject,
            chapter,
            topic,
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            answer,
            explanation
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Update MCQ error:",
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
                    message: "MCQ not found"
                });

            }


            return res.json({

                success: true,

                message:
                    "MCQ Updated Successfully",

                mcq:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// Delete MCQ
// =====================================

exports.deleteMcq = (req, res) => {

    const { id } = req.params;

    Mcq.delete(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Delete MCQ error:",
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
                    message: "MCQ not found"
                });

            }


            return res.json({

                success: true,

                message:
                    "MCQ Deleted Successfully"

            });

        }
    );

};


// =====================================
// Search MCQs
// =====================================

exports.searchMcq = (req, res) => {

    const { keyword } = req.params;

    Mcq.search(
        keyword,
        (err, result) => {

            if (err) {

                console.error(
                    "Search MCQ error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }


            return res.json({

                success: true,

                keyword,

                results:
                    result.rows

            });

        }
    );

};


// =====================================
// Subject Filter
// =====================================

exports.subjectFilter = (req, res) => {

    const { subject } = req.params;

    Mcq.subject(
        subject,
        (err, result) => {

            if (err) {

                console.error(
                    "Subject filter error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }


            return res.json({

                success: true,

                subject,

                mcqs:
                    result.rows

            });

        }
    );

};


// =====================================
// Chapter Filter
// =====================================

exports.chapterFilter = (req, res) => {

    const { chapter } = req.params;

    Mcq.chapter(
        chapter,
        (err, result) => {

            if (err) {

                console.error(
                    "Chapter filter error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }


            return res.json({

                success: true,

                chapter,

                mcqs:
                    result.rows

            });

        }
    );

};


// =====================================
// Topic Filter
// =====================================

exports.topicFilter = (req, res) => {

    const { topic } = req.params;

    Mcq.topic(
        topic,
        (err, result) => {

            if (err) {

                console.error(
                    "Topic filter error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }


            return res.json({

                success: true,

                topic,

                mcqs:
                    result.rows

            });

        }
    );

};


// =====================================
// Random Practice MCQs
// =====================================

exports.randomPractice = (req, res) => {

    const limit =
        Number(req.query.limit) || 10;


    if (limit < 1 || limit > 180) {

        return res.status(400).json({
            success: false,
            message:
                "Limit must be between 1 and 180"
        });

    }


    Mcq.random(
        limit,
        (err, result) => {

            if (err) {

                console.error(
                    "Random MCQ error:",
                    err
                );

                return res.status(500).json({
                    success: false,
                    message: "Database error"
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
// EXCEL / CSV IMPORT
// =====================================

exports.importExcel = async (req, res) => {

    try {

        // Check if file was uploaded
        if (!req.file) {

            return res.status(400).json({

                success: false,

                message:
                    "Please upload an Excel or CSV file"

            });

        }


        // Read uploaded file
        const workbook =
            XLSX.read(
                req.file.buffer,
                {
                    type: "buffer"
                }
            );


        // Get first sheet
        const sheetName =
            workbook.SheetNames[0];

        const worksheet =
            workbook.Sheets[sheetName];


        // Convert sheet to JSON
        const rows =
            XLSX.utils.sheet_to_json(
                worksheet,
                {
                    defval: ""
                }
            );


        if (!rows.length) {

            return res.status(400).json({

                success: false,

                message:
                    "The uploaded file is empty"

            });

        }


        let imported = 0;

        let failed = 0;

        const errors = [];


        // Process every MCQ
        for (
            let i = 0;
            i < rows.length;
            i++
        ) {

            const row = rows[i];


            // Accept both lowercase
            // and normal Excel column names

            const subject =
                String(
                    row.subject ||
                    row.Subject ||
                    ""
                ).trim();


            const chapter =
                String(
                    row.chapter ||
                    row.Chapter ||
                    ""
                ).trim();


            const topic =
                String(
                    row.topic ||
                    row.Topic ||
                    ""
                ).trim();


            const question =
                String(
                    row.question ||
                    row.Question ||
                    ""
                ).trim();


            const optionA =
                String(
                    row.optionA ||
                    row.OptionA ||
                    row["Option A"] ||
                    row.optiona ||
                    ""
                ).trim();


            const optionB =
                String(
                    row.optionB ||
                    row.OptionB ||
                    row["Option B"] ||
                    row.optionb ||
                    ""
                ).trim();


            const optionC =
                String(
                    row.optionC ||
                    row.OptionC ||
                    row["Option C"] ||
                    row.optionc ||
                    ""
                ).trim();


            const optionD =
                String(
                    row.optionD ||
                    row.OptionD ||
                    row["Option D"] ||
                    row.optiond ||
                    ""
                ).trim();


            const answer =
                String(
                    row.answer ||
                    row.Answer ||
                    ""
                ).trim().toUpperCase();


            const explanation =
                String(
                    row.explanation ||
                    row.Explanation ||
                    ""
                ).trim();


            // Validate required fields
            if (
                !subject ||
                !chapter ||
                !topic ||
                !question ||
                !optionA ||
                !optionB ||
                !optionC ||
                !optionD ||
                !answer
            ) {

                failed++;

                errors.push({

                    row:
                        i + 2,

                    message:
                        "Required field is missing"

                });

                continue;

            }


            // Validate answer
            if (
                !["A", "B", "C", "D"]
                .includes(answer)
            ) {

                failed++;

                errors.push({

                    row:
                        i + 2,

                    message:
                        "Answer must be A, B, C or D"

                });

                continue;

            }


            try {

                await new Promise(
                    (resolve, reject) => {

                        Mcq.create(

                            {
                                subject,
                                chapter,
                                topic,
                                question,
                                optionA,
                                optionB,
                                optionC,
                                optionD,
                                answer,
                                explanation
                            },

                            (err) => {

                                if (err) {

                                    reject(err);

                                } else {

                                    resolve();

                                }

                            }

                        );

                    }
                );


                imported++;


            } catch (error) {

                failed++;

                errors.push({

                    row:
                        i + 2,

                    message:
                        error.message

                });

            }

        }


        return res.json({

            success: true,

            message:
                "MCQ import completed",

            totalRows:
                rows.length,

            imported,

            failed,

            errors

        });


    } catch (error) {

        console.error(
            "MCQ Excel import error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to import MCQs",

            error:
                error.message

        });

    }

};
