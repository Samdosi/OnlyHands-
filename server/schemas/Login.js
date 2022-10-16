const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const loginSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    gender: {
        type: String,
        required: true
    }
})

const Login = new mongoose.model('login', loginSchema)
module.exports = Login
