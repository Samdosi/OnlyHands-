const express = require("express");
const router = express.Router();
const { auth_jwt } = require("../middleware/auth_jwt");
const { dislike, checkExistingMatch, createMatch, serveMatch, getMatches, getSpecificMatch } = require("../controllers/match");


//Get all matches
router.get("/", auth_jwt, async (req, res) => {
    const { userId } = req.body;
    const { start, count } = req.body.user_req;

    await getMatches(userId, start, count, res);
});

//Get a match
router.get("/:match", auth_jwt, async (req, res) => {
    const { userId } = req.body;
    const { matchID } = req.body.user_req;

    await getSpecificMatch(userId, matchID, res);
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
        const existingMatch = await checkExistingMatch(user_id, profileID);

        if (!existingMatch) {
            await createMatch(user_id, profileID, res);
        }
        else return res.status(200).json({ "success": true, "message": "Match is " + value })
    }

    else {
        await dislike(user_id, profileID, res);
    }

});

router.get("/serve", auth_jwt, async (req, res) => {
    const { userId } = req.body.user_id;
    const { numMatches } = req.body.user_req || 2;

    await serveMatch(userId, numMatches, res);
});

module.exports = router;