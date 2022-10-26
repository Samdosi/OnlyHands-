const User = require("../schemas/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const saltRounds = 10;
const jwtKey = "supersecret";
const jwtExpirySeconds = 3600;
const e = require("express");

//require sendgrid/mail
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const ohemail = "only.hands202@gmail.com";
const { msg } = require("../middleware/sendEmail");

//create new user
const createUser = async (req, res) => {
    let user = new User(req);
    user.password = await bcrypt.hash(user.password, saltRounds);

    //create message
    const msg = {
        to: user.email,
        from: ohemail,
        subject: "OnlyHands Account Verification",
        html: `<h2>Congratulations on creating your Only Hands account. 
                By clicking of the folllowing link you are verifying your account.</h2>
            <a href = 'http://localhost:5000/user/verify-email?token=${user.emailToken}'>Confirm your email address</a>`,
    };

    try {
        //save user in db first
        await user.save((err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: "failure", message: err.message }).end();
            } else {
                console.log("User created!");
                //once user has been created we send verification email
                try {
                    sgMail.send(msg, (error) => {
                        if (error) {
                            console.log(error);
                            return res.status(400).json({ status: "failure", message: error.message }).end();
                        } else {
                            console.log("Email sent!");
                            // Creates Token
                            const token = jwt.sign({ username: user.username }, jwtKey, {
                                algorithm: "HS256",
                                expiresIn: jwtExpirySeconds,
                            });
                            return res.status(200).json({ status: "success", token: token }).end();
                        }
                    });
                } catch (err) {
                    res.status(500).json({ status: "failure", message: err.message }).end();
                }
            }
        });
    } catch (err) {
        res.status(500).json({ status: "failure", message: err.message }).end();
    }
};

//login user
const login = async (req, res) => {
    const { username, password } = req;

    // Get Account From DB
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(400).json({ status: "failure", message: "User does not exist!" }).end();
    } else {
        const token = jwt.sign({ username: username }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
        });
        res.status(200).json({ status: "success", token: token }).end();
    }
};

//verify new account
const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ emailToken: req });
        if (!user) {
            console.log("Error. Token is invalid.");
            return res.status(400).json({ status: "failure" }).end();
        }
        //update user token and verification status
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
        console.log("User verified");
        return res.status(200).json({ status: "success" }).end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: "failure", message: error.message }).end();
    }
};

//creates a reset token and sends the reset password link to the user
const forgotPassword = async (req, res) => {
    //Find user in DB
    try {
        const user = await User.findOne({ email: req });
        if (!user) {
            res.status(400).json({ status: "failure", message: "Email doesn't exist in our records" }).end();
        } else {
            //generate reset password token
            const resetToken = crypto.randomBytes(64).toString("hex");
            //save token in the user's account
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 3600000;
            await user.save((err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ status: "failure", message: err.message }).end();
                } else {
                    //send reset email link
                    msg(user.email, ohemail, "Password Reset",
                        `<h3>Click on the link below to reset your account password.</h3>
            <a href = 'http://localhost:5000/user/password-reset?token=${resetToken}&email=${user.email}'>Reset password</a>`, res);

                    console.log("Password reset email sent");
                }
            });
        }
    } catch (err) {
        res.status(500).json({ status: "failure", message: err.message }).end();
    }
};

const resetPassword = async (req, res) => {
    //validate token
    const user = await User.findOne({ resetPasswordToken: req.query.token, resetPasswordExpires: { $gt: Date.now() }, });
    if (!user)
        return res.status(400).json({ status: "failure", message: "Password reset token is invalid or has expired." }).end();
    //hash new password
    const hashNewPw = await bcrypt.hash(req.body.password, saltRounds);
    user.password = hashNewPw;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    //save new password in user's account
    await user.save((err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ status: "failure", message: err.message }).end();
        } else {
            //send password changed email confirmation
            msg(user.email, ohemail, "Your password has been changed.",
                `Hi ${user.username} \n This is a confirmation that the password for your account ${user.email} has just been changed.\n`, res);

            console.log("Password has been changed");
        }
    });
};

const reset = (req, res) => {
    try {
        const user = User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        if (!user)
            return res
                .status(400)
                .json({
                    statuse: "failure",
                    message: "Password reset token is invalid or has expired.",
                })
                .end();

        res.render("reset", { user });
    } catch (err) {
        return res
            .status(500)
            .json({ status: "failure", message: err.message })
            .end();
    }
};

const verifyToken = async (req, res, next) => { };

module.exports = { createUser, login, verifyEmail, forgotPassword, reset, resetPassword, };