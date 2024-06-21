const mongoose=require('mongoose');
const answerModel=require("./answerschema")

const dataSchema=new mongoose.Schema({
    answer_id:{
        answers:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"answers"
            }
        ]
    },
    username:{
      type:String,
      required:true
    },
    profileimage:{
        type:String,
    },
    question:{
        type:String,
    },
    questionImage:{
        type:String
    }

},{timestamps:true}
);

const dataModel=mongoose.model("questions",dataSchema);
module.exports=dataModel;
