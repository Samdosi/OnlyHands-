const {body, check, validationResult} = require('express-validator')

const validateInput = async(req, res, next) =>{
    body(req.body.age).isInt();

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("CHECK");
             return res.status(400).json({ errors: errors.array() });
        }
    next();

    // const isString = body(['firstName', 'lastName', 'gender', 'height']).trim().isString();
    // const isInt =  check('age').isInt();
    
    // if(!isString && !isInt){
    //     next();
    // }else{
    //     return res.status(400).json({ message:  "input invalid"});
    // }
    // body(req.body.firstName).trim().isString().withMessage("Value must be a string");
    // body(req.body.lasttName).trim().isString().withMessage("Value must be a string");
    // body(req.body.gender).trim().isString().withMessage("Value must be a string");
    // body(req.body.height).trim().isString().withMessage("Value must be a string");

    // body(req.body.age).isInt().withMessage("Age must be a number");
    // body(req.body.weight).isInt().withMessage("Weight must be a number");

    // const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }
    // next();
};

module.exports = { validateInput };