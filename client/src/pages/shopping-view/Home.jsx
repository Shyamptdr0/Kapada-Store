import React, { useEffect, useState } from 'react';
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button.jsx";

import nikeLogo from "../../assets/logo/nike.svg";
import adidasLogo from "../../assets/logo/adidas.svg";
import pumaLogo from "../../assets/logo/puma.svg";
import levisLogo from "../../assets/logo/levis.svg";
import Women from "../../assets/women.svg";
import HMLogo from "../../assets/logo/h&m.svg"
import zaraLogo from "../../assets/logo/zara.svg"

import {
    Baby,
    ChevronLeft,
    ChevronRight,
    Shirt,
    Umbrella,
    Watch
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice/index.js";
import ShoppingProductTile from "@/components/shopping-view/ProductTile.jsx";

// Categories (mixed with icon components and image URLs)
const categories = [
    { id: "men", label: "Men", icon: Shirt },
    { id: "women", label: "Women", icon: Women },
    { id: "kids", label: "Kids", icon: Baby },
    { id: "accessories", label: "Accessories", icon: Watch },
    { id: "footwear", label: "Footwear", icon: Umbrella }
];

// Brands (mixed with image URLs and icons)
const brands = [
    { id: "nike", label: "Nike", icon: nikeLogo },
    { id: "adidas", label: "Adidas", icon: adidasLogo },
    { id: "puma", label: "Puma", icon: pumaLogo },
    { id: "levi", label: "Levi's", icon: levisLogo },
    { id: "zara", label: "Zara", icon: zaraLogo },
    { id: "h&m", label: "H&M", icon: HMLogo }
];

function ShoppingHome() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { productList } = useSelector(state => state.shopProducts);
    const dispatch = useDispatch();
    const slides = [bannerOne, bannerTwo, bannerThree];


    function handleNavigateToListingPage(getCurrentItem, section){
     sessionStorage.removeItem('filters')
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Carousel */}
            <div className="relative w-full h-[600px] overflow-hidden">
                {slides.map((slide, index) => (
                    <img
                        src={slide}
                        key={index}
                        className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                    />
                ))}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Categories */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl text-black font-bold text-center mb-8">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {categories.map(categoryItem => (
                            <Card onClick={()=>handleNavigateToListingPage(categoryItem, 'category')} key={categoryItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    {typeof categoryItem.icon === "string" ? (
                                        <img src={categoryItem.icon} alt={categoryItem.label} className="w-12 h-12 mb-4" />
                                    ) : (
                                        <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                                    )}
                                    <span className="font-bold">{categoryItem.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl text-black font-bold text-center mb-8">Shop by Brands</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {brands.map(brandItem => (
                            <Card key={brandItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    {typeof brandItem.icon === "string" ? (
                                        <img src={brandItem.icon} alt={brandItem.label} className="w-12 h-12 mb-4" />
                                    ) : (
                                        <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                                    )}
                                    <span className="font-bold">{brandItem.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl text-black font-bold text-center mb-8">Feature Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productList && productList.length > 0 ? (
                            productList.map(productItem => (
                                <ShoppingProductTile key={productItem.id} product={productItem} />
                            ))
                        ) : null}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ShoppingHome;
