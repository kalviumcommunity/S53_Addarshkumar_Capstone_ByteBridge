const express=require('express');
const blogRouter=express.Router();
const {blogValidation}=require("../middleware/middleware");
const {getBlogs,postBlogs,jwtVerify}=require("../controller/blogcontroller");


blogRouter.get("/blog",getBlogs);
blogRouter.post("/blog",jwtVerify,blogValidation,postBlogs)

module.exports=blogRouter;