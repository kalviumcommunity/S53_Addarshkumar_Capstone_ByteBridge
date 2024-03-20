const userModel=require("../model/userschema");

const createUser=async(req,res)=>{
    try{
        const {email}=req.body;
        const oldUser=await userModel.findOne({email});
        if(oldUser){
            res.send("This email already exists");
        }
        else{
           const user=await userModel.create(req.body);
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
            if (user.password === password) {
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