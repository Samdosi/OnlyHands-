const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    messages: {
        type: [{
            text: {
                type: String
            },
            from: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            timeSent: {
                type: Date
            },
            timeSeen: {
                type: Date
            },
            reaction: {
                type: String,
                default: null
            }
        }]
    }
});