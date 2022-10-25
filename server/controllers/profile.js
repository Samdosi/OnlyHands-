const {Profile} = require("../schemas/Profile");
const User = require("../schemas/User");



const create_profile = async (req, res) => {
    const profile = new Profile(req.body);

    await profile.save((err, new_profile) => {
        if (err) {
            return res.status(400).json({ "message": "Database error!" });
        }
        else {
            return res.status(200).json({ "message": "Profile sucessfully created!" });
        }
    });
};


const get_profile = async (req, res) => {






};

const edit_profile = async (req, res) => {




};


module.exports = { create_profile, get_profile, edit_profile };