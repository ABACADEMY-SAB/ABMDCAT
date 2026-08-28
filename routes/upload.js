const express = require("express");

const router =
    express.Router();

const uploadController =
    require("../controllers/uploadController");


// =====================================
// GET ALL UPLOADS
// =====================================

router.get(
    "/",
    uploadController.getAllUploads
);


// =====================================
// GET UPLOADS BY USER
// =====================================

router.get(
    "/user/:userId",
    uploadController.getUploadsByUser
);


// =====================================
// COUNT UPLOADS
// =====================================

router.get(
    "/count",
    uploadController.countUploads
);


// =====================================
// PHYSICAL FILE UPLOAD
// =====================================

router.post(
    "/add",

    uploadController.uploadMiddleware,

    uploadController.saveUpload
);


// =====================================
// DELETE UPLOAD
// =====================================

router.delete(
    "/delete/:id",
    uploadController.deleteUpload
);


// =====================================
// GET UPLOAD BY ID
// =====================================

router.get(
    "/:id",
    uploadController.getUploadById
);


module.exports = router;
