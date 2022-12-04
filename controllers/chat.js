const {Chat} = require('../schemas/Chat');
const {Match} = require('../schemas/Match');

const addMessage = (req) => {
    try{

        Match.findById(req.room, (err, foundMatch) => {
            if(err){
                console.log(err)
            }

            Chat.findById(foundMatch.chatId._id, (err, foundChat) => {
                if(err){
                    console.log(err)
                }

                if(!foundChat){
                    tmp = new Chat();
                    tmp._id = foundMatch.chatId._id;
                    foundChat = tmp;
                }

                foundChat.messages.push({
                    text: req.text,
                    from: req.from,
                    timeSent: req.timeSent,
                    //timeSeen: req.seen,
                    reaction: req.reaction || null
                })
    
                foundChat.save(err => {
                    if(err)console.log(err)
                    else console.log('foundChat saved')
    
                });
            })
        });

    }
    catch(e){
        console.log(e)
    }
}

const getMessages = (id, res) => {

    try{

        Match.findById(id, (err, foundMatch) => {
            if(err){
                return res.status(400).json({ "success": false, "message": "Match not found!" });
            }

            Chat.findById(foundMatch.chatId._id, (err, foundChat) => {
                if(err){
                    console.log(err);
                    return res.status(400).json({ "success": false, "message": "Chat not found!" });
                }

                if(!foundChat){
                    return res.status(200).json({ "success": true, "chats": [] })
                }

                return res.status(200).json({ "success": true, "chats": foundChat.messages })
            })
        });

    }
    catch(e){
        console.log(e);
        return res.status(500).json({ "success": false, "message": "Server error!" });
    }
}



module.exports = { addMessage, getMessages }