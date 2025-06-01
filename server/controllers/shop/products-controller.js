


const Product = require('../../models/Products');

const getFilterProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            data: products,
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error getting products"
        })
    }
}


module.exports = {getFilterProducts}