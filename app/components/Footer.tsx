export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-[60px] h-[60px] relative">
                            <img src="/logo.png" alt="ZOO Market" className="w-full h-full object-contain rounded-full" />
                        </div>
                        <span className="text-2xl font-bold">Zoo<span className="text-[#84CC16]">Маркет</span></span>
                    </div>
                    <p className="text-gray-400 mb-6">Всё для ваших питомцев</p>
                    <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href="tel:+79137998824" className="hover:text-[#84CC16] transition">+7 (913) 799-88-24</a>
                    </div>
                    <p className="text-sm text-gray-500">© 2025 ZooМаркет. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
}
