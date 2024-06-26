const express=require("express");
const commentRouter=express.Router();
const {jwtVerify,postComment} =require("../controller/commentcontroller");

commentRouter.post("/comments/:answerid",jwtVerify,postComment);

module.exports=commentRouter;