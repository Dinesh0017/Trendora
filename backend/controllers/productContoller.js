import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // First, verify that files are being received
    if (!req.files) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // Handle image uploads more robustly
    const imageFiles = {
      image1: req.files.image1?.[0],
      image2: req.files.image2?.[0],
      image3: req.files.image3?.[0],
      image4: req.files.image4?.[0],
    };

    // Filter out undefined images and collect valid ones
    const validImages = Object.values(imageFiles).filter(img => img);

    if (validImages.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    // Upload images to Cloudinary with error handling
    const imagesUrl = await Promise.all(
      validImages.map(async (image) => {
        try {
          const result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
            folder: "products", // Optional: organize images in a folder
          });
          return result.secure_url;
        } catch (error) {
          console.error("Cloudinary upload error:", error);
          throw new Error("Image upload failed");
        }
      })
    );

    // Create product data object
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      images: imagesUrl, // Store array of image URLs
      date: Date.now(),
    };

    // Save to database
    const product = new productModel(productData);
    await product.save();
    console.log("Product saved:", productData);
    console.log("Images URLs:", imagesUrl);

    res.json({
      success: true,
      message: "Product added successfully",
      product: product // Return the saved product for confirmation
    });

  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};

// Function for list product

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({}).sort({date:-1});
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Function for remove product

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Function for single product info

const singleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.productId);
        res.json({ success: true, product });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { addProduct, listProduct, removeProduct, singleProduct };
