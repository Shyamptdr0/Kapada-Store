const { imageUploadUtils } = require("../../helpers/cloudinary");
const Products = require("../../models/Products");

// Upload image
const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const result = await imageUploadUtils(req.file.buffer);

        res.status(200).json({
            success: true,
            result,
        });

    } catch (error) {
        console.error("Image Upload Error:", error);
        res.status(500).json({
            success: false,
            message: "Error occurred during image upload",
        });
    }
};

// Add new product
const addProduct = async (req, res) => {
    try {
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        const newProduct = new Products({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        });

        await newProduct.save();

        res.status(200).json({
            success: true,
            data: newProduct,
        });

    } catch (error) {
        console.error("Add Product Error:", error);
        res.status(500).json({
            success: false,
            message: "Error occurred while adding product",
        });
    }
};

// Fetch all products
const fetchAllProduct = async (req, res) => {
    try {
        const products = await Products.find({});
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error("Fetch Products Error:", error);
        res.status(500).json({
            success: false,
            message: "Error occurred while fetching products",
        });
    }
};

// Edit product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        product.image = image || product.image;
        product.title = title || product.title;
        product.description = description || product.description;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.price = price === '' ? 0 : price || product.price;
        product.salePrice = salePrice === '' ? 0 : salePrice || product.salePrice;
        product.totalStock = totalStock || product.totalStock;

        await product.save();

        res.status(200).json({
            success: true,
            data: product,
        });

    } catch (error) {
        console.error("Edit Product Error:", error);
        res.status(500).json({
            success: false,
            message: "Error occurred while editing product",
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product,
        });

    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({
            success: false,
            message: "Error occurred while deleting product",
        });
    }
};



// geting pie chart data
// controller/admin/productController.js

const getProductStockPerCategory = async (req, res) => {
    try {
        const data = await Products.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalStock: { $sum: "$totalStock" },
                },
            },
            {
                $project: {
                    category: "$_id",
                    totalStock: 1,
                    _id: 0,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        console.error("Stock per category error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching category stock",
        });
    }
};




module.exports = {
    handleImageUpload,
    addProduct,
    fetchAllProduct,
    editProduct,
    deleteProduct,
    getProductStockPerCategory,
};
