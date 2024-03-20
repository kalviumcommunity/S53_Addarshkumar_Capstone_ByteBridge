const answerModel = require("../model/answerschema")
const dataModel=require("../model/questionschema")

const getQuestion=async(req,res)=>{
    try{
        const questions=await dataModel.find({})
        res.status(200).json({questions});
    }
    catch(err){
        console.error("Error during fetching questions:", err);
        res.status(500).send("Error during fetching questions");
    }
}

const postQuestion=async(req,res)=>{
    try{
        const questions=await dataModel.create(req.body);
        res.status(201).json(questions);
    }
    catch(err){
        console.error("Error during posting questions:", err);
        res.status(500).send("Error during posting questions");
    }
}
const getAnswers=async(req,res)=>{
    try{
        const answers=await answerModel.find({})
        res.status(200).json({answers});
    }
    catch(err){
        console.error("Error during fetching answers:", err);
        res.status(500).send("Error during fetching answers");
    }
}

const postAnswer=async(req,res)=>{
    try{
        const answers=await answerModel.create(req.body);
        res.status(201).json(answers);
    }
    catch(err){
        console.error("Error during posting answers:", err);
        res.status(500).send("Error during posting answers");
    }
}

module.exports={getQuestion,getAnswers,postQuestion,postAnswer}