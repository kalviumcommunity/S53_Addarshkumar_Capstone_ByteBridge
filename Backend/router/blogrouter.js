const express=require('express');
const blogRouter=express.Router();
const blogValidator=require("../validator/blogvalidator");

const {getBlogs,postBlogs}=require("../controller/blogcontroller");

const blogValidation=(req,res,next)=>{
   const {error}=blogValidator.validate(req.body);
   if(error){
    return res.status(400).json({ error: error.details[0].message });
   }
   next();
}

blogRouter.get("/blog",getBlogs);
blogRouter.post("/blog",blogValidation,postBlogs)

module.exports=blogRouter;