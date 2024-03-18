const express=require('express');
const blogRouter=express.Router();

const getBlogs=require("../controller/blogcontroller");

blogRouter.get("/blog",getBlogs);

module.exports=blogRouter;