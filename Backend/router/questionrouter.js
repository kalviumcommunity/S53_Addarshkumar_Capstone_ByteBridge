const express=require('express');
const questionRouter=express.Router();

const {getQuestion,getAnswers, postQuestion, postAnswer,jwtVerify}=require("../controller/questioncontroller");


questionRouter.get("/question",getQuestion);
questionRouter.get("/answer/:id",getAnswers);

questionRouter.post("/question", jwtVerify, postQuestion);
questionRouter.post("/answer/:id",jwtVerify,postAnswer);

module.exports=questionRouter;