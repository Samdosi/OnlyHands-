const jwt = require('jsonwebtoken');

//TODO Replace with ENV vars
const jwtKey = "supersecret";
const jwtExpirySeconds = 3600;

const auth_jwt = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({ "success": false, "message": "No token specified!" });
    }

    jwt.verify(token, jwtKey, (err, decoded) => {
        if (err) {
            //what does unauthorized mean? does it mean that we tried to access the profile page without being logged in so the token is not valid?
            return res.status(401).json({ "success": false, "message": "Unauthorized!" });
        }

        req.body = { user_id: decoded.user_id, user_req: req.body };
        next();
    });

};

module.exports = { auth_jwt };
