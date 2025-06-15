const express = require('express');

const {handleImageUpload,addProduct,editProduct,deleteProduct,fetchAllProduct,getProductStockPerCategory} = require('../../controllers/admin/products-controller')

const {upload} = require("../../helpers/cloudinary")

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload)
router.post('/add', addProduct)
router.put('/edit/:id', editProduct)
router.delete('/delete/:id', deleteProduct)
router.get('/get', fetchAllProduct)
router.get('/stock', getProductStockPerCategory)

module.exports = router;
