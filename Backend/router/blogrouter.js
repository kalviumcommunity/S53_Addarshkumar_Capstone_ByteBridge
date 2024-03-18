const express=require('express');
const blogRouter=express.Router();

const {getBlog}=require("../controller/blogcontroller");

blogRouter.get("/blog",getBlog);

module.exports=blogRouter;