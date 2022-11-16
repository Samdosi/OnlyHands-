const express = require("express");
const router = express.Router();
const { auth_jwt } = require("../middleware/auth_jwt");



router.get("/", auth_jwt, (req, res) => {


});

router.get("/{somevar}", auth_jwt, (req, res) => {


});

router.post("/", auth_jwt, (req, res) => {


});