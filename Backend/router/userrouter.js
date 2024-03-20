const express=require("express");

const userRouter=express.Router();
const {createUser,findUser}=require("../controller/usercontroller");

userRouter.post("/signup",createUser);
userRouter.post("/login",findUser)

module.exports=userRouter;