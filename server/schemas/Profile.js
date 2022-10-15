import mongoose, { Schema } from 'mongoose'

const profileSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    nickname: {
        type: String
    },
    reach: {
        type: String
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    },
    KOs: {
        type: Number,
        default: 0
    },
    totalFights: {
        type: Number,
        default: 0
    },
    style: {
        type: String,
    },
    bio: {
        type: String,
        maxLength: 140
    }
})

module.exports = mongoose.model('Stats', profileSchema)