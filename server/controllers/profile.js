const { Profile } = require("../schemas/Profile");
const { User } = require("../schemas/User");
const { ImageUpload } = require("../schemas/ImageUpload");



const create_profile = async (req, res) => {
    req = req.body;

    User.findById(req.user_id, (err, found_user) => {

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
    if (req) {
        try {
            const profile = await Profile.findById(req);
            if (profile) {
                return res.status(200).json(profile);
            } else {
                return res.status(400).json("No profile was found for this user");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(400).json("Profile ID is required");
    }
};

const get_own_profile = async (req, res) => {


};

const edit_profile = async (req, res) => {
    // TODO unwrap body in route
    req = req.body;

    User.findById(req.user_id, (err, found_user) => {
        if (err) {
            return res.status(400).end();
        }

        Profile.findById(found_user.profile, (err, found_profile) => {
            if (err) {
                return res.status(400).end();
            }

            Object.entries(req.user_req).forEach(([key, value]) => {
                if (value) {
                    found_profile[key] = value;
                }
            });

            found_profile.save((err, saved_profile) => {
                if (err) {
                    return res.status(400).end();
                }

                return res.status(200).end();
            });
        });
    });
};

const upload_image = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ "success": false, "message": "No file provided!" });
        }

        User.findById(req.user_id, (err, found_user) => {
            if (err || !found_user) {
                return res.status(400).json({ "success": false, "message": "User not found!" });
            }

            Profile.findById(found_user.profile, (err, found_profile) => {
                if (err || !found_profile) {
                    return res.status(400).json({ "success": false, "message": "Profile does not exist!" });
                }

                const profile_image = new ImageUpload({
                    fileName: req.body.fileName,
                    file: {
                        data: req.file.buffer,
                        contentType: req.file.mimetype
                    }
                });

                profile_image.save(err => {
                    if (err) {
                        return res.status(400).json({ "success": false, "message": "Database error!" });
                    }

                    found_profile.save(err => {
                        if (err) {
                            return res.status(400).json({ "success": false, "message": "Database error!" });
                        }

                        return res.status(200).json({ "success": true, "image": "Image Uploaded Successful!" });
                    })
                });
            });
        });


    } catch (err) {
        return res.status(500).json({ "success": false, "message": "Server Error!" });
    }
};


module.exports = { create_profile, get_profile, edit_profile, upload_image };