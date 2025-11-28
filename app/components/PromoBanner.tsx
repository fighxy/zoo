'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const banners = [
    {
        id: 1,
        title: 'Скидки до 50%',
        subtitle: 'На корма премиум-класса',
        bgColor: 'from-orange-400 to-red-500',
        textColor: 'text-white',
    },
    {
        id: 2,
        title: 'Бесплатная доставка',
        subtitle: 'При заказе от 2000₽',
        bgColor: 'from-blue-400 to-indigo-500',
        textColor: 'text-white',
    },
    {
        id: 3,
        title: 'Новинки недели',
        subtitle: 'Игрушки и аксессуары',
        bgColor: 'from-green-400 to-emerald-500',
        textColor: 'text-white',
    },
];

export default function PromoBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-xl">
            {/* Slides */}
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                        }`}
                >
                    <div className={`w-full h-full bg-gradient-to-r ${banner.bgColor} flex items-center justify-center p-8`}>
                        <div className="text-center max-w-2xl">
                            <h2 className={`text-4xl md:text-6xl font-extrabold ${banner.textColor} mb-4`}>
                                {banner.title}
                            </h2>
                            <p className={`text-xl md:text-2xl ${banner.textColor} mb-8 opacity-90`}>
                                {banner.subtitle}
                            </p>
                            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg transform hover:scale-105">
                                Смотреть товары
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition z-10"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition z-10"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
