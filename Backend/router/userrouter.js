const express=require("express");
const {uservalidation}=require("../middleware/middleware");
const userRouter=express.Router();
const {createUser,findUser}=require("../controller/usercontroller");


userRouter.post("/signup",uservalidation,createUser);
userRouter.post("/login",findUser)

module.exports=userRouter;