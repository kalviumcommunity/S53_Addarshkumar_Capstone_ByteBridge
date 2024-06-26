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
    profileimage:{
        type:String,
    },
    like:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    ],
    question_id:{
        questions:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"questions"
            }
        ]
    },
    comments:[
        {
             type:mongoose.Schema.Types.ObjectId,
             ref:"comments"
        }
    ]
});

const answerModel=mongoose.model("answers",answerSchema);
module.exports=answerModel;
