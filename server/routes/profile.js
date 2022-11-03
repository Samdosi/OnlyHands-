const express = require("express");
const router = express.Router();
const { auth_jwt } = require("../middleware/auth_jwt");
const { create_profile, get_profile, edit_profile } = require("../controllers/profile");


router.get("/", auth_jwt, async (req, res) => {
    await get_profile(req, res);
});

router.post("/", auth_jwt, async (req, res) => {
    await create_profile(req, res);
});

router.put("/", auth_jwt, async (req, res) => {
    await edit_profile(req, res);
});

module.exports = router;