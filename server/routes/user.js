const express = require('express');
const { register } = require('../controllers/user');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.get('/');

router.post('/', async (req, res) => {
    //TODO: encrypt password
    //TODO: validate body
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const gender = req.body.gender;


    await register({
        username,
        password,
        email,
        gender,
        salt
    }, res);
});

module.exports = router;