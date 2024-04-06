const userModel = require("../model/userschema");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const createUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        if (!email || !name || !password) {
            res.send("please enter all fields")
        }

        try {
            const expiresIn = '1h';

            let token;
            try {
                token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn });
            } catch (error) {
                console.error('Error generating JWT token:', error);
                res.status(500).json({"message": "Internal Server Error"});
                return;
            }

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            const oldUser = await userModel.findOne({ email });
            if (oldUser) {
                res.json({"message":"This email already exists"});
            }
            else {
                const user = await userModel.create({ name, email, password });
                res.status(201).json({"message":"You are signed up successfully","token":token});
            }
        }
        catch (err) {
            res.json({err})
        }

    }
    catch (err) {
        console.log('error during creating user', err);
        res.json({"message":"error during creating user"});
    }
}

const findUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (user) {
            const decryptedPassword = await bcrypt.compare(password, user.password)
            if (decryptedPassword) {
                const expiresIn = '1h';

                let token;
                try {
                    token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn });
                } catch (error) {
                    console.error('Error generating JWT token:', error);
                    res.status(500).json({"message": "Internal Server Error"});
                    return;
                }

                res.status(201).json({"message":"successfully signed in","token":token});
            } else {
                res.json({"message":"The password is incorrect"});
            }
        } else {
            res.json({"message":"No such user exists"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}

module.exports = { createUser, findUser };

