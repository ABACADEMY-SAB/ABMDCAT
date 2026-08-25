// =====================================
// UPLOAD CONTROLLER
// =====================================

const Upload =
    require("../models/upload");


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
                uploads: result.rows
            });

        }
    );

};


// =====================================
// GET UPLOAD BY ID
// =====================================

exports.getUploadById = (req, res) => {

    const { id } = req.params;

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
                    message: "Database error",
                    error: err.message
                });

            }

            if (result.rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Upload not found"
                });

            }

            return res.json({
                success: true,
                upload: result.rows[0]
            });

        }
    );

};


// =====================================
// GET UPLOADS BY USER
// =====================================

exports.getUploadsByUser = (req, res) => {

    const { userId } = req.params;

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
                    message: "Database error",
                    error: err.message
                });

            }

            return res.json({
                success: true,
                userId,
                uploads: result.rows
            });

        }
    );

};


// =====================================
// SAVE UPLOAD
// =====================================

exports.saveUpload = (req, res) => {

    const {
        filename,
        original_name,
        file_path,
        file_type,
        file_size,
        uploaded_by
    } = req.body;


    if (
        !filename ||
        !original_name ||
        !file_path
    ) {

        return res.status(400).json({
            success: false,
            message:
                "filename, original_name and file_path are required"
        });

    }


    Upload.create(
        {
            filename,
            original_name,
            file_path,
            file_type:
                file_type || null,
            file_size:
                file_size || 0,
            uploaded_by:
                uploaded_by || null
        },
        (err, result) => {

            if (err) {

                console.error(
                    "Save upload error:",
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

                message:
                    "Upload Saved Successfully",

                upload:
                    result.rows[0]

            });

        }
    );

};


// =====================================
// DELETE UPLOAD
// =====================================

exports.deleteUpload = (req, res) => {

    const { id } = req.params;

    Upload.delete(
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "Delete upload error:",
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
                    message: "Upload not found"
                });

            }

            return res.json({

                success: true,

                message:
                    "Upload Deleted Successfully"

            });

        }
    );

};


// =====================================
// COUNT UPLOADS
// =====================================

exports.countUploads = (req, res) => {

    Upload.count(
        (err, result) => {

            if (err) {

                console.error(
                    "Count uploads error:",
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

                total:
                    Number(
                        result.rows[0].total
                    )

            });

        }
    );

};
