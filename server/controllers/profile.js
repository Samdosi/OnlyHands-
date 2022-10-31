const { Profile } = require("../schemas/Profile");
const { User } = require("../schemas/User");



const create_profile = async (req, res) => {
    req = req.body;

    const user = User.findById(req.user_id, (err, found_user) => {

        if (err) {
            return res.status(500).json({ "message": "User DNE!" });
        }

        if (!found_user || found_user.profile != null) {
            return res.status(500).json({ "message": "User Profile Already Exists!" });
        }

        const user_profile = new Profile(req.user_req);

        user_profile.save((err) => {
            if (err) {
                return res.status(400).json({ "message": "Database error!" });
            }

            found_user.profile = user_profile;
            found_user.save((err) => {

                return res.status(200).json({ "message": "User Profile Created!" });
            });
        });
    });
};


const get_profile = async (req, res) => {






};

const edit_profile = async (req, res) => {




};


module.exports = { create_profile, get_profile, edit_profile };