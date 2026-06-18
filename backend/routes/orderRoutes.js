const express=require("express");
const {getOrders,getOrder,getOrdersByUser,createOrder,updateOrder,deleteOrder}=require("../controllers/orderController");
const isLoggedIn=require("../middleware/isLoggedIn");
const isAdmin=require("../middleware/isAdmin");
const router=express.Router();
router.get("/",isLoggedIn,isAdmin,getOrders);
router.get("/:id",isLoggedIn,getOrder);
router.get("/:userId",isLoggedIn,getOrdersByUser);
router.post("/",isLoggedIn,createOrder);

router.put("/:id",isLoggedIn,isAdmin,updateOrder);
router.delete("/:id",isLoggedIn,deleteOrder);
module.exports=router;