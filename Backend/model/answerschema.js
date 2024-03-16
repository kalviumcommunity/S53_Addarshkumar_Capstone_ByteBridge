const mongoose=require('mongoose');

const answerSchema=new mongoose.Schema({
    answer:{
        type:String,
        required:true
    }

})

const answerModel=mongoose.model("users",answerSchema);
module.exports=answerModel