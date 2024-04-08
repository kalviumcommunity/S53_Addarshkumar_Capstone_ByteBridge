const express=require("express");
const cors=require("cors");
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
const mongoConfig=require("./database/db");
const port=process.env.PORT||5000;
const questionRouter=require("./router/questionrouter");
const blogRouter=require("./router/blogrouter");
const userRouter=require("./router/userrouter");
<<<<<<< HEAD
const cors=require("cors");
=======

>>>>>>> da8d4ffa0d3c769a1f563ea9d4c7e142dc3e1e1f
app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error');
});

app.use("/",questionRouter);
app.use("/",blogRouter);
app.use("/",userRouter);

mongoose.connect(mongoConfig.mongouri)
.then(()=>console.log("connected to database"))
.catch((err)=>{console.log("connection error",err)})

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})