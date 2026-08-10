const express = require("express");

const router = express.Router();

// Get All Notes
router.get("/", (req, res) => {

    res.json({
        success: true,
        notes: []
    });

});

// Get Note By ID
router.get("/:id", (req, res) => {

    res.json({
        success: true,
        noteId: req.params.id
    });

});

// Add Note
router.post("/add", (req, res) => {

    res.json({
        success: true,
        message: "Note Added Successfully"
    });

});

// Update Note
router.put("/update/:id", (req, res) => {

    res.json({
        success: true,
        message: "Note Updated Successfully"
    });

});

// Delete Note
router.delete("/delete/:id", (req, res) => {

    res.json({
        success: true,
        message: "Note Deleted Successfully"
    });

});

// Buy Note
router.post("/buy/:id", (req, res) => {

    res.json({
        success: true,
        noteId: req.params.id,
        message: "Purchase Successful"
    });

});

// Download Note
router.get("/download/:id", (req, res) => {

    res.json({
        success: true,
        noteId: req.params.id,
        download: true
    });

});

// Purchase History
router.get("/purchases/:studentId", (req, res) => {

    res.json({
        success: true,
        studentId: req.params.studentId,
        purchases: []
    });

});

module.exports = router;
