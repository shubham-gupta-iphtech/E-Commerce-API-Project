import express from "express";
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from "../config/multer.js";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
from '../controllers/productController.js'

const router  = express();

router.route('/').get(getProducts)
.post(protect,admin, upload.array("images", 5),createProduct);

router.route('/:id')
.get(getProductById)
.put(protect, admin , updateProduct)
.delete(protect, admin, deleteProduct);

router.route('/update-product-images/:id',upload.array("images",5), async (req, res)=> {
    try {
        const { keepImages } = req.body;
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
    
          // Delete images that are NOT in keepImages
         for (let imageUrl of product.images) {
           if (!keepImages.includes(imageUrl)) {
           await deleteImage(imageUrl);
           }
         }
  
        
        // Upload new images to Cloudinary
        const newImageUrls = req.files.map((file) => file.path);
        const updatedImages = [...keepImages, ...newImageUrls]; 
        // Update product with new images
        product.images = updatedImages;
        await product.save();
    
        res.json({ message: "Product images updated successfully", product });
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    
})


export default router;