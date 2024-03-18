const express=require('express');
const blogRouter=express.Router();

const {getBlog}=require("../controller/blogcontroller");

blogRouter.get("/blog",getQuestion);

module.exports=blogRouter;