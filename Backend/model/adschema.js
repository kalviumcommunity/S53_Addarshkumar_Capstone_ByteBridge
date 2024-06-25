const mongoose=require("mongoose");

const adSchema=new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    startDate:{
        type:mongoose.Schema.Types.Date,
        required:true
    },
    endDate:{
        type:mongoose.Schema.Types.Date,
        required:true
    },
    imageUrls:[
        {
        type:String,
        required:true
        }
    ]
})
const adModel=mongoose.model("ads",adSchema);
module.exports=adModel