const answerModel = require("../model/answerschema")
const dataModel=require("../model/questionschema")
require("dotenv").config();
const jwt=require("jsonwebtoken")

const jwtVerify = (req, res, next) => {
    try {
        let { authorization } = req.headers;
        if (!authorization) {
            throw new Error("Authorization header is missing");
        }
        let token = authorization.split(' ')[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: "You should sign in first" })
    }
};




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


const postQuestion = async (req, res) => {
    try {
        const { name } = req.user;
        const questionData = { ...req.body, username: name };
        const question = await dataModel.create(questionData);
        res.status(201).json({"message":"question posted successfully"});
    } catch (err) {
        console.error("Error during posting questions:", err);
        res.status(500).json({ message: "You should sign in first" });
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

module.exports={getQuestion,getAnswers,postQuestion,postAnswer,jwtVerify}