const express=require("express");
const adrouter=express.Router();
const {postAd,getAd, jwtVerify} =require("../controller/adcontroller");

adrouter.post("/ad-data",jwtVerify,postAd);
adrouter.get("/ad-data",getAd);

module.exports=adrouter

