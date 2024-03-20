const answerModel = require("../model/answerschema")
const dataModel=require("../model/questionschema")

const getQuestion=async(req,res)=>{
    try{
        const questions=await dataModel.find({})
        res.status(200).json({questions});
    }
    catch(err){
        console.error("Error fetching questions:", err);
        res.status(500).send("Error fetching questions");
    }
}
const getAnswers=async(req,res)=>{
    try{
        const answers=await answerModel.find({})
        res.status(200).json({answers});
    }
    catch(err){
        console.error("Error fetching answers:", err);
        res.status(500).send("Error fetching answers");
    }
}

module.exports={getQuestion,getAnswers}