const joi= require("joi");

const blogValidator=joi.object({
    name:joi.string().min(3).max(20).required(),
    heading:joi.string().max(50).required(),
    title:joi.string().required()
})

module.exports=blogValidator;