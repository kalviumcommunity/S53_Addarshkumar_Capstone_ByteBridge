const joi= require("joi");

const blogValidator=joi.object({
    name:joi.string().min(3).max(20),
    heading:joi.string().max(100),
    title:joi.string(),
    image:joi.string(),
    profileimage:joi.string()
})

module.exports=blogValidator;