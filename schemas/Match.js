const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    user_ids: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        validate: [arrayLimit, "Match must contain at most 2 users"],
        default: []
    },
    chat_id: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    },
    isPending: {
        type: Boolean,
        default: true
    }
});

const arrayLimit = (val) => {
    return val.length <= 2;
};