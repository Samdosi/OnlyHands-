const express = require("express");
const router = express.Router();
const { auth_jwt } = require("../middleware/auth_jwt");
const { create_profile, get_profile } = require("../controllers/profile");

router.get("/", async (req, res) => {
    const profileId = req.headers.profileid;
    await get_profile(profileId, res);
});

router.post("/", auth_jwt, async (req, res) => {
    await create_profile(req, res);
});

//router.put("/", auth_jwt, (req, res) => {
//});




module.exports = router;