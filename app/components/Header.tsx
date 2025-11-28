'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-[#84CC16] to-[#65A30D] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-2 text-sm">
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Пн-Вс: 09:00 - 20:00
                            </span>
                        </div>
                        <a href="tel:+79137998824" className="flex items-center gap-1 hover:text-gray-100 transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Справочная +7 (913) 799-88-24
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4 gap-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-[72px] h-[72px] relative">
                                <img src="/logo.png" alt="ZOO Market" className="w-full h-full object-contain" />
                            </div>
                            <div className="hidden sm:block">
                                <div className="font-bold text-xl text-gray-900">Zoo<span className="text-[#84CC16]">Маркет</span></div>
                                <div className="text-xs text-gray-500">Всё для питомцев</div>
                            </div>
                        </Link>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-2xl">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Поиск товаров..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#84CC16] focus:outline-none transition"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#84CC16] text-white p-2 rounded-lg hover:bg-[#65A30D] transition">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button className="hidden md:flex flex-col items-center gap-1 p-2 hover:text-[#84CC16] transition group">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-xs">Профиль</span>
                            </button>

                            <button className="flex flex-col items-center gap-1 p-2 hover:text-[#84CC16] transition relative group">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span className="text-xs">Корзина</span>
                                <span className="absolute -top-1 -right-1 bg-[#10B981] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">0</span>
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                className="md:hidden p-2"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 p-4">
                    <div className="flex flex-col gap-3">
                        <Link href="/profile" className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Профиль
                        </Link>
                        <Link href="/cart" className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Корзина
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
