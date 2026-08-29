// =====================================
// SETTINGS MODEL - PostgreSQL
// =====================================

const db = require("../config/database");

class Settings {

    // Get Website Settings
    static getSettings(callback) {

        db.query(
            `SELECT *
             FROM site_settings
             ORDER BY id ASC
             LIMIT 1`,
            callback
        );

    }


    // Update Website Settings
    static updateSettings(
        data,
        callback
    ) {

        db.query(
            `UPDATE site_settings
             SET website_name = $1,
                 version = $2,
                 maintenance = $3,
                 student_registration = $4,
                 practice_mcqs = $5,
                 online_tests = $6
             WHERE id = $7`,
            [
                data.website_name,
                data.version,
                data.maintenance,
                data.student_registration,
                data.practice_mcqs,
                data.online_tests,
                data.id
            ],
            callback
        );

    }

}

module.exports = Settings;
