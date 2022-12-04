const {Chat} = require('../schemas/Chat');

const addMessage = (req) => {
    try{
        Chat.findById(req.room, (err, foundChat) => {
            if(err){
                console.log(err)
            }

            foundChat.messages.push({
                text: req.text,
                from: req.author,
                timeSent: req.time,
                //timeSeen: req.seen,
                reaction: req.reaction || null
            })

            foundChat.save(err => {
                if(err)console.log(err)
                else console.log('foundChat saved')

            });

        })
    }
    catch(e){
        console.log(e)
    }
}



module.exports = { addMessage }