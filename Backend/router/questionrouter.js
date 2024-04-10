const express=require('express');
const questionRouter=express.Router();

const {getQuestion,getAnswers, postQuestion, postAnswer,jwtVerify}=require("../controller/questioncontroller");


questionRouter.get("/question",getQuestion);
questionRouter.get("/answer",getAnswers);

questionRouter.post("/question",jwtVerify,postQuestion);
questionRouter.post("/answer",postAnswer);

module.exports=questionRouter;