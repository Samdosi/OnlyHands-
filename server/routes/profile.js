const express = require("express");
const router = express.Router();
const auth_jwt = require("../util/auth_jwt");


router.get("/", auth_jwt, (req, res) => {


});

router.post("/", auth_jwt, (req, res) => {


});

router.put("/", auth_jwt, (req, res) => {



});










module.exports(router);