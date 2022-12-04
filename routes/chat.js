const express = require("express");
const { auth_jwt } = require("../middleware/auth_jwt");
const {getMessages} = require('../controllers/chat');

const router = express.Router();

router.get('/:id', auth_jwt, (req, res) => {
    const id = req.params.id;

    if(id) getMessages(id, res);
});

module.exports = router;