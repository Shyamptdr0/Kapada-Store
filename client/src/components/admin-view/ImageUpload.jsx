import React, {useEffect, useRef} from 'react';
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {FileIcon, UploadCloudIcon, XIcon} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {toast} from "sonner";

function ProductImageUpload({
                                imageFile,
                                setImageFile,
                                uploadedImageUrl,
                                setUploadedImageUrl,
                                setImageLoadingState,
                                imageLoadingState,
                                isEditMode,
                                isCustomStyling = false,
                            }) {
    const inputRef = useRef(null);

    const validTypes = [
        "image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml",
        "image/bmp", "image/tiff", "image/heic", "image/avif"
    ];

    function handleImageFileChange(event) {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && validTypes.includes(selectedFile.type)) {
            setImageFile(selectedFile);
        } else {
            toast.error("Unsupported image format.");
        }
    }

    function handleDragOver(event){
        event.preventDefault();
    }

    function handleDrop(event){
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile && validTypes.includes(droppedFile.type)) {
            setImageFile(droppedFile);
        } else {
            toast.error("Unsupported image format.");
        }
    }

    function handleRemoveImage(){
        setImageFile(null);
        setUploadedImageUrl(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file', imageFile);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`, data);
            if (response?.data?.success) {
                setUploadedImageUrl(response.data.result.url);
                toast.success("Image uploaded successfully!");
            }
        } catch (err) {

            toast.error("Something went wrong during image upload.");
        } finally {
            setImageLoadingState(false);
        }
    }

    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary();
    }, [imageFile]);

    return (
        <div className={`w-full mt-4 ${isCustomStyling ? '' : 'max-w-md mx-auto'}`}>
            <Label className='text-lg font-semibold mb-2 block'>
                Upload Image
            </Label>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`${isEditMode ? 'opacity-65' : ''} border-2 border-dashed rounded-lg p-4`}
            >
                <Input
                    id="image-upload"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleImageFileChange}
                    disabled={isEditMode}
                />

                {!imageFile ? (
                    <Label
                        htmlFor='image-upload'
                        className={`${isEditMode ? 'cursor-not-allowed opacity-65' : ''}
                        flex flex-col items-center justify-center h-32 cursor-pointer`}
                    >
                        <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2'/>
                        <span>Drag & Drop or Click to Upload Image</span>
                    </Label>
                ) : (
                    imageLoadingState ? (
                        <Skeleton className='h-10 bg-gray-100'/>
                    ) : (
                        <div className='flex items-center justify-between gap-4'>
                            <div className="flex items-center gap-2">
                                <FileIcon className="w-8 text-primary h-8"/>
                                <p className="text-sm font-medium">{imageFile.name}</p>
                            </div>
                            <Button variant='ghost' size='icon' className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                                <XIcon className="w-4 h-4"/>
                                <span className='sr-only'>Remove File</span>
                            </Button>
                        </div>
                    )
                )}

                {uploadedImageUrl && (
                    <img src={uploadedImageUrl} alt="Uploaded preview" className="mt-4 w-32 h-32 object-cover rounded" />
                )}
            </div>
        </div>
    );
}

export default ProductImageUpload;
