const userValidator=require("../validator/uservalidation");
const blogValidator=require("../validator/blogvalidator");

const uservalidation=(req,res,next)=>{
    const {error}=userValidator.validate(req.body);
    if(error){
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}
const blogValidation=(req,res,next)=>{
    const {error}=blogValidator.validate(req.body);
    if(error){
     return res.status(400).json({ error: error.details[0].message });
    }
    next();
 }

module.exports=uservalidation,blogValidation;