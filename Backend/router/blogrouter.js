const express=require('express');
const blogRouter=express.Router();

const {getBlogs,postBlogs}=require("../controller/blogcontroller");

blogRouter.get("/blog",getBlogs);
blogRouter.post("/blog",postBlogs)

module.exports=blogRouter;