const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');
// Connect to MongoDB
connectDB();

const app=express();
// Middleware
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
const PORT= process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Ecommerce API is running in Development mode...');
  });
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});