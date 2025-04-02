import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to delete an image from Cloudinary
const deleteImage = async (imageUrl) => {
    try {
      // Extract public_id from Cloudinary URL
      const publicId = imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
export {cloudinary, deleteImage};
