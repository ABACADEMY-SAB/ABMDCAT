const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {

    const token = req.header("Authorization");

    if (!token) {

        return res.status(401).json({

            success: false,

            message: "Access Denied. Admin Token Required."

        });

    }

    try {

        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (verified.role !== "admin") {

            return res.status(403).json({

                success: false,

                message: "Access Forbidden"

            });

        }

        req.admin = verified;

        next();

    } catch (err) {

        return res.status(401).json({

            success: false,

            message: "Invalid Admin Token"

        });

    }

};

module.exports = adminAuth;
