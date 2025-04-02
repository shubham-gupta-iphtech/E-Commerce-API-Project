import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
connectDB();
console.log("DB connected");

const app = express();

app.use(cors());
app.use(express.json());

//api routes
app.use('/api/auth',authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin',adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
