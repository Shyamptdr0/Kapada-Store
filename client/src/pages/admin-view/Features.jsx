import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addFeatureImages, deleteFeatureImage, getFeatureImages} from "@/store/common-slice/index.js";
import ProductImageUpload from "@/components/admin-view/ImageUpload.jsx";
import {Button} from "@/components/ui/button.jsx";

function AdminFeatures(props) {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch()
    const {featureImageList} = useSelector(state => state.commonFeature)


    function handleUploadFeature() {
        dispatch(addFeatureImages(uploadedImageUrl)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getFeatureImages());
                // Clear image upload state after successful upload
                setImageFile(null);
                setUploadedImageUrl('');
            }
        });
    }


    useEffect(() => {
        dispatch(getFeatureImages())
    }, [dispatch]);

    console.log(featureImageList, 'feature')


    return (
        <div>
            <div>
                <ProductImageUpload
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    uploadedImageUrl={uploadedImageUrl}
                    setUploadedImageUrl={setUploadedImageUrl}
                    setImageLoadingState={setImageLoadingState}
                    imageLoadingState={imageLoadingState}
                    isCustomStyling={true}
                    // isEditMode={currentEditedId !== null}
                />
                <Button onClick={handleUploadFeature} className="mt-5 w-full">Upload</Button>
                <div className="flex flex-col gap-4 mt-5">
                    {featureImageList && featureImageList.length > 0 &&
                        featureImageList.map(featureImgItem => (
                            <div
                                key={featureImgItem._id}
                                className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden"
                            >
                                <img
                                    src={featureImgItem.image}
                                    alt="Feature"
                                    className="w-full h-64 sm:h-72 md:h-80 lg:h-[400px] object-cover rounded-lg"
                                />
                                <Button
                                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white"
                                    onClick={() => {
                                        dispatch(deleteFeatureImage(featureImgItem._id)).then((res) => {
                                            if (res?.payload?.success) {
                                                dispatch(getFeatureImages());
                                            }
                                        });
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        ))}
                </div>


            </div>
        </div>
    );
}

export default AdminFeatures;