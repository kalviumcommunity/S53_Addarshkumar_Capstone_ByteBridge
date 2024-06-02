const express=require('express');
const questionRouter=express.Router();

const {getQuestion,getAnswers, postQuestion, postAnswer,jwtVerify,deleteQuestion,editAnswer,deleteAnswer,postLikes,deleteLikes}=require("../controller/questioncontroller");


questionRouter.get("/question",getQuestion);
questionRouter.get("/answer/:id",getAnswers);

questionRouter.post("/question", jwtVerify, postQuestion);
questionRouter.post("/answer/:id",jwtVerify,postAnswer);

questionRouter.delete("/question/:id",deleteQuestion);
questionRouter.put("/answer/:id",editAnswer);
questionRouter.delete("/answer/:id",deleteAnswer);

questionRouter.put("/postlikes/:ans_id",postLikes);
questionRouter.put("/removelikes/:ans_id",deleteLikes);


module.exports=questionRouter;