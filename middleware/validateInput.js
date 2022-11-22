const Joi = require('joi');

//Validates required input for the profile schema
const validateInput = async(req, res, next) =>{
    const { body } = req; 
    const profileSchema = Joi.object().keys({ 
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      gender: Joi.string().required(),
      height: Joi.string().required(),
      age: Joi.number().required(),
      weight: Joi.number().required(),
      nickname: Joi.string(),
      reach: Joi.string(),
      style: Joi.string(),
      bio: Joi.string().max(140),
      wins: Joi.number(),
      losses: Joi.number(),
      KOs: Joi.number(),
      totalFights: Joi.number(),
    }); 
    
    const result = profileSchema.validate(body);
    const { value, error } = result; 
    const valid = error == null; 
    if (!valid) { 
      res.status(400).json({ "success": false, "message": error.message, data: body});
    } else  {
        next(); 
    }
};

module.exports = { validateInput };