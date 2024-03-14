const express=require("express");
const app=express();
require("dotenv").config();
const port=process.env.PORT||5000;

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error');
});

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})