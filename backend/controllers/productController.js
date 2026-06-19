const Product=require("../models/Product");
const cloudinary=require("../config/cloudinary");
//ALL PRODUCTS
const getProducts=async(req,res)=>{
    try{
        const products=await Product.find();
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
//SINGLE PRODUCT
const getProduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
//cREATE PRODUCT
const createProduct=async(req,res)=>{
    try{
        const {name,description,price,category,stock}=req.body;
        if(!req.file){
            return res.status(400).json({message:"Product image is required"});
        }

        const result=await cloudinary.uploader.upload(req.file.path);
        const imageUrl=result.secure_url;

        const product=new Product({
            name,
            description,
            price: Number(price),
            imageUrl,
            category,
            stock: Number(stock)
        });
        const savedProduct=await product.save();
        res.status(201).json(savedProduct);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
//UPDATE PRODUCT
const updateProduct=async(req,res)=>{
    try {
    const { name, title, description, price, category, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
            // Allow `title` as alias for `name` from admin UI
            product.name = title ?? name ?? product.name;
            product.description = description ?? product.description;
            product.price = price !== undefined ? Number(price) : product.price;
            product.category = category ?? product.category;
            product.stock = stock !== undefined ? Number(stock) : product.stock;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        product.imageUrl = result.secure_url;
      }
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//DELETE PRODUCT
const deleteProduct=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }   
        await product.deleteOne();
        res.status(200).json({message:"Product deleted successfully"});
    }   
    catch(err){
        res.status(500).json({message:err.message});
    }
}
//UPDATE RATING
const updateRating=async(req,res)=>{
    try{
        const { rating } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
       product.ratings.push({userId:req.user._id,rating:Number(rating)});
       product.avgRating = product.ratings.reduce((acc, curr) => acc + curr.rating, 0) / product.ratings.length;
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports={getProducts,getProduct,createProduct,updateProduct,deleteProduct,updateRating};