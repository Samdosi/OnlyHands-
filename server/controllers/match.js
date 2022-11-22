const { Match } = require("../schemas/Match");
const { Chat } = require("../schemas/Chat")
const { User } = require("../schemas/User");
const { Profile } = require("../schemas/Profile");

const checkExistingMatch = async (userID, matchProfileId) => {

    try {

        const foundUser = await User.findById(userID);
        if (!foundUser) {
            console.log("BAD BAD THINGS")
            return false;
        }

        const userProfileId = foundUser.profile;

        const foundMatchUser = await User.findOne({ profile: matchProfileId });

        if (!foundMatchUser) {
            console.log("BAD BAD THINGS 2");
            return false;
        };

        return foundMatchUser.matches.get(userProfileId) ? true : false;

        // User.findById(userID, (err, foundUser) => {
        //     if (err) {
        //        console.log(err); 
        //     }

        //     const userProfileId = foundUser.profile;
        //     if(!userProfileId){
        //         console.log("BAD BAD THINGS!")
        //     }


        //     User.findOne({ profile: matchProfileId }, (err, foundMatchUser) => {
        // 		if (err) {
        // 			console.log(err);
        // 		}

        //         console.log(foundMatchUser.matches.get(userProfileId) ? true : false)
        // 		return foundMatchUser.matches.get(userProfileId) ? true : false;
        // 	});
        // })


    } catch (err) {
        console.log(err);
        return false;
        //return res.status(500).json({"success": false, "message": "Server Error!"}); 
    }

};

const createMatch = async (userId, matchProfileId, res) => {
    // will find the user associtated with userId, go into there matches and create a new match record in db
    try {
        User.findById(userId, async (err, foundUser) => {
            if (err) {
                return res.status(404);
            }

            const matchProfile = await Profile.findById(matchProfileId)

            if (!matchProfile) {
                return res.status(404);
            }

            const foundProfile = foundUser.profile;

            const newMatch = new Match({
                matchedProfiles: [foundProfile, matchProfile]
            });

            newMatch.save(err => {
                if (err) {
                    return res.status(400).json(79);
                }

                //? Maybe have to change with `foundProfile._id`
                foundUser.matches.set(foundProfile, newMatch);

                foundUser.save(err => {
                    if (err) {
                        return res.status(400).json(87);
                    }
                    return res.status(200).json({ "success": true, "message": "Match Created Successfully!" });
                });
            });
        });
    }
    catch (err) {
        return res.status(500).json({ "success": false, "message": "Server Error!" });
    }
};

// TODO TEST
// POST
const completeMatch = (userId, matchProfileId, res) => {
    try {
        User.findById(userId, async (err, foundUser) => {
            if (err || !foundUser.profile) {
                return res.status(400).json({ "success": false, "message": "Profile not found!" });
            }

            matchUser = await User.findOne({ "profile": matchProfileId });

            matchDocument = matchUser.matches.get(foundUser.profile);
            matchDocument.isComplete = true;
            console.log(matchDocument);

            foundUser.matches.set(matchProfileId, matchDocument);

            foundUser.save();

            return res.status(200).json({ "success": true, "message": "Match Completed Successfully!" });
        })
    } catch (err) {
        return res.status(500).json({ "success": false, "message": "Server error!" });
    }
};

//! THIS NEEDS TESTING BAD BAD << RUN THRU WITH JOSEPH
// GET
const getMatches = (userId, res, start, count) => {
    try {
        User.findById(userId, async (err, foundUser) => {
            if (err) {
                return res.status(400).json({ "success": false, "message": "User not found!" });
            }

            const matchArr = [];
            for (const [profileId, matchId] in foundUser.matches.entries().slice(start, start + count + 1)) {
                const profile = await Profile.getById(profileId);

                const match = {
                    profileId: profileId,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    matchId: matchId
                };

                matchArr.push(match);
            };

            return res.status(200).json({ "success": true, "matches": matchArr })
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ "success": false, "message": "Server error!" });
    }
};



const getSpecificMatch = (userId, matchId, res) => {
    try {
        User.findById(userId, async (err, foundUser) => {
            if (err) {
                return res.status(400).json({ "success": false, "message": "User not found!" });
            }

            const matchDocument = foundUser.matches.get(matchId);

            return res.status(200).json({ "success": true, "match": matchDocument });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "success": false, "message": "Server error!" });
    }
};


// POST
const dislike = async (userId, matchProfileId, res) => {
    try {
        User.findById(userId, (err, foundUser) => {

            if (err) {
                return res.status(404).json({ "success": false, "message": "User not found!" });
            }

            Profile.findById(matchProfileId, (err, foundMatchProfile) => {
                //console.log(foundMatchProfile);
                if (err) {
                    return res.status(404).json({ "success": false, "message": "Match profile not found!" })
                }

                foundUser.rejections.push(foundMatchProfile);
                //console.log(foundUser.rejections);
                foundUser.save()
                return res.status(200).json({ "success": true, "message": "Match rejected successfully!" })
            })
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "success": false, "message": "Server Error!" });
    }
}


// GET
const serveMatch = async (userId, numMatches, res) => {
    try {
        User.findById(userId, async (err, foundUser) => {
            if (err) {
                return res.status(404).json({ "success": false, "message": "User not found!" });
            }

            const queryRes = await Profile.
                find().
                nin("_id", foundUser.rejections).
                nin("_id", Array.from(foundUser.matches.keys())).
                aggregate().sample(numMatches);

            return res.status(200).json({ "success": true, matches: queryRes });
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ "success": false, "message": "Server error!" });
    }

};


module.exports = {
    checkExistingMatch,
    createMatch,
    completeMatch,
    getMatches,
    getSpecificMatch,
    dislike,
    serveMatch
};
