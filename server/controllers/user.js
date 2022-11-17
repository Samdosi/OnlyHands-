const { User } = require("../schemas/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const saltRounds = 10;
const jwtKey = "supersecret"; 
const jwtExpirySeconds = 3600;
const e = require("express");
require('dotenv').config();

//require sendgrid/mail
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const ohemail = "only.hands202@gmail.com";
const { msg } = require("../middleware/sendEmail");



//! PUT ON SERVER
const url = process.env.APP_URL ||"http://localhost:5000";


const getUser = async (userID) => {
    const user = await User.findById(userID)
    return user;
}

//create new user
const createUser = async (req, res) => {
    const user = new User(req);
    user.password = await bcrypt.hash(user.password, saltRounds);

    //create message
    const msg = {
        to: user.email,
        from: ohemail,
        subject: "OnlyHands Account Verification",
        html: `<h2>Congratulations on creating your Only Hands account. 
                By clicking of the folllowing link you are verifying your account.</h2>
            <a href = '${url}/api/user/verify-email?token=${user.emailToken}'>Confirm your email address</a>`,
    };

    try {
        //save user in db first
        await user.save((err) => {
            if (err) {
                if (err.code == 11000) {
                    if (err.keyPattern.username) {
                        return res.status(400).json({ "success": false, "message": "This username is taken!" });
                    } else {
                        return res.status(400).json({ "success": false, "message": "This email is taken!" });
                    }
                }
                throw err;
            } else {
                //console.log("User created!");
                //once user has been created we send verification email

                sgMail.send(msg, (error) => {
                    if (error) {
                        throw error;
                    } else {
                        return res.status(200).json({ "success": true, message: "Account created!" });
                    }
                });
            }
        });
    } catch (err) {
        res.status(500).json({ "success": false, message: "Server Error!" });
    }
};

//login user
const login = async (req, res) => {
    const { username, password } = req;

    // Get Account From DB
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        //throw new Error("User does not exist!");
        res.status(400).json({ "success": false, "message": "User does not exist!" }).end();
    } else if (!user.isVerified) {
        res.status(400).json({ "success": false, "message": "User has not verified email!" }).end();
    } else {
        const token = jwt.sign({ user_id: user._id }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        });
        res.status(200).json({ "success": true, token: token }).end();
    }
};

//verify new account
const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ emailToken: req });
        if (!user) {
            //console.log("Error. Token is invalid.");
            return res.status(400).json({ "success": false, "message": "Invalid link!" }).end();
        }
        //update user token and verification status
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
        //console.log("User verified");
        return res.status(200).json({ "success": true, "message": "User verified" }).end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "success": false, "message": "Server Error!" }).end();
    }
};

//creates a reset token and sends the reset password link to the user
const forgotPassword = async (req, res) => {
    //Find user in DB
    try {
        const user = await User.findOne({ email: req });
        if (!user) {
            res.status(400).json({ "success": false, "message": "Email doesn't exist in our records" }).end();
        } else {
            //generate reset password token
            const resetToken = crypto.randomBytes(64).toString("hex");
            //save token in the user's account
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 3600000;
            await user.save((err) => {
                if (err) {
                    throw err;
                } else {
                    //send reset email link
                    msg(user.email, ohemail, "Password Reset",
                        `<h3>Click on the link below to reset your account password.</h3>
            <a href = '${url}/api/user/password-reset?token=${resetToken}&email=${user.email}'>Reset password</a>`, res);
                    //console.log("Password reset email sent");
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ "success": false, message: "Server Error!" }).end();
    }
};

const resetPassword = async (req, res) => {
    //validate token
    const user = await User.findOne({ resetPasswordToken: req.query.token, resetPasswordExpires: { $gt: Date.now() }, });
    if (!user)
        return res.status(400).json({ "success": false, message: "Password reset token is invalid or has expired." }).end();
    //hash new password
    const hashNewPw = await bcrypt.hash(req.body.password, saltRounds);
    user.password = hashNewPw;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    //save new password in user's account
    await user.save((err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ "success": false, message: err.message }).end();
        } else {
            //send password changed email confirmation
            msg(user.email, ohemail, "Your password has been changed.",
                `Hi ${user.username}! \n This is a confirmation that the password for your account ${user.email} has just been changed.\n`, res);

            //console.log("Password has been changed");
        }
    });
};

module.exports = { createUser, login, verifyEmail, forgotPassword, resetPassword, };

module.exports = { createUser, login, verifyEmail, forgotPassword, reset, resetPassword, getUser };