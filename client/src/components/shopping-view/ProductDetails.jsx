import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.jsx";
import { Input } from "@/components/ui/input.jsx";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice/index.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/shop/products-slice/index.js";
import { Label } from "@/components/ui/label.jsx";
import StartRatingComponent from "@/components/common/StartRating.jsx";
import { addReview, getReviews } from "@/store/shop/review-slice/index.js";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector(state => state.shopCart);
    const [reviewMsg, setReviewMsg] = useState('');
    const [rating, setRating] = useState(0);
    const { reviews } = useSelector(state => state.shopReview);

    const averageReview = reviews && reviews.length > 0
        ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length
        : 0;

    function handleRatingChange(getRating) {
        setRating(getRating);
    }

    function handleAddToCart(productId, totalStock) {
        const getCartItems = cartItems.items || [];
        const index = getCartItems.findIndex(item => item.productId === productId);

        if (index > -1) {
            const quantity = getCartItems[index].quantity;
            if (quantity + 1 > totalStock) {
                toast.error(`Only ${quantity} quantity can be added for this item`);
                return;
            }
        }

        dispatch(addToCart({ userId: user?.id, productId, quantity: 1 }))
            .then(data => {
                if (data?.payload?.success) {
                    dispatch(fetchCartItems(user?.id));
                    toast.success("Product is added to cart");
                }
            });
    }

    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails());
        setRating(0);
        setReviewMsg('');
    }

    function handleAddReview() {
        dispatch(addReview({
            productId: productDetails?._id,
            userId: user?.id,
            userName: user?.userName,
            reviewMessage: reviewMsg,
            reviewValue: rating,
        })).then(data => {
            if (data?.payload?.success) {
                setRating(0);
                setReviewMsg('');
                dispatch(getReviews(productDetails?._id));
                toast.success("Review added successfully");
            }
        });
    }

    useEffect(() => {
        if (productDetails !== null) {
            dispatch(getReviews(productDetails?._id));
        }
    }, [productDetails]);

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="max-h-[85vh] overflow-y-auto max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] p-4 sm:m-8">
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Left Image */}
                    <div className="sm:w-1/2  w-full overflow-hidden rounded-lg">
                        <img
                            src={productDetails?.image}
                            alt={productDetails?.title}
                            width={600}
                            height={600}
                            className="aspect-square w-full object-cover rounded-lg"
                        />
                    </div>

                    {/* Right Content */}
                    <div className="sm:w-1/2 w-full flex flex-col gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold">{productDetails?.title}</h1>
                            <p className="text-muted-foreground text-base md:text-lg mt-2 mb-4">
                                {productDetails?.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className={`text-xl md:text-2xl font-bold text-primary ${productDetails?.salePrice > 0 ? 'line-through' : ''}`}>
                                ${productDetails?.price}
                            </p>
                            {
                                productDetails?.salePrice > 0 &&
                                <p className="text-xl md:text-2xl font-bold text-muted-foreground">${productDetails?.salePrice}</p>
                            }
                        </div>

                        <div className="flex items-center gap-2">
                            <StartRatingComponent rating={averageReview} />
                            <span className="text-muted-foreground">({averageReview.toFixed(2)})</span>
                        </div>

                        <div>
                            {
                                productDetails?.totalStock <= 0 ? (
                                    <Button disabled className="w-full opacity-65 cursor-not-allowed">
                                        Out of Stock
                                    </Button>
                                ) : (
                                    <Button className="w-full" onClick={() =>
                                        handleAddToCart(productDetails?._id, productDetails?.totalStock)}>
                                        Add to Cart
                                    </Button>
                                )
                            }
                        </div>

                        <Separator />

                        {/* Reviews Section */}
                        <div className="overflow-y-auto max-h-[40vh] space-y-6">
                            <h2 className="text-lg font-bold">Reviews</h2>
                            {
                                reviews && reviews.length > 0 ? reviews.map((reviewItem, idx) => (
                                    <div className="flex gap-4" key={idx}>
                                        <Avatar className="w-10 h-10 border">
                                            <AvatarFallback>
                                                {reviewItem?.userName[0]?.toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold">{reviewItem?.userName}</h3>
                                            </div>
                                            <StartRatingComponent rating={reviewItem?.reviewValue} />
                                            <p className="text-sm text-muted-foreground">
                                                {reviewItem?.reviewMessage}
                                            </p>
                                        </div>
                                    </div>
                                )) : (
                                    <p>No Review</p>
                                )
                            }

                            {/* Add Review */}
                            <div className="pt-4 space-y-2">
                                <Label>Write a review</Label>
                                <StartRatingComponent
                                    rating={rating}
                                    handleRatingChange={handleRatingChange}
                                />
                                <Input
                                    name='reviewMsg'
                                    value={reviewMsg}
                                    onChange={(e) => setReviewMsg(e.target.value)}
                                    placeholder="Write a review..."
                                />
                                <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ''}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;
