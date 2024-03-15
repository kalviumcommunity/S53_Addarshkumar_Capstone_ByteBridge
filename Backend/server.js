const express=require("express");
const app=express();
const mongoose=require("mongoose")
require("dotenv").config();
const mongoConfig=require("./database/db")
const port=process.env.PORT||5000;

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error');
});

app.get("/",(req,res)=>{
    res.send("hello world");
})


mongoose.connect(mongoConfig.mongouri)
.then(()=>console.log("connected to database"))
.catch((err)=>{console.log("connection error",err)})

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})