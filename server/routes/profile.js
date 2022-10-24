const express = require("express");
const router = express.Router();
const auth_jwt = require("../util/auth_jwt");
const { create_profile } = require("../controllers/profile");


router.get("/", auth_jwt, (req, res) => {


});

router.post("/", auth_jwt, async (req, res) => {
    await create_profile(req, res);
});

router.put("/", auth_jwt, (req, res) => {



});










module.exports(router);