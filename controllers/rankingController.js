// =====================================
// RANKING CONTROLLER
// =====================================

// Overall Ranking
exports.overall = (req, res) => {
    res.json({
        success: true,
        ranking: []
    });
};

// Daily Ranking
exports.daily = (req, res) => {
    res.json({
        success: true,
        ranking: []
    });
};

// Weekly Ranking
exports.weekly = (req, res) => {
    res.json({
        success: true,
        ranking: []
    });
};

// Monthly Ranking
exports.monthly = (req, res) => {
    res.json({
        success: true,
        ranking: []
    });
};

// Subject Ranking
exports.subject = (req, res) => {
    res.json({
        success: true,
        subject: req.params.subject,
        ranking: []
    });
};

// Chapter Ranking
exports.chapter = (req, res) => {
    res.json({
        success: true,
        chapter: req.params.chapter,
        ranking: []
    });
};

// Top 10 Students
exports.top10 = (req, res) => {
    res.json({
        success: true,
        students: []
    });
};

// Student Rank
exports.student = (req, res) => {
    res.json({
        success: true,
        studentId: req.params.studentId,
        rank: null
    });
};

// Merit List
exports.meritList = (req, res) => {
    res.json({
        success: true,
        meritList: []
    });
};
