const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength: 6 
    },
    questions:{
        questions_id:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"questions"
            }
        ]
    },
    answers:{
        answers_id:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"answers"
            }
        ]
    }

})

const userModel=mongoose.model("users",userSchema);
module.exports=userModel