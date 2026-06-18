const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/database');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: 'Classic Cotton Tee',
    description: 'A soft everyday t-shirt made from breathable cotton.',
    price: 499,
    category: 'Apparel',
    stock: 45,
    imageUrl: 'https://picsum.photos/seed/classic-tee/600/600'
  },
  {
    name: 'Minimal Leather Wallet',
    description: 'Slim wallet with card slots and a clean, minimal finish.',
    price: 1299,
    category: 'Accessories',
    stock: 28,
    imageUrl: 'https://picsum.photos/seed/leather-wallet/600/600'
  },
  {
    name: 'Noise-Canceling Earbuds',
    description: 'Compact wireless earbuds with balanced sound and charging case.',
    price: 2499,
    category: 'Electronics',
    stock: 16,
    imageUrl: 'https://picsum.photos/seed/earbuds/600/600'
  }
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'Admin@123',
    role: 'admin'
  },
  {
    name: 'Default User One',
    email: 'user1@example.com',
    password: 'User@123',
    role: 'user'
  },
  {
    name: 'Default User Two',
    email: 'user2@example.com',
    password: 'User@123',
    role: 'user'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await User.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, salt)
      }))
    );

    await Product.insertMany(products);
    await User.insertMany(hashedUsers);
    console.log('Dummy products inserted successfully');
    console.log('Dummy users inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();