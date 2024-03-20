const blogModel=require("../model/blogschema");
const getBlogs=async(req,res)=>{
     try{
        const blog=await blogModel.find({});
        res.status(200).json(blog);
     }
     catch(err){
        console.log("error fetching blog",err);
        res.status(500).send("error fetching blog")
     }
}

module.exports=getBlogs