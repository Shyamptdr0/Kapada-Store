const {imageUploadUtils} = require("../../helpers/cloudinary");
const Products = require("../../models/Products");


const handleImageUpload = async(req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtils(url);


        res.json({
            success: true,
            result,

        })

    }catch (error) {
        console.log(error);
        res.json({
           success : false,
           message: "Error Occurred",
        });
    }
}

//add a new product
const addProduct = async (req, res) => {
    try {
        const {image, title, description, category , brand, price, salePrice , totalStock}= req.body;

        const newlyCreatedProduct = new Products({
            image, title, description, category , brand, price, salePrice , totalStock
        })
        await newlyCreatedProduct.save()
        res.status(200).json({
            success: true,
            data: newlyCreatedProduct,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error Occurred while trying to upload",
        })
    }
}


// fetch all products
const  fetchAllProduct = async (req, res) => {
    try {
        const listOfProducts = await Products.find({})
        res.status(200).json({
            success: true,
            data:listOfProducts
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error Occurred while trying to upload",
        })
    }
}
// edit a products

const editProduct = async (req, res) => {
    try {

        const {id}=req.params;
        const {image, title, description, category , brand, price, salePrice , totalStock}= req.body;

        let findProduct = await Products.findById(id);
        if(!findProduct) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === '' ? 0 : price || findProduct.price;
        findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;

        await findProduct.save();
        res.status(200).json({
            success: true,
            data:findProduct,
        })


    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error Occurred while trying to upload",
        })
    }
}


//delete a products

const deleteProduct = async (req, res) => {
    try {
       const {id} = req.params;
       const product = await Products.findByIdAndDelete(id);

       if(!product) return res.status(404).json({
           success: false,
           message: "Product not found"
       })
        res.status(200).json({
            success: true,
            data:product,
            message: "Product deleted successfully"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error Occurred while trying to upload",
        })
    }
}

module.exports = {handleImageUpload, addProduct,fetchAllProduct,editProduct,deleteProduct}