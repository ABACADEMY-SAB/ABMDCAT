const express = require("express");
const router = express.Router();

const mcqController = require("../controllers/mcqController");

// Get All MCQs
router.get("/", mcqController.getAllMcqs);

// Get MCQ By ID
router.get("/:id", mcqController.getMcqById);

// Add MCQ
router.post("/add", mcqController.addMcq);

// Update MCQ
router.put("/update/:id", mcqController.updateMcq);

// Delete MCQ
router.delete("/delete/:id", mcqController.deleteMcq);

// Search MCQs
router.get("/search/:keyword", mcqController.searchMcq);

// Filter by Subject
router.get("/subject/:subject", mcqController.subjectFilter);

// Filter by Chapter
router.get("/chapter/:chapter", mcqController.chapterFilter);

// Filter by Topic
router.get("/topic/:topic", mcqController.topicFilter);

// Random Practice MCQs
router.get("/practice/random/:count", mcqController.randomPractice);

// Excel Import
router.post("/import-excel", mcqController.importExcel);

module.exports = router;
