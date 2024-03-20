const express=require("express");
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
const mongoConfig=require("./database/db");
const port=process.env.PORT||5000;
const questionRouter=require("./router/questionrouter");
const blogRouter=require("./router/blogrouter");
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error');
});

app.use("/",questionRouter);
app.use("/",blogRouter)

mongoose.connect(mongoConfig.mongouri)
.then(()=>console.log("connected to database"))
.catch((err)=>{console.log("connection error",err)})

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})