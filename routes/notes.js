const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notesController");

// Get All Notes
router.get("/", notesController.getAllNotes);

// Add Note
router.post("/add", notesController.addNote);

// Update Note
router.put("/update/:id", notesController.updateNote);

// Delete Note
router.delete("/delete/:id", notesController.deleteNote);

// Buy Note
router.post("/buy/:id", notesController.buyNote);

// Download Note
router.get("/download/:id", notesController.downloadNote);

// Purchase History
router.get("/purchases/:studentId", notesController.purchaseHistory);

// Note Categories
router.get("/categories", notesController.categories);

// Upload PDF
router.post("/upload-pdf", notesController.uploadPdf);

// Get Note By ID — MUST BE LAST
router.get("/:id", notesController.getNoteById);

module.exports = router;
