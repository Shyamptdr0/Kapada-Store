const Feature = require("../../models/Feature")

const addFeatureImage = async (req, res)=>{
    try{

        const {image} = req.body;

        const featureImages = new Feature({
            image
        })

        await featureImages.save()

        res.status(200).json({
            success : true,
            data : featureImages
        })

    }
    catch (error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : ' some error'
        })
    }
}


const getFeatureImage = async (req, res)=>{
    try{

 const images = await Feature.find({})

        res.status(200).json({
            success : true,
            data : images
        })
    }
    catch (error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : ' some error'
        })
    }
}


const deleteFeatureImage = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedImage = await Feature.findByIdAndDelete(id);

        if (!deletedImage) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully',
            data: deletedImage
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error during deletion'
        });
    }
};

module.exports = {addFeatureImage, getFeatureImage , deleteFeatureImage}