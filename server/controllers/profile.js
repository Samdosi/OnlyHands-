const { Profile } = require("../schemas/Profile");
const { User } = require("../schemas/User");
const { ImageUpload } = require("../schemas/ImageUpload");

const create_profile = async (req, res) => {
    try {
        req = req.body;
        User.findById(req.user_id, (err, found_user) => {

            if (err) {
                return res.status(400).json({ "success": false, "message": "User DNE!" });
            }

            if (!found_user || found_user.profile != null) {
                return res.status(400).json({ "success": false, "message": "User Profile Already Exists!" });
            }

            const user_profile = new Profile(req.user_req);

            user_profile.save((err, savedProfile) => {
                if (err) {
                    return res.status(400).json({ "success": false, "message": "Database Error 1!" });
                }

                found_user.profile = savedProfile;

                found_user.save((err) => {
                    if (err) {
                        return res.status(400).json({ "success": false, "message": "Database Error 2!" });
                    }

                    return res.status(200).json({ "success": true, "message": "User Profile Created!" });
                });
            });
        });
    } catch (err) {
        return res.status(500).json({ "success": false, "message": "Server error!" });
    }
};

const get_profile = async (req, res) => {
    try {
        if (req) {
            const profile = await Profile.findById(req);
            if (profile) {
                return res.status(200).json({ "success": true, "profile": profile });
            } else {
                return res.status(404).json({ "success": false, "profile": "No profile was found for this user" });
            }
        } else {
            return res.status(403).json({ "success": false, "profile": "Profile ID is required" });
        }
    } catch (err) {
        return res.status(500).json({ "success": false, "message": "Server error!" })
    }
};

const edit_profile = async (req, res) => {
    // TODO unwrap body in route
    req = req.body;

    try {
        User.findById(req.user_id, (err, found_user) => {
            if (err) {
                return res.status(404).json({ "success": false, "message": "User not found!" });
            }

            Profile.findById(found_user.profile, (err, found_profile) => {
                if (err) {
                    return res.status(404).json({ "success": false, "message": "Profile not found!" })
                }

                Object.entries(req.user_req).forEach(([key, value]) => {
                    if (value) {
                        found_profile[key] = value;
                    }
                });

                found_profile.save((err, saved_profile) => {
                    if (err) {
                        return res.status(500).json({ "success": false, "message": "Database error!" })
                    }

                    return res.status(200).json({ "success": true, "message": "User Profile Edited!" });
                });
            });
        });
    } catch (err) {
        return res.status(500).json({ "success": false, "message": "Server error!" });
    }
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
        return res.status(500).json({ "success": false, "message": "Server error!" });
    }
};

module.exports = { create_profile, get_profile, edit_profile, upload_image };