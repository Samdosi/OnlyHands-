const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
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
    }
});

const Login = new mongoose.model('login', LoginSchema);
module.exports = Login;
