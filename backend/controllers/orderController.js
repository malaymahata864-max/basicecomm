const Order=require("../models/Order");
//ALL ORDERS
const getOrders=async(req,res)=>{
    try{
        const orders=await Order.find().populate("userId","name email").populate("items.productId","name price");
        res.json(orders);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};  
//SINGLE ORDER
const getOrder=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id).populate("userId","name email").populate("items.productId","name price");
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        res.json(order);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}
//get orders by user
const getOrdersByUser=async(req,res)=>{
    try{
        const orders=await Order.find({userId:req.params.userId}).populate("items.productId","name price");
        res.json(orders);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};
//CREATE ORDER
const createOrder=async(req,res)=>{
    try{
        const {items,totalAmount,address}=req.body;
        if(!items || items.length===0){
            return res.status(400).json({message:"Order must contain at least one item"});
        }
        const order=await Order.create({userId:req.user.id,items,totalAmount,address});
        res.status(201).json(order);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}
//UPDATE ORDER
const updateOrder=async(req,res)=>{
    try{
        const {status}=req.body;
        const order=await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        order.status=status || order.status;
        const updatedOrder=await order.save();
        res.json(updatedOrder);
    }   
    catch(err){
        res.status(500).json({message: err.message});
    }
}
//DELETE ORDER
const deleteOrder=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }   
        await order.remove();
        res.json({message:"Order deleted successfully"});
    }   
    catch(err){
        res.status(500).json({message: err.message});
    }
}
module.exports={getOrders,getOrder,getOrdersByUser,createOrder,updateOrder,deleteOrder};