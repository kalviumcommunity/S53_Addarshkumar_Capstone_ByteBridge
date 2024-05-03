const mongoose=require('mongoose');

const answerSchema=new mongoose.Schema({
    question_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions"
    },
    answer:{
        type:String,
        required:true
    }
    ,
    username:{
        type:String,
        required:true
    }
});

const answerModel=mongoose.model("answers",answerSchema);
module.exports=answerModel;
