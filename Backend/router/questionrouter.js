const express=require('express');
const questionRouter=express.Router();

const {getQuestion,getAnswers, postQuestion, postAnswer}=require("../controller/questioncontroller");

questionRouter.get("/question",getQuestion);
questionRouter.get("/answer",getAnswers);

questionRouter.post("/question",postQuestion);
questionRouter.post("/answer",postAnswer);

module.exports=questionRouter;