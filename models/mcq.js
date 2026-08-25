// =====================================
// MCQ MODEL - PostgreSQL
// =====================================

const db = require("../config/database");

class Mcq {

    // =====================================
    // Get All MCQs
    // =====================================

    static getAll(callback) {

        db.query(
            `SELECT *
             FROM mcqs
             ORDER BY id DESC`,
            callback
        );

    }


    // =====================================
    // Get MCQ By ID
    // =====================================

    static getById(id, callback) {

        db.query(
            `SELECT *
             FROM mcqs
             WHERE id = $1`,
            [id],
            callback
        );

    }


    // =====================================
    // Add MCQ
    // =====================================

    static create(data, callback) {

        db.query(
            `INSERT INTO mcqs
            (
                subject,
                chapter,
                topic,
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                answer,
                explanation
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING *`,
            [
                data.subject,
                data.chapter,
                data.topic,
                data.question,
                data.optionA,
                data.optionB,
                data.optionC,
                data.optionD,
                data.answer,
                data.explanation
            ],
            callback
        );

    }


    // =====================================
    // Update MCQ
    // =====================================

    static update(id, data, callback) {

        db.query(
            `UPDATE mcqs
             SET
                subject = $1,
                chapter = $2,
                topic = $3,
                question = $4,
                optionA = $5,
                optionB = $6,
                optionC = $7,
                optionD = $8,
                answer = $9,
                explanation = $10
             WHERE id = $11
             RETURNING *`,
            [
                data.subject,
                data.chapter,
                data.topic,
                data.question,
                data.optionA,
                data.optionB,
                data.optionC,
                data.optionD,
                data.answer,
                data.explanation,
                id
            ],
            callback
        );

    }


    // =====================================
    // Delete MCQ
    // =====================================

    static delete(id, callback) {

        db.query(
            `DELETE FROM mcqs
             WHERE id = $1`,
            [id],
            callback
        );

    }


    // =====================================
    // Search MCQs
    // =====================================

    static search(keyword, callback) {

        db.query(
            `SELECT *
             FROM mcqs
             WHERE question ILIKE $1
             ORDER BY id DESC`,
            [`%${keyword}%`],
            callback
        );

    }


    // =====================================
    // Subject Filter
    // =====================================

    static subject(subject, callback) {

        db.query(
            `SELECT *
             FROM mcqs
             WHERE subject = $1
             ORDER BY id DESC`,
            [subject],
            callback
        );

    }


    // =====================================
    // Chapter Filter
    // =====================================

    static chapter(chapter, callback) {

        db.query(
            `SELECT *
             FROM mcqs
             WHERE chapter = $1
             ORDER BY id DESC`,
            [chapter],
            callback
        );

    }


    // =====================================
    // Topic Filter
    // =====================================

    static topic(topic, callback) {

        db.query(
            `SELECT *
             FROM mcqs
             WHERE topic = $1
             ORDER BY id DESC`,
            [topic],
            callback
        );

    }


    // =====================================
    // Random MCQs
    // =====================================

    static.random(limit, callback) {

        db.query(
            `SELECT *
             FROM mcqs
             ORDER BY RANDOM()
             LIMIT $1`,
            [Number(limit)],
            callback
        );

    }


    // =====================================
    // Count MCQs
    // =====================================

    static.count(callback) {

        db.query(
            `SELECT COUNT(*) AS total
             FROM mcqs`,
            callback
        );

    }

}

module.exports = Mcq;
