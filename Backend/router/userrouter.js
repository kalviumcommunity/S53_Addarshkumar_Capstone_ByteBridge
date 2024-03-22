const express=require("express");
const userValidator=require("../validator/uservalidation");

const userRouter=express.Router();
const {createUser,findUser}=require("../controller/usercontroller");
const uservalidation=(req,res,next)=>{
    const {error}=userValidator.validate(req.body);
    if(error){
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

userRouter.post("/signup",uservalidation,createUser);
userRouter.post("/login",findUser)

module.exports=userRouter;