const userModel=require("../model/userschema");
const bcrypt=require("bcrypt");

const createUser=async(req,res)=>{
    try{
        let {name,email,password}=req.body;
        const salt =bcrypt.genSaltSync(10);
         password=bcrypt.hashSync(password,salt);
        console.log(password);
        const oldUser=await userModel.findOne({email});
        if(oldUser){
            res.send("This email already exists");
        }
        else{
           const user=await userModel.create({name,email,password});
           res.status(201).json(user);
       }
    }
    catch(err){
       console.log('error during creating user',err);
       res.send("error during creating user");
    }
}

const findUser=async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        
        if (user) {
            const decryptedPassword= bcrypt.compareSync(password,user.password)
            if (decryptedPassword) {
                res.status(201).json({ user});
            } else {
                res.json("The password is incorrect");
            }
        } else {
            res.json("No such user exists");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}
module.exports={createUser,findUser};