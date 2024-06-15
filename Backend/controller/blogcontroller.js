const blogModel=require("../model/blogschema");
const userModel=require("../model/userschema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtVerify = (req, res, next) => {
   try {
       let { authorization } = req.headers;
       if (!authorization) {
           throw new Error("Authorization header is missing");
       }
       let token = authorization.split(' ')[1];
       let decoded = jwt.verify(token, process.env.SECRET_KEY);  
       req.user = decoded;
       next();
   } catch (err) { 
       res.status(403).json({ message: err })
   }
};

const getBlogs=async(req,res)=>{
     try{
        const blog=await blogModel.find({});
        res.status(200).json(blog);
     }
     catch(err){
        console.log("error during fetching blog",err);
        res.status(500).send("error during fetching blog")
     }
}

const postBlogs=async(req,res)=>{
   try{
      const {email,name} =req.user;
      const user=await userModel.findOne({email});
      const profileimage=user.profileImg;
      const blogData={...req.body,name:name,profileimage};
      const blog=await blogModel.create(blogData);
      user_id=user._id;
      await userModel.findByIdAndUpdate(user_id,{
         $push:{
            "blogs":blog._id
         }
      })

      res.status(201).json({message: "Blog posted successfully" ,blog});
   }
   catch(err){
      console.log("error during posting blog",err);
      res.status(500).send("error during posting blog")
   }
}

module.exports={getBlogs,postBlogs,jwtVerify};