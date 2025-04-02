import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ecommerce", // Folder name in Cloudinary
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

export default upload;
