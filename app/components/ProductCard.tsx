'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { pb } from '@/app/lib/pocketbase';

interface ProductCardProps {
    product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    // Normalize images to array
    const images = Array.isArray(product.Image)
        ? product.Image
        : product.Image ? [product.Image] : [];

    const displayImages = images.length > 0 ? images : ['placeholder'];

    const getImageUrl = (filename: string) => {
        if (filename === 'placeholder') return '/images/placeholder.svg';
        return `${pb.baseUrl}/api/files/${product.collectionId}/${product.id}/${filename}`;
    };

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsAdding(true);
        setTimeout(() => setIsAdding(false), 1000);
    };

    // No random discounts
    const displayPrice = product.Price ? Number(product.Price) : 0;

    return (
        <div
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#84CC16] hover:shadow-2xl transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative h-64 w-full bg-gray-50 overflow-hidden">
                <Image
                    src={getImageUrl(displayImages[currentImageIndex])}
                    alt={product.Name || 'Product'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.svg';
                    }}
                />

                {/* Carousel Arrows */}
                {displayImages.length > 1 && isHovered && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </>
                )}

                {/* Dots Indicator */}
                {displayImages.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                        {displayImages.map((_: string, idx: number) => (
                            <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/60'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* NEW Badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-[#10B981] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        NEW
                    </span>
                </div>

                {/* Favorite Icon */}
                <button className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition opacity-0 group-hover:opacity-100">
                    <svg className="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Category */}
                {product.Category && (
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        {product.Category}
                    </span>
                )}

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 mt-1 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-[#84CC16] transition">
                    {product.Name || 'Без названия'}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-3 h-10">
                    {product.Description || ''}
                </p>

                {/* Price & Buttons */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="text-2xl font-extrabold text-gray-900 mb-3">
                        {displayPrice.toLocaleString('ru-RU')} ₽
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href={`/product/${product.id}`}
                            className="flex-1 bg-[#84CC16] hover:bg-[#65A30D] text-white px-4 py-2.5 rounded-xl font-bold text-sm transition shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                        >
                            Подробнее
                        </Link>

                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className={`bg-gray-900 hover:bg-gray-800 text-white p-2.5 rounded-xl transition shadow-lg hover:shadow-xl active:scale-95 ${isAdding ? 'bg-[#10B981]' : ''
                                }`}
                            title="В корзину"
                        >
                            {isAdding ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
