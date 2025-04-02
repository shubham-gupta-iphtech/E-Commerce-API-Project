import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    if(!req.user._id)
    {
      return res.json({message: "Please login first !"});
    }
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }
    // Check if product already exists in cart
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Optionally validate that the product exists
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const productId = req.params.productId;
  console.log(productId);
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
