const express = require("express");
const router = express.Router();

const bookmarkController = require("../controllers/bookmarkController");

// Add Bookmark — MUST come before /:studentId
router.post("/add", bookmarkController.addBookmark);

// Add Wrong Question
router.post("/wrong/add", bookmarkController.addWrongQuestion);

// Get Wrong Questions
router.get("/wrong/:studentId", bookmarkController.getWrongQuestions);

// Revision List
router.get("/revision/:studentId", bookmarkController.getRevision);

// Smart Practice
