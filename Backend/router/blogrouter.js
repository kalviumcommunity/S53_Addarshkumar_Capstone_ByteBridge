const express=require('express');
const blogRouter=express.Router();
const {blogValidation}=require("../middleware/middleware");
const {getBlogs,postBlogs}=require("../controller/blogcontroller");


blogRouter.get("/blog",getBlogs);
blogRouter.post("/blog",blogValidation,postBlogs)

module.exports=blogRouter;