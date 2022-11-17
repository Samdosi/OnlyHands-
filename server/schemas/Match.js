const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const matchSchema = new Schema({
    matchedProfiles: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Profile"
        }]
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        default: null
    },
    isPending: {
        type: Boolean,
        default: false
    }
});



const Match = mongoose.model('match', matchSchema);
module.exports = { Match };