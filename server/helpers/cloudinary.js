const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Cloudinary config
cloudinary.config({
    cloud_name: 'dvyx5bqim',
    api_key: '146638451475577',
    api_secret: 'LnEwIFszz0kFBx7NQw6BfuI_qsQ',
});

// Multer setup with limits and validation
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    },
});

// Upload stream utility
function imageUploadUtils(fileBuffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        stream.end(fileBuffer);
    });
}

module.exports = { upload, imageUploadUtils };
