require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// Database connection
require("./config/database");

const app = express();


// ==============================
// Middleware
// ==============================

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// ==============================
// Serve Frontend
// ==============================

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// ==============================
// Home Route
// ==============================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );

});


// ==============================
// API Routes
// ==============================

// Admin
app.use(
    "/api/admin",
    require("./routes/admin")
);


// Admin Student Management
app.use(
    "/api/admin/students",
    require("./routes/adminStudent")
);


// Student
app.use(
    "/api/student",
    require("./routes/student")
);


// MCQ
app.use(
    "/api/mcq",
    require("./routes/mcq")
);


// Notes
app.use(
    "/api/notes",
    require("./routes/notes")
);


// Results
app.use(
    "/api/result",
    require("./routes/result")
);


// Tests
app.use(
    "/api/test",
    require("./routes/test")
);


// Bookmarks
app.use(
    "/api/bookmark",
    require("./routes/bookmark")
);


// Notifications
app.use(
    "/api/notification",
    require("./routes/notification")
);


// Ranking
app.use(
    "/api/ranking",
    require("./routes/ranking")
);


// Uploads
app.use(
    "/api/upload",
    require("./routes/upload")
);


// ==============================
// Start Server
// ==============================

const PORT =
    process.env.PORT || 3000;


app.listen(
    PORT,
    () => {

        console.log(
            `ABMDCAT server running on port ${PORT}`
        );

    }
);
