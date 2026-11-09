const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access Denied. No Token Provided."
        });
    }

    try {

        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (verified.role !== "student") {
            return res.status(403).json({
                success: false,
                message: "Student Access Only"
            });
        }

        req.user = verified;

        next();

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }

};

module.exports = auth;
