const mongoose=require('mongoose');

const dataSchema=new mongoose.Schema({
    username:{
      type:String
    },
    profileimage:{
        type:String
    },
    question:{
        type:String,
        required:true
    },

})

const dataModel=mongoose.model("questions",dataSchema);
module.exports=dataModel