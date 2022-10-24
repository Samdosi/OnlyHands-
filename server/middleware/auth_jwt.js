const jwt = require('jsonwebtoken');

//TODO Replace with ENV vars
const jwtKey = "supersecret";
const jwtExpirySeconds = 3600;

auth_jwt = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({ "message": "No token specified!" });
    }

    jwt.verify(token, jwtKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ "message": "Unauthorized!" });
        }

        req._id = decoded.user_id;
        next();
    });


}

