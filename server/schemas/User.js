const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        default: null
    },
    matches: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Match"
        }],
        default: []
    },
    rejections: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Profile"
        }],
        default: []
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

const User = new mongoose.model('user', UserSchema);
module.exports = { User };
