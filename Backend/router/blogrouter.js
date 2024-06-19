const express=require('express');
const blogRouter=express.Router();
const {blogValidation}=require("../middleware/middleware");
const {getBlogs,postBlogs,jwtVerify,deleteBlog,updateBlog}=require("../controller/blogcontroller");


blogRouter.get("/blog",getBlogs);
blogRouter.post("/blog",jwtVerify,blogValidation,postBlogs)
blogRouter.delete("/blog/:id",deleteBlog);
blogRouter.put("/blog/:id",updateBlog);

module.exports=blogRouter;