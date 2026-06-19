const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
};
//const sendEmail=require('../utils/sendEmail');
// Register a new user
const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        // Check if user already exists
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        // Hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        // Create user
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        });
       if(user){
         // Generate token
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"30d"});
        // Send token in cookie
                res.cookie("token",token,cookieOptions);
        res.status(201).json({message:"User registered successfully",user,token});
        const subject="Welcome to our platform!";
        const text=`Hi ${name},\n\nThank you for registering on our platform. We're excited to have you on board!\n\nBest regards,\nThe Team`;
       // await sendEmail(email,subject,text);
       }
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}
// Login user
const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"30d"});
        res.cookie("token",token,cookieOptions);
        res.status(200).json({message:"Login successful",user,token});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}
// Logout user
const logoutUser=async(req,res)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({message:"Logout successful"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}
// Get all users (admin only)
const getUsers=async(req,res)=>{
    try{
        const users=await User.find().select('-password');
        res.status(200).json({users});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports={registerUser,loginUser,logoutUser,getUsers};