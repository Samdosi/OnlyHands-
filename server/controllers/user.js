const Login = require('../schemas/Login');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const jwtKey = "supersecret";
const jwtExpirySeconds = 3600;

const register = async (req, res) => {
    const user = new Login(req);
    user.password = await bcrypt.hash(user.password, saltRounds);

    try {
        user = await tmpUser.save((err, newUser) => {
            if (err) {
                throw "Error!";
            }

            return newUser;
        });
    } catch (err) {
        res.status(400).json({ status: "failure", message: err.message }).end();
    }

    // Creates Token
    // TODO replace username with database location
    const token = jwt.sign({ id: tmpUser._id, username: username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    });

    res.status(200).json({ status: "sucess", token: token }).end();


};

const autheticate = async (req, res) => {
    // TODO change
    const { username, password } = req;

    // Get Account From DB
    const user = await Login.findOne({ username });

    if (!user || !await bcrypt.compare(password, user.password)) {
        res.status(400).json({ status: "failure", message: "User does not exist!" }).end();
    } else {
        const token = jwt.sign(
            { id: user._id, username: username },
            jwtKey,
            { algorithm: "HS256", expiresIn: jwtExpirySeconds }
        );
        res.status(200).json({ status: "success", token: token }).end();
    }
};

const verifyToken = async (req, res, next) => {




};


module.exports = { register, autheticate, verifyToken };