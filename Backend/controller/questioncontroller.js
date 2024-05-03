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
      res.status(201).json({ message: "question posted successfully" });
    } catch (err) {
      console.error("Error during posting questions:", err);
      res.status(500).json({ message: "You should sign in first" });
    }
  };



  const getAnswers = async (req, res) => {
    try {
      const { id } = req.params;
      const answer = await dataModel.findById(id).populate("answer_id.answers");
      const question=await dataModel.findById(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      const answerArray=answer.answer_id.answers;
      res.json({answerArray,question});
    } catch (err) {
      console.error("Error during fetching answers:", err);
      res.status(500).send("Error during fetching answers");
    }
  }
  


  const postAnswer = async (req, res) => {
    try {
      const { id } = req.params;     
      const {name} =req.user;
      const answerData={...req.body,username:name}
      const newAnswer = await answerModel.create(answerData);
      await dataModel.findByIdAndUpdate(
        id,
        { $push: { "answer_id.answers": newAnswer._id } },
        { new: true }
      );

      res.status(201).json(newAnswer);
    } catch (err) {
      console.error("Error during posting answers:", err);
      res.status(500).send("Error during posting answers");  
    }
  };
  

module.exports={getQuestion,getAnswers,postQuestion,postAnswer,jwtVerify}