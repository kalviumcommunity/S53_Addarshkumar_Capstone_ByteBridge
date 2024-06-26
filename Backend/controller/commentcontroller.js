require("dotenv").config();
const jwt=require("jsonwebtoken");
const commentModel = require("../model/commentSchema");
const answerModel = require("../model/answerschema");

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
        res.status(403).json({ message: "You should sign in first" });
    }
};

const postComment=async(req,res)=>{
    try{

        const {answerid} = req.params;
        const {name}=req.user;
        const comments=await commentModel.create({...req.body,username:name});
        await answerModel.findByIdAndUpdate(answerid,{
            $push:{
                "comments":comments._id
            }
        })
    }catch(err){
        res.json(err);
    }

}

module.exports={jwtVerify,postComment};