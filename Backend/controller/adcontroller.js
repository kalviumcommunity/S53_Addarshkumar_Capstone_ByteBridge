const adModel = require('../model/adschema');
const userModel = require('../model/userschema');
const jwt = require('jsonwebtoken');

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
       res.status(403).json({ message: err.message });
   }
};

const postAd = async (req, res) => {
    try {
        const data = req.body;
        const { email } = req.user;
        const ad = await adModel.create(data);
        const ad_id = ad._id;
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        
        await userModel.findByIdAndUpdate(user._id, {
            $push: {
                ads: ad_id
            }
        });
        
        res.json(ad);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAd = async (req, res) => {
    try {
        const data = await adModel.find({});
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { postAd, getAd, jwtVerify };
