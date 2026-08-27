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

                message: "Please upload an Excel or CSV file"

            });

        }


        // Read Excel file from memory
        const workbook =
            XLSX.read(
                req.file.buffer,
                {
                    type: "buffer"
                }
            );


        // Get first worksheet
        const sheetName =
            workbook.SheetNames[0];

        const worksheet =
            workbook.Sheets[sheetName];


        // Convert worksheet to JSON
        const rows =
            XLSX.utils.sheet_to_json(
                worksheet,
                {
                    defval: ""
                }
            );


        if (rows.length === 0) {

            return res.status(400).json({

                success: false,

                message: "Excel file is empty"

            });

        }


        let imported = 0;
        let skipped = 0;


        // Process every row
        for (const row of rows) {

            const subject =
                row.Subject || "";

            const chapter =
                row.Chapter || "";

            const topic =
                row.Topic || "";

            const question =
                row.Question || "";

            const optionA =
                row["Option A"] || "";

            const optionB =
                row["Option B"] || "";

            const optionC =
                row["Option C"] || "";

            const optionD =
                row["Option D"] || "";

            const answer =
                row.Answer || "";

            const explanation =
                row.Explanation || "";


            // Skip incomplete rows
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

                skipped++;

                continue;

            }


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

        }


        return res.json({

            success: true,

            message:
                "MCQs imported successfully",

            imported,

            skipped,

            totalRows:
                rows.length

        });


    } catch (error) {

        console.error(
            "Excel import error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Excel import failed",

            error:
                error.message

        });

    }

};


        
