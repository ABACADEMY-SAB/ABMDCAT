// =====================================
// MCQ MODEL
// =====================================

const db = require("../config/database");

class Mcq {

    // Get All MCQs
    static getAll(callback) {

        db.query(

            "SELECT * FROM mcqs ORDER BY id DESC",

            callback

        );

    }

    // Get MCQ By ID
    static getById(id, callback) {

        db.query(

            "SELECT * FROM mcqs WHERE id=?",

            [id],

            callback

        );

    }

    // Add MCQ
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
                answer
            )
            VALUES(?,?,?,?,?,?,?,?,?)`,

            [

                data.subject,
                data.chapter,
                data.topic,
                data.question,
                data.optionA,
                data.optionB,
                data.optionC,
                data.optionD,
                data.answer

            ],

            callback

        );

    }

    // Update MCQ
    static update(id, data, callback) {

        db.query(

            `UPDATE mcqs
            SET
            subject=?,
            chapter=?,
            topic=?,
            question=?,
            optionA=?,
            optionB=?,
            optionC=?,
            optionD=?,
            answer=?
            WHERE id=?`,

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
                id

            ],

            callback

        );

    }

    // Delete MCQ
    static delete(id, callback) {

        db.query(

            "DELETE FROM mcqs WHERE id=?",

            [id],

            callback

        );

    }

    // Search MCQs
    static search(keyword, callback) {

        db.query(

            `SELECT * FROM mcqs
            WHERE
            question LIKE ?`,

            [

                "%" + keyword + "%"

            ],

            callback

        );

    }

    // Subject Filter
    static subject(subject, callback) {

        db.query(

            "SELECT * FROM mcqs WHERE subject=?",

            [

                subject

            ],

            callback

        );

    }

    // Chapter Filter
    static chapter(chapter, callback) {

        db.query(

            "SELECT * FROM mcqs WHERE chapter=?",

            [

                chapter

            ],

            callback

        );

    }

    // Topic Filter
    static topic(topic, callback) {

        db.query(

            "SELECT * FROM mcqs WHERE topic=?",

            [

                topic

            ],

            callback

        );

    }

    // Random MCQs
    static random(limit, callback) {

        db.query(

            "SELECT * FROM mcqs ORDER BY RAND() LIMIT ?",

            [

                Number(limit)

            ],

            callback

        );

    }

}

module.exports = Mcq;
