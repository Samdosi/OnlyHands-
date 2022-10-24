const express = require('express');
const { createUser, login, verifyEmail} = require('../controllers/user');
const { body, validationResult } = require('express-validator');
const {auth_jwt} = require('../util/auth_jwt');
const router = express.Router();
const Login = require('../schemas/Login')
const crypto = require('crypto');
const { nextTick } = require('process');

router.get('/');

//user registration route
router.post('/',
        //validating email and password
        body('email').isEmail(), body('password').isLength({min:8}), 
        async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const emailToken = crypto.randomBytes(64).toString("hex");

    await createUser({ 
        username,
        password,
        email,
        emailToken
    }, res);
});

//email verification route link
router.get('/verify-email', async (req, res)=>{
    const tk = req.query.token;
    await verifyEmail(tk, res);
    
});

router.post('/login', async (req, res) => {
    //TODO: Validate
    const username = req.body.username;
    const password = req.body.password;

    await login({
        password,
        username
    }, res)
});

router.get('/secret-stuff', auth_jwt, (req, res) => {
   return res.status(200).send("You found my secret stuff!");
});



module.exports = router;