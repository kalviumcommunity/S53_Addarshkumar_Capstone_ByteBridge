const blogModel=require("../model/blogschema");
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
      const blog=await blogModel.create(req.body);
      res.status(201).json(blog);
   }
   catch(err){
      console.log("error during posting blog",err);
      res.status(500).send("error during posting blog")
   }
}

module.exports={getBlogs,postBlogs};