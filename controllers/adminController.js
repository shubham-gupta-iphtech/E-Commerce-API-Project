import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getOrderAnalytics = async (req, res) => {
    
 try {
      const orders = await Order.find({});
      const totalRevenue = orders.reduce((acc,order)=> acc + order.total, 0);
      const totalOrders = orders.length;
      res.json({totalRevenue, totalOrders});
      
   
 } catch (error) {
    res.status(500).json({message: error.message});
 }
}

export const getAllOrders = async (req,res) => 
{
   try {
     const orders = await Order.find({}).populate('user','name email');
     res.json(orders);
 
   } catch (error) {
      res.status(500).json({
        message: error.message
      });
   }
}

export const getProductAnalytics = async (req,res) => 
{
    try {
        const products = await Product.find({});
        
        const productAnalytics = products.map((product) => ({
            productId: product._id,
            name: product.name,
            quantity: product.quantity
        })); 
        res.json(productAnalytics);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}
