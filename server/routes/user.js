const express = require('express');
const { createUser, login } = require('../controllers/user');
const { body, validationResult } = require('express-validator');
const {auth_jwt} = require('../util/auth_jwt');
const router = express.Router();

router.post('/', async (req, res) => {

    //TODO: validate body
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    await createUser({
        username,
        password,
        email
    }, res);
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