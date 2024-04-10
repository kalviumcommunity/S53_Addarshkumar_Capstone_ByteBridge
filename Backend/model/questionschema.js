const mongoose=require('mongoose');

const dataSchema=new mongoose.Schema({
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

})

const dataModel=mongoose.model("questions",dataSchema);
module.exports=dataModel