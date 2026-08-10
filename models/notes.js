// =====================================
// NOTES MODEL
// =====================================

const db = require("../config/database");

class Notes {

    // Get All Notes
    static getAll(callback) {

        db.query(

            "SELECT * FROM notes ORDER BY id DESC",

            callback

        );

    }

    // Get Note By ID
    static getById(id, callback) {

        db.query(

            "SELECT * FROM notes WHERE id=?",

            [

                id

            ],

            callback

        );

    }

    // Add Note
    static create(data, callback) {

        db.query(

            `INSERT INTO notes
            (
                subject,
                chapter,
                title,
                description,
                price,
                pdf_link
            )
            VALUES(?,?,?,?,?,?)`,

            [

                data.subject,
                data.chapter,
                data.title,
                data.description,
                data.price,
                data.pdf_link

            ],

            callback

        );

    }

    // Update Note
    static update(id, data, callback) {

        db.query(

            `UPDATE notes
            SET
            subject=?,
            chapter=?,
            title=?,
            description=?,
            price=?,
            pdf_link=?
            WHERE id=?`,

            [

                data.subject,
                data.chapter,
                data.title,
                data.description,
                data.price,
                data.pdf_link,
                id

            ],

            callback

        );

    }

    // Delete Note
    static delete(id, callback) {

        db.query(

            "DELETE FROM notes WHERE id=?",

            [

                id

            ],

            callback

        );

    }

    // Purchase History
    static purchases(studentId, callback) {

        db.query(

            "SELECT * FROM notes_purchases WHERE student_id=? ORDER BY id DESC",

            [

                studentId

            ],

            callback

        );

    }

    // Buy Note
    static buy(studentId, notesId, paymentMethod, callback) {

        db.query(

            `INSERT INTO notes_purchases
            (
                student_id,
                notes_id,
                payment_method
            )
            VALUES(?,?,?)`,

            [

                studentId,
                notesId,
                paymentMethod

            ],

            callback

        );

    }

}

module.exports = Notes;
