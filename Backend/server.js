const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const mongoConfig = require("./database/db");
const port = process.env.PORT || 5000;
const questionRouter = require("./router/questionrouter");
const blogRouter = require("./router/blogrouter");
const userRouter = require("./router/userrouter");
const adrouter=require("./router/adrouter");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(mongoConfig.mongouri, {
  family: 4
})
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("connection error", err));

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
});




app.post("/checkout", async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR"
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.get("/paymentsuccess",(req,res)=>{
  res.send("payment is successful")
})


app.get("/api/getkey", (req, res) => {
  res.status(200).json({ key: process.env.KEY_ID });
});

app.use("/", questionRouter);
app.use("/", blogRouter);
app.use("/", userRouter);
app.use("/",adrouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
