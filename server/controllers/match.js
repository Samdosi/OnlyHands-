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
                matchedProfiles: (foundProfile, matchProfile)
            });

            newMatch.save(err => {
                if (err) {
                    return res.status(400).json(79);
                }

                //? Maybe have to change with `foundProfile._id`
                foundUser.matches.put(foundProfile, newMatch);

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

// POST
const completeMatch = () => {
    //

};

// GET
const getMatches = (userId, res) => {
    //


};

const getSpecificMatch = (userId, matchId, res) => {

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
const serveMatch = (userId, numMatches, res) => {
    // 


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
