import { deleteImage } from "../config/cloudinary.js";
import Product from "../models/Product.js";

export const createProduct = async (req,res) => 
{
    const {name , description, price, quantity, category} =req.body;
    
    if(!req.files || req.files.length === 0)
    {
      return res.status(400).json({error: "at least one image is required"});
    }

    const imageUrls = req.files.map((file)=> file.path);

   try {
     const newProduct = new Product({name, description, price, quantity, category, images: imageUrls});
     await newProduct.save();
     res.status(201).json({message: "Product created successfully.", product: newProduct});
   } catch (error) {
      res.status(500).json({message: error.message});
   }

}

export const getProducts = async (req,res) => {
    try {
      let { search, category, minPrice, maxPrice, sort, page, limit } = req.query;
      let query = {};

      // Search by product name (case-insensitive)
      if (search) {
          query.name = { $regex: search, $options: "i" };
      }

      // Filter by category
      if (category) {
          query.category = category;
      }

      // Filter by price range
      if (minPrice || maxPrice) {
          query.price = {};
          if (minPrice) query.price.$gte = Number(minPrice);
          if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      // Sorting
      let sortOption = {};
      if (sort) {
          if (sort === 'price_asc') sortOption.price = 1; // Sort by price ascending
          if (sort === 'price_desc') sortOption.price = -1; // Sort by price descending
      }

      // Pagination
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const skip = (page - 1) * limit;

      // Fetch products
      const products = await Product.find(query)
          .sort(sortOption)
          .skip(skip)
          .limit(limit);

      // Count total products
      const totalProducts = await Product.countDocuments(query);

      res.json({
          total: totalProducts,
          page,
          totalPages: Math.ceil(totalProducts / limit),
          products
      });
 
    } catch (error) {
        res.json({message: "some error occured while getting the products"});
    }
}

export const getProductById = async (req,res) => {
try {    
        console.log(req.params.id);
        const product = await Product.findOne({ _id: req.params.id });
        console.log(product);
        
        if(product)
        {
            res.json(product);
        }
        else res.status(404).json({message: "Product not found"});
} catch (error) {
    res.json({message : error.message});
}
}

export const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
       return res.status(404).json({ error: "Product not found" });
      }
      for( let imageUrl of product.images)
      {
        await deleteImage(imageUrl);
      }
      
      await Product.findByIdAndDelete(req.params.id);
      if (product) res.json({ message: 'Product removed' });
      else res.status(404).json({ message: 'Product not found' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
