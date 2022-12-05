const express = require("express");
const router = express.Router();
const { auth_jwt } = require("../middleware/auth_jwt");
const { dislike, checkExistingMatch, createMatch, serveMatch, getMatches, getSpecificMatch, completeMatch } = require("../controllers/match");

router.get("/serve", auth_jwt, async (req, res) => {
    const userId = req.body.user_id;
    const numMatches = req.body.user_req.numMatches || 10;

    await serveMatch(userId, numMatches, res);
});

//Get all matches
router.get("/", auth_jwt, async (req, res) => {
    const { user_id } = req.body;
    const { searchQuery } = req.query;

    await getMatches(user_id, searchQuery, res);
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
        else await completeMatch(user_id, profileID, res);
    }

    else {
        await dislike(user_id, profileID, res);
    }

});


//Get a match
// 
router.get("/:matchID", auth_jwt, async (req, res) => {
    const { user_id } = req.body;
    const matchID = req.params.matchID;

    await getSpecificMatch(user_id, matchID, res);
});


module.exports = router;
