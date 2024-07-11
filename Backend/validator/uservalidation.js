const joi=require("joi");

const userValidator= joi.object({
    name:joi.string().min(3).max(20).required(),
    email:joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d\s]).{6,30}$')).required().messages({
        'string.pattern.base': 'Password must be 6-30 characters long, contain at least one alphabet',
        'string.empty': 'Password is required'
      }),
    profileImg:joi.string()
})

module.exports=userValidator
