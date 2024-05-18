const express=require("express");
const {uservalidation}=require("../middleware/middleware");
const userRouter=express.Router();
const {createUser,findUser,findUserPosts}=require("../controller/usercontroller");
const { jwtVerify } = require("../controller/questioncontroller");


userRouter.post("/signup",uservalidation,createUser);
userRouter.post("/login",findUser);
userRouter.get("/userposts",jwtVerify,findUserPosts)

module.exports=userRouter;