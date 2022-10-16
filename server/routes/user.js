const express = require('express');
const { createUser } = require('../controllers/user');

const router = express.Router();

router.post('/', async (req, res) => {

    //TODO: encrypt password
    //TODO: validate body
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const gender = req.body.gender;
    const salt = "sadfhoe3hfohfo37foi4ghqo3f74gf";


    await createUser(res, {
            username,
            password,
            email,
            gender,
            salt
        });
}); 

module.exports = router;