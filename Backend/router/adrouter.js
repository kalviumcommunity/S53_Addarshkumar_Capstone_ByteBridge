const express=require("express");
const adrouter=express.Router();
const {postAd,getAd} =require("../controller/adcontroller");

adrouter.post("/ad-data",postAd);
adrouter.get("/ad-data",getAd);

module.exports=adrouter

