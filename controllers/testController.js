// =====================================
// TEST CONTROLLER
// =====================================

// Get All Tests
exports.getAllTests = (req, res) => {

    res.json({

        success: true,

        tests: []

    });

};

// Get Test By ID
exports.getTestById = (req, res) => {

    res.json({

        success: true,

        testId: req.params.id

    });

};

// Create Test
exports.createTest = (req, res) => {

    res.json({

        success: true,

        message: "Online Test Created Successfully"

    });

};

// Update Test
exports.updateTest = (req, res) => {

    res.json({

        success: true,

        message: "Test Updated Successfully"

    });

};

// Delete Test
exports.deleteTest = (req, res) => {

    res.json({

        success: true,

        message: "Test Deleted Successfully"

    });

};

// Start Test
exports.startTest = (req, res) => {

    res.json({

        success: true,

        status: "Test Started"

    });

};

// Submit Test
exports.submitTest = (req, res) => {

    res.json({

        success: true,

        score: 0,

        percentage: 0,

        message: "Test Submitted Successfully"

    });

};

// Auto Submit Test
exports.autoSubmit = (req, res) => {

    res.json({

        success: true,

        message: "Time Expired. Test Auto Submitted"

    });

};

// Test History
exports.testHistory = (req, res) => {

    res.json({

        success: true,

        history: []

    });

};

// Leaderboard
exports.leaderboard = (req, res) => {

    res.json({

        success: true,

        leaderboard: []

    });

};

// Schedule Test
exports.scheduleTest = (req, res) => {

    res.json({

        success: true,

        message: "Test Scheduled Successfully"

    });

};
