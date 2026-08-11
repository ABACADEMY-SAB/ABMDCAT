// =====================================
// BOOKMARK CONTROLLER
// =====================================

// Get All Bookmarks
exports.getBookmarks = (req, res) => {
    res.json({
        success: true,
        studentId: req.params.studentId,
        bookmarks: []
    });
};

// Add Bookmark
exports.addBookmark = (req, res) => {
    res.json({
        success: true,
        message: "MCQ Bookmarked Successfully"
    });
};

// Remove Bookmark
exports.removeBookmark = (req, res) => {
    res.json({
        success: true,
        message: "Bookmark Removed Successfully"
    });
};

// Get Favorite MCQs
exports.getFavorites = (req, res) => {
    res.json({
        success: true,
        studentId: req.params.studentId,
        favorites: []
    });
};

// Add Wrong Question
exports.addWrongQuestion = (req, res) => {
    res.json({
        success: true,
        message: "Wrong Question Saved"
    });
};

// Get Wrong Questions
exports.getWrongQuestions = (req, res) => {
    res.json({
        success: true,
        studentId: req.params.studentId,
        wrongQuestions: []
    });
};

// Revision List
exports.getRevision = (req, res) => {
    res.json({
        success: true,
        studentId: req.params.studentId,
        revision: []
    });
};

// Smart Practice
exports.smartPractice = (req, res) => {
    res.json({
        success: true,
        studentId: req.params.studentId,
        questions: []
    });
};
