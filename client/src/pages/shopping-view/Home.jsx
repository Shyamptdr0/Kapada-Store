import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";


import nikeLogo from "../../assets/logo/nike.svg";
import adidasLogo from "../../assets/logo/adidas.svg";
import pumaLogo from "../../assets/logo/puma.svg";
import levisLogo from "../../assets/logo/levis.svg";
import HMLogo from "../../assets/logo/h&m.svg";
import zaraLogo from "../../assets/logo/zara.svg";
import Women from "../../assets/women.svg";

import {
    Shirt,
    Baby,
    Watch,
    Umbrella,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {Card, CardContent} from "@/components/ui/card";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchAllFilteredProducts,
    fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/ProductTile";
import {addToCart, fetchCartItems} from "@/store/shop/cart-slice";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import {getFeatureImages} from "@/store/common-slice/index.js";

// const slides = [bannerOne, bannerTwo, bannerThree];

const categories = [
    {id: "men", label: "Men", icon: Shirt},
    {id: "women", label: "Women", icon: Women},
    {id: "kids", label: "Kids", icon: Baby},
    {id: "accessories", label: "Accessories", icon: Watch},
    {id: "footwear", label: "Footwear", icon: Umbrella},
];

const brands = [
    {id: "nike", label: "Nike", icon: nikeLogo},
    {id: "adidas", label: "Adidas", icon: adidasLogo},
    {id: "puma", label: "Puma", icon: pumaLogo},
    {id: "levi", label: "Levi's", icon: levisLogo},
    {id: "zara", label: "Zara", icon: zaraLogo},
    {id: "h&m", label: "H&M", icon: HMLogo},
];

function ShoppingHome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const {featureImageList} = useSelector(state => state.commonFeature)


    const {productList, productDetails} = useSelector(
        (state) => state.shopProducts
    );
    const {user} = useSelector((state) => state.auth);

    const handleNavigateToListingPage = (item, section) => {
        sessionStorage.removeItem("filters");
        sessionStorage.setItem("filters", JSON.stringify({[section]: [item.id]}));
        navigate("/shop/listing");
    };

    const handleGetProductDetails = (productId) => {
        dispatch(fetchProductDetails(productId));
    };

    const handleAddToCart = (productId) => {
        dispatch(
            addToCart({
                userId: user?.id,
                productId,
                quantity: 1,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast.success("Product added to cart");
            }
        });
    };

    useEffect(() => {
        if (featureImageList?.length > 0) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [featureImageList]);

    useEffect(() => {
        dispatch(fetchAllFilteredProducts({filterParams: {}, sortParams: "price-lowtohigh"}));
    }, [dispatch]);

    useEffect(() => {
        if (productDetails) {
            setOpenDetailsDialog(true);
        }
    }, [productDetails]);

    useEffect(() => {
        dispatch(getFeatureImages())
    }, [dispatch]);


    return (
        <div className="flex flex-col min-h-screen">
            {/* Carousel */}
            <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden mt-[65px]">
                {
                    featureImageList && featureImageList.length > 0 ?

                    featureImageList.map((slide, index) => (
                    <img
                        key={index}
                        src={slide?.image}
                        alt={`slide-${index}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                    />
                )) : null}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setCurrentSlide((prev) => (prev - 1 + slides.length) % featureImageList.length)
                    }
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80"
                >
                    <ChevronLeft className="w-4 h-4"/>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setCurrentSlide((prev) => (prev + 1) % featureImageList.length)
                    }
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80"
                >
                    <ChevronRight className="w-4 h-4"/>
                </Button>
            </div>

            {/* Categories */}
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {categories.map((category) => (
                            <Card
                                key={category.id}
                                onClick={() => handleNavigateToListingPage(category, "category")}
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    {typeof category.icon === "string" ? (
                                        <img src={category.icon} alt='image' className="w-10 h-10 mb-4"/>
                                    ) : (
                                        <category.icon className="w-10 h-10 mb-4 text-primary"/>
                                    )}
                                    <span className="font-semibold">{category.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands */}
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Shop by Brands</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {brands.map((brand) => (
                            <Card
                                key={brand.id}
                                onClick={() => handleNavigateToListingPage(brand, "brand")}
                                className="cursor-pointer hover:shadow-lg transition-shadow"
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    {typeof brand.icon === "string" ? (
                                        <img src={brand.icon} className="w-10 h-10 mb-4"/>
                                    ) : (
                                        <brand.icon className="w-10 h-10 mb-4 text-primary"/>
                                    )}
                                    <span className="font-semibold">{brand.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="py-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productList?.length > 0 &&
                            productList.slice(0, 3).map((product) => (
                                <ShoppingProductTile
                                    key={product._id}
                                    product={product}
                                    handleGetProductDetails={handleGetProductDetails}
                                    handleAddToCart={handleAddToCart}
                                />
                            ))}

                        {productList?.length > 3 && (
                            <Card
                                onClick={() => navigate("/shop/listing")}
                                className="cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-center"
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                    <span className="text-xl font-semibold mb-2">View All Products</span>
                                    <span className="text-sm text-gray-500">Explore the full collection</span>
                                </CardContent>
                            </Card>
                        )}

                    </div>
                </div>
            </section>

            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    );
}

export default ShoppingHome;
