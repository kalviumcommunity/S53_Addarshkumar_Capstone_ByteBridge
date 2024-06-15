const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    profileimage:{
        type:String
    },
    heading:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
    }

})

const blogModel=mongoose.model("blogs",blogSchema);
module.exports=blogModel