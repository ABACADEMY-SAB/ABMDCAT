// =====================================
// MCQ MODEL - PostgreSQL
// =====================================

const db = require("../config/database");

class Mcq {

    // =====================================
    // GET ALL MCQs
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
    // GET MCQ BY ID
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
    // ADD MCQ
    // =====================================

    static create(data, callback) {

        db.query(
            `INSERT INTO mcqs
            (
                subject,
                chapter,
                topic,
                question,
                optiona,
                optionb,
                optionc,
                optiond,
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
    // UPDATE MCQ
    // =====================================

    static update(id, data, callback) {

        db.query(
            `UPDATE mcqs
             SET
                subject = $1,
                chapter = $2,
                topic = $3,
                question = $4,
                optiona = $5,
                optionb = $6,
                optionc = $7,
                optiond = $8,
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
    // DELETE MCQ
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
    // SEARCH MCQs
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
    // SUBJECT FILTER
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
    // CHAPTER FILTER
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
    // TOPIC FILTER
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
    // RANDOM MCQs
    // =====================================

    static random(limit, callback) {

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
    // COUNT MCQs
    // =====================================

    static count(callback) {

        db.query(
            `SELECT COUNT(*) AS total
             FROM mcqs`,
            callback
        );

    }



// =====================================
// STUDENT PRACTICE MCQs
// =====================================

static practice(data, callback) {

    let query = `
        SELECT *
        FROM mcqs
    `;


    const values = [];
    const conditions = [];


    // =====================================
    // SUBJECT FILTER
    // Supports multiple subjects
    // =====================================

    if (
        data.subjects &&
        data.subjects.length > 0
    ) {

        values.push(data.subjects);

        conditions.push(
            `subject = ANY($${values.length})`
        );

    }


    // =====================================
    // CHAPTER FILTER
    // Supports multiple chapters
    // =====================================

    if (
        data.chapters &&
        data.chapters.length > 0
    ) {

        values.push(data.chapters);

        conditions.push(
            `chapter = ANY($${values.length})`
        );

    }


    // =====================================
    // TOPIC FILTER
    // Supports multiple topics
    // =====================================

    if (
        data.topics &&
        data.topics.length > 0
    ) {

        values.push(data.topics);

        conditions.push(
            `topic = ANY($${values.length})`
        );

    }


    // =====================================
    // WHERE
    // =====================================

    if (conditions.length > 0) {

        query +=
            ` WHERE ` +
            conditions.join(" AND ");

    }


    // =====================================
    // RANDOM QUESTIONS
    // =====================================

    query += `
        ORDER BY RANDOM()
        LIMIT $${values.length + 1}
    `;


    values.push(
        Number(data.limit)
    );


    db.query(
        query,
        values,
        callback
    );

}

module.exports = Mcq;
