const express=require("express");
const {getAnalytics}=require("../controllers/analyticsController");
const isLoggedIn=require("../middleware/isLoggedIn");
const isAdmin=require("../middleware/isAdmin");
const router=express.Router();
router.get("/",isLoggedIn,isAdmin,getAnalytics);
module.exports=router;