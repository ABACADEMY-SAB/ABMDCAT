// =====================================
// STUDENT CONTROLLER
// =====================================

// Student Registration
exports.register = (req, res) => {

    res.json({

        success: true,

        message: "Student Registered Successfully"

    });

};

// Student Login
exports.login = (req, res) => {

    res.json({

        success: true,

        message: "Student Login Successful"

    });

};

// Student Dashboard
exports.dashboard = (req, res) => {

    res.json({

        success: true,

        message: "Welcome to ABMDCAT Student Dashboard"

    });

};

// Student Profile
exports.profile = (req, res) => {

    res.json({

        success: true,

        student: {

            id: 1,

            username: "student",

            fullname: "Student Name",

            email: "student@example.com",

            phone: "03000000000"

        }

    });

};

// Update Profile
exports.updateProfile = (req, res) => {

    res.json({

        success: true,

        message: "Profile Updated Successfully"

    });

};

// Change Password
exports.changePassword = (req, res) => {

    res.json({

        success: true,

        message: "Password Changed Successfully"

    });

};

// Student Statistics
exports.statistics = (req, res) => {

    res.json({

        testsAttempted: 0,

        averageScore: 0,

        bookmarks: 0,

        wrongQuestions: 0

    });

};

// Delete Student Account
exports.deleteAccount = (req, res) => {

    res.json({

        success: true,

        message: "Student Account Deleted Successfully"

    });

};

// Logout
exports.logout = (req, res) => {

    res.json({

        success: true,

        message: "Student Logged Out Successfully"

    });

};