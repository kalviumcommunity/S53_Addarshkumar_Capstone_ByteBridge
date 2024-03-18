const express=require('express');
const questionRouter=express.Router();

const {getQuestion,getAnswers}=require("../controller/questioncontroller");

questionRouter.get("/question",getQuestion);
questionRouter.get("/answer",getAnswers);

module.exports=questionRouter;