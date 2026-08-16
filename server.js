require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// Database connection
require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==============================
// Serve New Frontend
// ==============================

app.use(express.static(path.join(__dirname, "public")));

// ==============================
// Home Route
// ==============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ==============================
// API Routes
// ==============================

app.use("/api/admin", require("./routes/admin"));
app.use("/api/student", require("./routes/student"));
app.use("/api/mcq", require("./routes/mcq"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/result", require("./routes/result"));
app.use("/api/test", require("./routes/test"));
app.use("/api/bookmark", require("./routes/bookmark"));
app.use("/api/notification", require("./routes/notification"));
app.use("/api/ranking", require("./routes/ranking"));
app.use("/api/upload", require("./routes/upload"));

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`ABMDCAT server running on port ${PORT}`);
});
