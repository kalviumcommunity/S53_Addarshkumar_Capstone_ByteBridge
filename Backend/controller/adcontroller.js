
const adModel=require('../model/adschema');

 const postAd=async(req,res)=>{
    const data=req.body;
    const ads=await adModel.create(data);
    res.json(ads);
 }

 const getAd=async(req,res)=>{
    const data=await adModel.find({});
    res.status(200).json(data);
 }

 module.exports={postAd,getAd};