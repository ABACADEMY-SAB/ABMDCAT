// =====================================
// NOTES CONTROLLER
// =====================================

// Get All Notes
exports.getAllNotes = (req, res) => {

    res.json({

        success: true,

        notes: []

    });

};

// Get Note By ID
exports.getNoteById = (req, res) => {

    res.json({

        success: true,

        noteId: req.params.id

    });

};

// Add Note
exports.addNote = (req, res) => {

    res.json({

        success: true,

        message: "Note Added Successfully"

    });

};

// Update Note
exports.updateNote = (req, res) => {

    res.json({

        success: true,

        message: "Note Updated Successfully"

    });

};

// Delete Note
exports.deleteNote = (req, res) => {

    res.json({

        success: true,

        message: "Note Deleted Successfully"

    });

};

// Buy Note
exports.buyNote = (req, res) => {

    res.json({

        success: true,

        message: "Purchase Successful"

    });

};

// Download Note
exports.downloadNote = (req, res) => {

    res.json({

        success: true,

        download: true

    });

};

// Purchase History
exports.purchaseHistory = (req, res) => {

    res.json({

        success: true,

        purchases: []

    });

};

// Note Categories
exports.categories = (req, res) => {

    res.json({

        success: true,

        categories: []

    });

};

// Upload PDF
exports.uploadPdf = (req, res) => {

    res.json({

        success: true,

        message: "PDF Uploaded Successfully"

    });

};
