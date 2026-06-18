const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// Connect to MongoDB
connectDB();

const app=express();
// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/analytics', require('./routes/analyticsRoutes'));
const PORT= process.env.PORT || 3000;
app.get("/",(req,res)=>{
    res.send("Hello, World!");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});