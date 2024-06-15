const express=require("express");
const {uservalidation}=require("../middleware/middleware");
const userRouter=express.Router();
const {createUser,findUser,findUserPosts,updateUserPic,findUserLikes}=require("../controller/usercontroller");
const { jwtVerify } = require("../controller/questioncontroller");


userRouter.post("/signup",uservalidation,createUser);
userRouter.post("/login",findUser);
userRouter.get("/userposts",jwtVerify,findUserPosts);
userRouter.get("/userlikes",findUserLikes);
userRouter.put("/updateUser",jwtVerify,updateUserPic);

module.exports=userRouter;