const User=require("../models/User");
const Order=require("../models/Order");
const Product=require("../models/Product");
const getAnalytics=async(req,res)=>{
    try{
        // Analytics logic here
        const totalUsers=await User.countDocuments({role:"user"});
        const totalOrders=await Order.countDocuments();
        const totalProducts=await Product.countDocuments();
        const orders=await Order.find();
        const totalRevenue=orders.reduce((acc,order)=>acc+order.totalAmount,0);
        res.json({totalUsers,totalOrders,totalProducts,totalRevenue});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}
module.exports={getAnalytics};