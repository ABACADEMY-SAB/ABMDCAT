const db = require("../config/database");

class Test {

    // Get All Tests
    static getAll(callback) {
        db.query(
            `SELECT *
             FROM tests
             ORDER BY id DESC`,
            callback
        );
    }


    // Get Test By ID
    static getById(id, callback) {
        db.query(
            `SELECT *
             FROM tests
             WHERE id = $1`,
            [id],
            callback
        );
    }


// Create Test
static create(data, callback) {

    db.query(

        `INSERT INTO tests
        (
            title,
            description,
            subject,
            chapter,
            topic,
            total_questions,
            duration_minutes,
            start_time,
            end_time,
            status
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10
        )
        RETURNING *`,

        [
            data.title,
            data.description || null,
            data.subject,
            data.chapter || null,
            data.topic || null,
            Number(data.total_questions),
            Number(data.duration_minutes),
            data.start_time || null,
            data.end_time || null,
            data.status || "draft"
        ],

        callback

    );

}

    
    // Update Test
    static update(id, data, callback) {
        db.query(
            `UPDATE tests
             SET
                title = $1,
                description = $2,
                subject = $3,
                chapter = $4,
                topic = $5,
                total_questions = $6,
                duration_minutes = $7,
                start_time = $8,
                end_time = $9,
                status = $10
             WHERE id = $11
             RETURNING *`,
            [
                data.title,
                data.description,
                data.subject,
                data.chapter,
                data.topic,
                data.total_questions,
                data.duration_minutes,
                data.start_time,
                data.end_time,
                data.status,
                id
            ],
            callback
        );
    }


    // Delete Test
    static delete(id, callback) {
        db.query(
            `DELETE FROM tests
             WHERE id = $1`,
            [id],
            callback
        );
    }


    // Count Tests
    static count(callback) {
        db.query(
            `SELECT COUNT(*) AS total
             FROM tests`,
            callback
        );
    }

}

module.exports = Test;
