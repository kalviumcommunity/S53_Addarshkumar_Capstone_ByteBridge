const mongoose=require('mongoose');

const answerSchema=new mongoose.Schema({
    answer:{
        type:String,
        required:true
    }

})

const answerModel=mongoose.model("answers",answerSchema);
module.exports=answerModel