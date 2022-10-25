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
        default : false
    }, 
    resetPasswordToken: {
        type : String
    },
    resetPasswordExpires: {
        type : Date
    }
});

const User = new mongoose.model('user', UserSchema);
module.exports = User;
