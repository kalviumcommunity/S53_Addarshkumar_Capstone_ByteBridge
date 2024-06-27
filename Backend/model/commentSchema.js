const mongoose=require("mongoose");

const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    userProfile:{
        type:String,
        required:true
    }
})

const commentModel=mongoose.model("comments",commentSchema);
module.exports=commentModel;
