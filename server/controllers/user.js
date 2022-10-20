const Login = require('../schemas/Login');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const jwtKey = "supersecret";
const jwtExpirySeconds = 3600;

const createUser = async (req, res) => {
    let user = new Login(req);
    user.password = await bcrypt.hash(user.password, saltRounds);

    try {
        await user.save((err) => {
            if (err) {
                res.status(400).json({ status: "failure", message: err.message }).end();  
            }

        });
    } 
    catch (err) {
        res.status(500).json({ status: "failure", message: err.message }).end();
    }

    // Creates Token
    // TODO replace username with database location
    const token = jwt.sign({ username: user.username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    });

    res.status(200).json({ status: "success", token: token }).end();

};

const login = async (req, res) => {
    // TODO change
    const { username, password } = req;

    // Get Account From DB
    const user = await Login.findOne({ username });

    if (!user || !await bcrypt.compare(password, user.password)) {
        res.status(400).json({ status: "failure", message: "User does not exist!" }).end();
    } else {
        const token = jwt.sign(
            { username: username },
            jwtKey,
            { algorithm: "HS256", expiresIn: jwtExpirySeconds }
        );
        res.status(200).json({ status: "success", token: token }).end();
    }
};

const verifyToken = async (req, res, next) => {


};


module.exports = { createUser, login, verifyToken };