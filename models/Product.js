import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true , index: true},
        description: {type: String},
        category: { type: String, enum:['electronics','home_essen'],required: true, index: true },
        price : { type: Number, required: true },
        quantity: {type: Number, default: 0},
        images: [String],
    },
    {
        timestamps: true
    }
);

const Product =  mongoose.model('Product', productSchema);

export default Product;