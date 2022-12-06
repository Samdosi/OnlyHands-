const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    messages: {
        type: [{
            text: {
                type: String
            },
            from: {
                type: Schema.Types.ObjectId,
                ref: "Profile"
            },
            timeSent: {
                type: String
            },
            timeSeen: {
                type: String
            },
            reaction: {
                type: String,
                default: null
            }
        }],
        default: []
    }
});

const Chat = mongoose.model("chat", ChatSchema);
module.exports = { Chat };