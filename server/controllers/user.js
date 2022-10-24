const Login = require('../schemas/Login');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtKey = "supersecret";
const jwtExpirySeconds = 3600;

//require sendgrid/mail
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const ohemail = 'only.hands202@gmail.com';

//create new user
const createUser = async (req, res) => {
    let user = new Login(req);
    user.password = await bcrypt.hash(user.password, saltRounds);

    //create message
    const msg = {
        to: user.email,
        from: ohemail,
        subject: 'OnlyHands Account Verification',
        text: `Congratulations on creating your Only Hands account. By clicking of the folllowing link you are verifying your account
            http://localhost:5000/user/verify-email?token=${user.emailToken}`,
        html: `<h2>Congratulations on creating your Only Hands account. 
                By clicking of the folllowing link you are verifying your account.</h2>
            <a href = 'http://localhost:5000/user/verify-email?token=${user.emailToken}'>Confirm your email address</a>`
    };

    try {//save user in db first
        await user.save((err)=>{
        if(err){
            console.log(err);
            return res.status(400).json({ status: "failure", message: err.message }).end();
        }else{
                console.log("User created!");
                //once user has been created we send verification email
                try{
                    sgMail.send(msg,(error)=>{
                    if(error){
                        console.log(error);
                        return res.status(400).json({ status: "failure", message: err.message }).end();
                    }else{
                        console.log("Email sent!");
                        // Creates Token
                        const token = jwt.sign({ username: user.username }, jwtKey, {
                            algorithm: "HS256",
                            expiresIn: jwtExpirySeconds,
                        });
                        return res.status(200).json({status: "success", token: token}).end();
                    }
                    })
                }catch{
                    res.status(500).json({ status: "failure", message: err.message }).end();
                }
            }
        })
    } 
    catch (err) {
        res.status(500).json({ status: "failure", message: err.message }).end();
    }
};

const verifyEmail = async (req, res)=>{
    try{
        const user = await Login.findOne({ emailToken :req});
        if(!user){
            console.log('Error. Token is invalid.');
            return res.status(400).json({ status: "failure"}).end();
        }
        //update user token and verification status
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
        console.log("User verified");
        return res.status(200).json({status : "success"}).end();
    }catch(error){
        console.log(error);
        return res.status(400).json({ status: "failure", message: error.message }).end();
    }
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


module.exports = { createUser, login, verifyToken, verifyEmail };