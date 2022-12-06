const { Match } = require("../schemas/Match");
const { Chat } = require("../schemas/Chat")
const { User } = require("../schemas/User");
const { Profile } = require("../schemas/Profile");
const _ = require("underscore");

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
                console.log(err);
                return res.status(404).end();
            }

            const matchProfile = await Profile.findById(matchProfileId)

            if (!matchProfile) {
                console.log("match Profile DNE");
                return res.status(404).end();
            }


            if (foundUser.matches.get(matchProfileId)) {
                console.log("match already exists");
                return res.status(405).end();
            }


            const foundProfile = foundUser.profile;
            console.log(foundProfile)

            const newMatch = new Match({
                matchedProfiles: [foundProfile, matchProfile]
            });

            newMatch.save(err => {
                if (err) {
                    return res.status(400).json(79);
                }
                console.log("saved match");
                //? Maybe have to change with `foundProfile._id`
                foundUser.matches.set(matchProfileId, newMatch);

                foundUser.save(err => {
                    if (err) {
                        return res.status(400).json(87);
                    }
                    console.log("saved user");
                    return res.status(200).json({ "success": true, "message": "Match Created Successfully!" });
                });
            });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ "success": false, "message": "Server Error!" });
    }
};

// TODO TEST
// POST
const completeMatch = async (userId, matchProfileId, res) => {
    try {
        User.findById(userId, async (err, foundUser) => {
            if (err || !foundUser.profile) {
                return res.status(400).json({ "success": false, "message": "Profile not found!" });
            }

            if (foundUser.matches.get(matchProfileId)) {
                return res.status(405).end();
            }

            matchUser = await User.findOne({ "profile": matchProfileId });

            matchDocumentId = matchUser.matches.get(foundUser.profile);

            matchDocument = await Match.findById(matchDocumentId);
            matchDocument.isComplete = true;
            matchDocument.chatId = new Chat();
            await matchDocument.save();

            foundUser.matches.set(matchProfileId, matchDocumentId);

            await foundUser.save();

            return res.status(200).json({ "success": true, "message": "Match Completed Successfully!" });
        })
    } catch (err) {
        return res.status(500).json({ "success": false, "message": "Server error!" });
    }
};


// TODO add pictures
// GET
const getMatches = (userId, searchQuery, res) => {
    try {
        User.findById(userId, async (err, foundUser) => {
            if (err) {
                return res.status(400).json({ "success": false, "message": "User not found!" });
            }

            let matchArr = [];
            const mapEntries = Array.from(foundUser.matches.entries())//.slice(start, start + count + 1);

            for (let index = 0; index < mapEntries.length; index++) {
                const currentArray = mapEntries[index];

                const profileId = currentArray[0];
                const matchId = currentArray[1];


                const profile = await Profile.findById(profileId);
                const matchDoc = await Match.findById(matchId);

                const match = {
                    profileId: profileId,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    online: profile.online,
                    matchId: matchDoc._id,
                    image: profile.image,
                    isComplete: matchDoc.isComplete
                };

                if (searchQuery) {
                    searchRegex = new RegExp(searchQuery, "i");
                    const { firstName, lastName } = match;
                    const fullName = firstName + " " + lastName;
                    console.log(fullName)
                    if (fullName.search(searchRegex) == -1) {
                        continue;
                    }
                }

                matchArr.push(match);
            }

            return res.status(200).json({ "success": true, "matches": matchArr })
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ "success": false, "message": "Server error!" });
    }
};



const getSpecificMatch = (userId, matchId, res) => {
    try {
        Match.findById(matchId, async (err, foundMatch) => {
            if (err || !foundMatch) {
                return res.status(400).json({ "success": false, "message": "Match not found!" });
            }

            return res.status(200).json({ "success": true, "match": foundMatch });
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
                find({
                    $and: [
                        { "_id": { $nin: Array.from(foundUser.matches.keys()) } },
                        { "_id": { $nin: foundUser.rejections } },
                        { "_id": { $not: { $eq: foundUser.profile } } }
                    ]
                })

            console.log(queryRes);


            return res.status(200).json({ "success": true, matches: _.sample(queryRes, numMatches) });
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
