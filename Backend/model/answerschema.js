const mongoose=require('mongoose');

const answerSchema=new mongoose.Schema({
    answer:{
        type:String,
        required:true
    }
    ,
    username:{
        type:String,
        required:true
    },
    question_id:{
        questions:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"questions"
            }
        ]
    }
});

const answerModel=mongoose.model("answers",answerSchema);
module.exports=answerModel;
