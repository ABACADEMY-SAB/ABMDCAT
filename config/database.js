const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on("error", (err) => {
    console.error("Unexpected PostgreSQL error:", err);
});

pool.connect()
    .then((client) => {
        console.log("PostgreSQL connected successfully.");
        client.release();
    })
    .catch((err) => {
        console.error("Database connection failed:", err.message);
    });

module.exports = pool;
