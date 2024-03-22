const joi=require("joi");

const userValidator= joi.object({
    name:joi.string().min(3).max(20).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s])(.{3,30})$') ).required()
})

module.exports=userValidator