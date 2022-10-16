const Login = require('../schemas/Login');


const createUser = async (res, user) => {

    const tmpUser = new Login(user);
    try{

        await tmpUser.save((error, currentUser) => {
    
            //TODO: Send actual error message
            if(error){ 
                res.status(500).json(error);
            }
    
            else {
                res.status(200).json(currentUser);
            }
        });
    }
    catch (e){
        res.status(500).send(e.message)
    }
}

module.exports = { createUser };