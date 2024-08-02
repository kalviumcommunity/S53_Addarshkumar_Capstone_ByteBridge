const userModel = require("../model/userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const sendEmail = require("../utils/sendemail");
const Token = require("../model/token");
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
        res.status(403).json({ message: "You should sign in first" });
    }
};

const createThirdPartyUser = async (req, res) => {
    try{

        req.body.password = process.env.RANDOM_PASSWORD;
        const { name, email, password, profileImg } = req.body;
    
        if (!email || !name || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
    
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "This email already exists" });
        }
    
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword, profileImg, verified:true });
    
        const savedUser = await newUser.save();

        const jwtToken = jwt.sign({ email, name }, process.env.SECRET_KEY);
        res.status(201).json({ message: "You are signed up successfully", token: jwtToken });
    }
    catch(err){
        res.json({message:err});
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password, profileImg } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "This email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword, profileImg, verified: false });

        const savedUser = await newUser.save();

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const token = new Token({ userId: savedUser._id, token: verificationToken });
        await token.save();

        const url = `${process.env.BASE_URL}verify/${verificationToken}`;
        await sendEmail(email, "Verify Email", `Click the link to verify your email: ${url}`);

        res.status(200).json({ message: "Verification email sent. Please check your email." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const verifyUser = async (req, res) => {
    try {
        const { token } = req.params;

        const storedToken = await Token.findOne({ token });
        if (!storedToken) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const user = await userModel.findById(storedToken.userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.verified) {
            return res.status(400).json({ message: "User already verified" });
        }

        user.verified = true;
        await user.save();

        await Token.findByIdAndDelete(storedToken._id);

        const jwtToken = jwt.sign({ email: user.email, name: user.name }, process.env.SECRET_KEY);
        res.status(201).json({ message: "You are signed up successfully", token: jwtToken });
    } catch (err) {
        console.error('Error verifying user:', err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const findUserPosts = async (req, res) => {
    const { email } = req.user;
    const user = await userModel.findOne({ email });
    if (user) {
        const user_id = user._id;
        const userData = await userModel.findById(user_id).populate([
            { path: "questions.questions_id" },
            { path: "answers.answers_id", populate: { path: "question_id.questions" } },
            { path: "blogs" },
            { path: "ads" }
        ]);
        res.status(200).json(userData);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};

const findUserLikes = async (req, res) => {
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
                    userProfile: { $first: '$profileImg' },
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
};

const updateUserPic = async (req, res) => {
    try {
        const { email } = req.user;
        const { profileImg } = req.body;
        const user = await userModel.findOne({ email });
        user.profileImg = profileImg;
        const updated = await user.save();
        res.json(updated);
    } catch (err) {
        res.json({ error: err.message });
    }
};

const findUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (user) {
            if (!user.verified) {
                return res.status(403).json({ message: "Please verify your email before logging in" });
            }

            const decryptedPassword = await bcrypt.compare(password, user.password);
            if (decryptedPassword) {
                const token = jwt.sign({ email, name: user.name }, process.env.SECRET_KEY);
                res.status(201).json({ message: "Successfully signed in", token });
            } else {
                res.status(401).json({ message: "The password is incorrect" });
            }
        } else {
            res.status(404).json({ message: "No such user exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { createUser, createThirdPartyUser, verifyUser, findUser, findUserPosts, jwtVerify, updateUserPic, findUserLikes };
