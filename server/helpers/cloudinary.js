const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name : 'dvyx5bqim',
    api_key : '146638451475577',
    api_secret: 'LnEwIFszz0kFBx7NQw6BfuI_qsQ',
})

const storage = new multer.memoryStorage();

async function imageUploadUtils(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
    });
    return result;
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtils};