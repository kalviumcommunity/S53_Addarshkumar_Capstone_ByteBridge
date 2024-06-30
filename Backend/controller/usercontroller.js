const userModel = require("../model/userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const answerModel = require("../model/answerschema");
const e = require("express");
const { message } = require("../validator/uservalidation");
require("dotenv").config();

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

const createUser = async (req, res) => {
    try {
        if (!req.body.password) {
            req.body.password = process.env.RANDOM_PASSWORD;
        }
        let { name, email, password,profileImg } = req.body;
        if (!email || !name || !password) {
            res.json({ "message": "please enter all fields" })
        }

        try {

            let token;
            try {
                token = jwt.sign({ email, name }, process.env.SECRET_KEY);
            } catch (error) {
                console.error('Error generating JWT token:', error);
                res.status(500).json({ "message": "Internal Server Error" });
                return;
            }

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            const oldUser = await userModel.findOne({ email });
            if (oldUser) {
                res.json({ "message": "This email already exists" });
            }
            else {
                const user = await userModel.create({ name, email, password, profileImg });
                res.status(201).json({ "message": "You are signed up successfully", "token": token });
            }
        }
        catch (err) {
            res.json({err:message})
        }

    }
    catch (err) {
        console.log('error during creating user', err);
        res.json({ "message": "error during creating user" });
    }
}

const findUserPosts=async(req,res)=>{
   const {email} =req.user;
   const user=await userModel.findOne({email});
   if(user){

   const user_id=user._id;
   const userData=await userModel.findById(user_id).populate([
    {
        path:"questions.questions_id"
    },
    {
    path:"answers.answers_id",
    populate:{path:"question_id.questions"}
    },
    {path:"blogs"},
    {path:"ads"}
   ]);
   res.status(200).json(userData);
   }

}

const findUserLikes=async(req,res)=>{
    try {
        const limit = 10;
        const usersWithTotalLikes = await userModel.aggregate([
            
            {
                $lookup: {
                    from: 'answers',
                    localField: 'answers.answers_id',
                    foreignField: '_id',
                    as: 'answersDetails'
                }
            },
            
            { $unwind: '$answersDetails' },
            
            {
                $group: {
                    _id: '$_id',
                    username: { $first: '$name' },
                    totalLikes: { $sum: { $size: '$answersDetails.like' } },
                    userProfile:{ $first: '$profileImg' },
                }
            },
            
            { $sort: { totalLikes: -1 } },
            
            { $limit: limit }
        ]);
    
        res.json(usersWithTotalLikes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
    
}

const updateUserPic=async(req,res)=>{
    try{
        const {email} =req.user;
        const {profileImg} =req.body;
        const user=await userModel.findOne({email});
        user.profileImg=profileImg;
        const updated=await user.save();
        
        res.json(updated)

    }catch(err){
        res.json({error:err.message});
    }
}

const findUser = async (req, res) => {
    try {
        if (!req.body.password) {
            req.body.password = process.env.RANDOM_PASSWORD;
        }
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (user) {
            const decryptedPassword = await bcrypt.compare(password, user.password)
            const { name } = user;
            if (decryptedPassword) {

                let token;
                try {
                    token = jwt.sign({ email, name }, process.env.SECRET_KEY);
                } catch (error) {
                    console.error('Error generating JWT token:', error);
                    res.status(500).json({ "message": "Internal Server Error" });
                    return;
                }

                res.status(201).json({ "message": "successfully signed in", "token": token });
            } else {
                res.status(401).json({ "message": "The password is incorrect" });
            }
        } else {
            res.status(404).json({ "message": "No such user exists" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}

module.exports = { createUser, findUser,findUserPosts,jwtVerify,updateUserPic,findUserLikes};