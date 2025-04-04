// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: {type: Number , required: true}
      }
    ],
    total: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    paymentMethod: { type: String, enum: ['stripe', 'paypal'], required: true },
    orderStatus: {type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending'}
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
