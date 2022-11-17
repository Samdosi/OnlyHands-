const express = require("express");
const router = express.Router();
const { auth_jwt } = require("../middleware/auth_jwt");
const { dislike, checkExistingMatch, createMatch } = require("../controllers/match");


//Get all matches
router.get("/", auth_jwt, (req, res) => {


});

//Get a match
router.get("/:match", auth_jwt, (req, res) => {


});

//Do the match
router.post("/", auth_jwt, async (req, res) => {

    const { user_id } = req.body;
    const { match } = req.body.user_req || false; //bool
    const { profileID } = req.body.user_req;

    if (profileID === null || profileID === undefined) {
        return res.status(400).json({ "success": false, "message": "Profile not specified" })
    }

    if (match) {
        const value = await checkExistingMatch(user_id, profileID);
        if (value) {
            await createMatch(user_id, profileID, res);
        }
        return res.status(200).json({ "success": true, "message": "Match is " + value })
    }

    else {
        dislike(user_id, profileID, res);
    }

});

module.exports = router;