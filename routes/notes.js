const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notesController");

// Get All Notes
router.get("/", notesController.getAllNotes);

// Get Note By ID
router.get("/:id", notesController.getNoteById);

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

module.exports = router;
