import Order from "../models/Order.js"; 
import Cart from "../models/Cart.js";
import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrder = async (req, res) => 
{
   const {paymentMethod} = req.body;
   console.log(paymentMethod);
  // try {
    const cart = await Cart.findOne({user:req.user._id}).populate('items.product');
    if(!cart || cart.items.length === 0 )
    {
       return res.status(400).json({message: "cart is empty"});
    } 
     const totalPrice = cart.items.reduce((acc, item)=> acc + item.product.price * item.quantity, 0 )
    
     
     
     //process payment 
     if(paymentMethod === 'stripe')
      {    
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(totalPrice*100),
          currency: 'usd',
          payment_method: "pm_card_visa",
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: "never" 
          }
         });

         res.json({
          paymentIntentId: paymentIntent.id,
          status: paymentIntent.status
      });
      }
      
     
  // } catch (error) {
  //      res.status(500).json({message: error.message});
  // }
}

export const confirmOrder = async (req,res)=>
{
 
    try {
        const { paymentIntentId } = req.body;
        console.log(paymentIntentId);
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
        const cart = await Cart.findOne({user:req.user._id}).populate('items.product');
        const total = cart.items.reduce((acc, item)=> acc + item.product.price * item.quantity, 0 )
        const order = await Order.create({
          user: req.user._id,
          items: cart.items,
          total, 
          paymentStatus: 'paid',
          paymentMethod: 'stripe'
        });
        await order.save();
        cart.items = [];
        await cart.save();
    
        res.status(201).json({paymentIntent,order});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};