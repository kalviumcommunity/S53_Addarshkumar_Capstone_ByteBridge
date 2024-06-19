const answerModel = require("../model/answerschema")
const dataModel=require("../model/questionschema")
require("dotenv").config();
const {startSession}=require("mongoose")
const jwt=require("jsonwebtoken");
const userModel = require("../model/userschema");

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
    const { name, email } = req.user;
    const user = await userModel.findOne({ email });
    const profileimage=user.profileImg;
    const questionData = { ...req.body, username: name,profileimage };
    const question = await dataModel.create(questionData);
    const user_id = user._id;
    await userModel.findByIdAndUpdate(
      user_id,
      {
        $push: {
          "questions.questions_id": question._id
        }
      }
    )
    res.status(201).json({ message: "question posted successfully" });
  } catch (err) {
    console.error("Error during posting questions:", err);
    res.status(500).json({ message: "You should sign in first" });
  }
};

const deleteQuestion=async(req,res)=>{
  const session=await startSession();
  session.startTransaction();
   try{
    const {id} =req.params;
    const question=await dataModel.findById(id);
    const answerToDelete=question.answer_id.answers
    answerToDelete.forEach(async(e)=>{
       await answerModel.findByIdAndDelete(e)
    })
    
    await dataModel.findByIdAndDelete(id);
    await session.commitTransaction();
    session.endSession();
   }
   catch(err){
    await session.abortTransaction();
    session.endSession();

    res.json({message:"An error occured during deleting"}); 
   }
}




  const getAnswers = async (req, res) => {
    try {
      const { id } = req.params;
      const answer = await dataModel.findById(id).populate("answer_id.answers");
      const question=await dataModel.findById(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      if(!answer){
        return res.status(404).json({ message: "Answer not found" });
      }
      const answerArray=answer.answer_id.answers;
      res.json({answerArray,question});
    } catch (err) {
      console.error("Error during fetching answers:", err);
      res.status(500).send("Error during fetching answers");
    }
  }
  

  const postAnswer = async (req, res) => {
    const session = await startSession();
    session.startTransaction();
    try {
      const { id } = req.params;     
      const {name,email} =req.user;
      const user=await userModel.findOne({email});
      const profileimage=user.profileImg;
      const answerData={...req.body,username:name,profileimage}  
      const newAnswer = await answerModel.create(answerData);
      const user_id=user._id;
      await userModel.findByIdAndUpdate(
        user_id,{
          $push:{
            "answers.answers_id":newAnswer._id
          }
        }
      )

      await answerModel.findByIdAndUpdate(
        newAnswer._id,
        {
          $push:{
            "question_id.questions":id
          }
        }
      )

      await dataModel.findByIdAndUpdate(
        id,
        { $push: { "answer_id.answers": newAnswer._id } },
        { new: true }
      );
      await session.commitTransaction();
      session.endSession();
      res.status(201).json({ message: "Answer posted successfully", newAnswer });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error during posting answers:", err);
      res.status(500).send("Error during posting answers");  
    }
  };

  const editAnswer=async(req,res)=>{
    try{
      const {id}=req.params;
      const {answer}=req.body;
      const updatedData=await answerModel.findByIdAndUpdate(id,
        {answer}
      )
      res.send(updatedData)
      
    }
    catch(err){ 
      res.send(err);
    }
  }

  const deleteAnswer=async(req,res)=>{
    try{
      const {id} = req.params;
      await answerModel.findByIdAndDelete(id);

    }
    catch(err){
      res.json({message:"An error occured during deleting"});

    }
  }

  const postLikes=async(req,res)=>{
    try{
      const {ans_id} =req.params;
      const {user_id}=req.body;
      const answers=await answerModel.findByIdAndUpdate(ans_id,
        {$push : {"like":user_id}},
        {new:true}
        
      );
      res.json(answers);
     
    }catch(err){
      res.json({error:err.message});
    }
  }

  const deleteLikes=async(req,res)=>{
    try{
      const {ans_id} =req.params;
      const {user_id}=req.body;
      const answers=await answerModel.findByIdAndUpdate(ans_id,
        {$pull : {"like":user_id}},
        {new:true}
        
      );
      res.json(answers);
     
    }catch(err){
      res.json({error:err.message});
    }
  }
  

module.exports={getQuestion,getAnswers,postQuestion,postAnswer,deleteQuestion,editAnswer,deleteAnswer,postLikes,deleteLikes,jwtVerify}