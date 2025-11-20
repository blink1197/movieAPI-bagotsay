const jwt = require("jsonwebtoken")

const JWT_SECRET_KEY = 'MovieAppAPI';

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    };

    return jwt.sign(data, JWT_SECRET_KEY, { expiresIn: "1d" });
};

module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ auth: "Failed", message: "No token provided" });
    }

    token = token.slice(7, token.length);

    jwt.verify(token, JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ auth: "Failed", message: err.message });
        }
        req.user = decodedToken;
        next();
    });
};


module.exports.verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    }
    else {
        res.status(403).json({
            auth: "Failed",
            message: "Action Forbidden: Admin only",
        });
    }
};


