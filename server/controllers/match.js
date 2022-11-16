const { Match } = require("../schemas/Match")
const { User }  = require("../schemas/User")
const { Profile } = require("../schemas/Profile")



const checkExistingMatch = async (userID, matchProfileId) => {

    try {

        const foundUser = await User.findById(userID);
        if(!foundUser){
            console.log("BAD BAD THINGS")
            return false;
        }
        
        const userProfileId = foundUser.profile;

        const foundMatchUser = await User.findOne({ profile: matchProfileId });

        if(!foundMatchUser){
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

const createMatch = (userId, matchProfileId, res) => {
    // will find the user associtated with userId, go into there matches and create a new match record in db


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
                return res.status(404).json({"success": false, "message": "User not found!"});
            }

            Profile.findById(matchProfileId, (err, foundMatchProfile) => {
                //console.log(foundMatchProfile);
                if (err) {
                    return res.status(404).json({"success": false, "message": "Match profile not found!"})
                }
                
                foundUser.rejections.push(foundMatchProfile);
                //console.log(foundUser.rejections);
                foundUser.save()
                return res.status(200).json({"success": true, "message": "Match rejected successfully!"})
            })
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({"success": false, "message": "Server Error!"}); 
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
