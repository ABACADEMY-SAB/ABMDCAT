const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()
    .then(() => {
        console.log("PostgreSQL connected successfully.");
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });

module.exports = pool;