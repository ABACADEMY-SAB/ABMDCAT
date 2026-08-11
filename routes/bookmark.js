const express = require("express");
const router = express.Router();

const bookmarkController = require("../controllers/bookmarkController");

// Get All Bookmarks
router.get("/:studentId", bookmarkController.getBookmarks);

// Add Bookmark
router.post("/add", bookmarkController.addBookmark);

// Remove Bookmark
router.delete("/remove/:id", bookmarkController.removeBookmark);

// Get Favorite MCQs
router.get("/favorites/:studentId", bookmarkController.getFavorites);

// Add Wrong Question
router.post("/wrong/add", bookmarkController.addWrongQuestion);

// Get Wrong Questions
router.get("/wrong/:studentId", bookmarkController.getWrongQuestions);

// Revision List
router.get("/revision/:studentId", bookmarkController.getRevision);

// Smart Practice
router.get("/smart-practice/:studentId", bookmarkController.smartPractice);

module.exports = router;
