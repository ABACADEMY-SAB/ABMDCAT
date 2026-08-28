// =====================================
// UPLOAD CONTROLLER
// =====================================

const fs = require("fs");
const path = require("path");
const multer = require("multer");

const Upload =
    require("../models/upload");


// =====================================
// UPLOAD DIRECTORY
// =====================================

const uploadDirectory =
    path.join(__dirname, "..", "uploads");


if (!fs.existsSync(uploadDirectory)) {

    fs.mkdirSync(
        uploadDirectory,
        {
            recursive: true
        }
    );

}


// =====================================
// MULTER STORAGE
// =====================================

const storage =
    multer.diskStorage({

        destination: function (
            req,
            file,
            cb
        ) {

            cb(
                null,
                uploadDirectory
            );

        },


        filename: function (
            req,
            file,
            cb
        ) {

            const extension =
                path.extname(
                    file.originalname
                );

            const baseName =
                path.basename(
                    file.originalname,
                    extension
                )
                .replace(
                    /[^a-zA-Z0-9_-]/g,
                    "_"
                );


            const uniqueName =
                baseName +
                "-" +
                Date.now() +
                extension;


            cb(
                null,
                uniqueName
            );

        }

    });


// =====================================
// MULTER UPLOAD
// =====================================

const upload =
    multer({

        storage: storage,

        limits: {

            fileSize:
                20 * 1024 * 1024

        }

    });


// Export middleware
exports.uploadMiddleware =
    upload.single("file");


// =====================================
// GET ALL UPLOADS
// =====================================

exports.getAllUploads = (req, res) => {

    Upload.getAll(
        (err, result) => {

            if (err) {

                console.error(
                    "Get uploads error:",
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

                uploads:
                    result.rows

            });

        }
    );

};


// =====================================
// GET UPLOAD BY ID
// =====================================

exports.getUploadById = (req, res) => {

    const { id } =
        req.params;


    Upload.getById(
        id,

        (err, result) => {

            if (err) {

                console.error(
                    "Get upload error:",
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


            if (
                result.rows.length === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Upload not found"

                });

            }


            return res.json({

                success: true,

                upload:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// GET UPLOADS BY USER
// =====================================

exports.getUploadsByUser = (
    req,
    res
) => {

    const { userId } =
        req.params;


    Upload.getByUser(
        userId,

        (err, result) => {

            if (err) {

                console.error(
                    "Get user uploads error:",
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

                userId,

                uploads:
                    result.rows

            });

        }
    );

};


// =====================================
// SAVE PHYSICAL UPLOAD
// =====================================

exports.saveUpload = (
    req,
    res
) => {

    try {

        /*
         * Multer places the physical
         * uploaded file in req.file.
         */

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message:
                    "Please select a file"

            });

        }


        const file =
            req.file;


        /*
         * Database values
         */

        const filename =
            file.filename;


        const original_name =
            file.originalname;


        const file_path =
            "/uploads/" +
            file.filename;


        const file_type =
            file.mimetype || null;


        const file_size =
            file.size || 0;


        /*
         * Admin can optionally send
         * uploaded_by.
         */

        const uploaded_by =
            req.body.uploaded_by ||
            null;


        Upload.create(
            {

                filename,

                original_name,

                file_path,

                file_type,

                file_size,

                uploaded_by

            },

            (err, result) => {

                if (err) {

                    console.error(
                        "Save upload error:",
                        err
                    );


                    /*
                     * Database failed,
                     * therefore remove the
                     * physical file as well.
                     */

                    try {

                        fs.unlinkSync(
                            file.path
                        );

                    } catch (
                        deleteError
                    ) {

                        console.error(
                            "Failed to remove uploaded file:",
                            deleteError
                        );

                    }


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
                        "File uploaded and saved successfully",

                    upload:
                        result.rows[0]

                });

            }
        );


    } catch (error) {

        console.error(
            "Upload error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "File upload failed",

            error:
                error.message

        });

    }

};


// =====================================
// DELETE UPLOAD
// =====================================

exports.deleteUpload = (
    req,
    res
) => {

    const { id } =
        req.params;


    /*
     * First get the database record
     * so we know which physical file
     * must be deleted.
     */

    Upload.getById(
        id,

        (err, result) => {

            if (err) {

                console.error(
                    "Get upload before delete error:",
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


            if (
                result.rows.length === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Upload not found"

                });

            }


            const uploadRecord =
                result.rows[0];


            /*
             * Delete database record
             */

            Upload.delete(
                id,

                (deleteErr, deleteResult) => {

                    if (deleteErr) {

                        console.error(
                            "Delete upload error:",
                            deleteErr
                        );

                        return res.status(500).json({

                            success: false,

                            message:
                                "Database error",

                            error:
                                deleteErr.message

                        });

                    }


                    /*
                     * Delete physical file
                     */

                    if (
                        uploadRecord.filename
                    ) {

                        const physicalFile =
                            path.join(
                                uploadDirectory,
                                uploadRecord.filename
                            );


                        fs.unlink(
                            physicalFile,

                            (fileError) => {

                                if (
                                    fileError &&
                                    fileError.code !==
                                    "ENOENT"
                                ) {

                                    console.error(
                                        "Physical file delete error:",
                                        fileError
                                    );

                                }

                            }
                        );

                    }


                    return res.json({

                        success: true,

                        message:
                            "Upload deleted successfully"

                    });

                }
            );

        }
    );

};


// =====================================
// COUNT UPLOADS
// =====================================

exports.countUploads = (
    req,
    res
) => {

    Upload.count(
        (err, result) => {

            if (err) {

                console.error(
                    "Count uploads error:",
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
