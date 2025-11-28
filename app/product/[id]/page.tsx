import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pb } from '@/app/lib/pocketbase';

interface ProductPageProps {
    params: {
        id: string;
    };
}

async function getProduct(id: string) {
    try {
        const product = await pb.collection('products').getOne(id);
        return product;
    } catch (error) {
        return null;
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    // Normalize images
    const images = Array.isArray(product.Image)
        ? product.Image
        : product.Image ? [product.Image] : [];

    const getImageUrl = (filename: string) => {
        return `${pb.baseUrl}/api/files/${product.collectionId}/${product.id}/${filename}`;
    };

    const displayPrice = product.Price ? Number(product.Price) : 0;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <Link href="/" className="hover:text-[#84CC16] transition">
                        Главная
                    </Link>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {product.Category && (
                        <>
                            <span className="hover:text-[#84CC16] transition cursor-pointer">
                                {product.Category}
                            </span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </>
                    )}
                    <span className="text-gray-900 font-medium">{product.Name}</span>
                </nav>

                {/* Product Details */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* Images Section */}
                        <div>
                            {images.length > 0 ? (
                                <div className="space-y-4">
                                    {/* Main Image */}
                                    <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                                        <Image
                                            src={getImageUrl(images[0])}
                                            alt={product.Name || 'Product'}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        {/* NEW Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-[#10B981] text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                                NEW
                                            </span>
                                        </div>
                                    </div>

                                    {/* Thumbnail Gallery */}
                                    {images.length > 1 && (
                                        <div className="grid grid-cols-4 gap-3">
                                            {images.slice(0, 4).map((img: string, idx: number) => (
                                                <div key={idx} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#84CC16] transition">
                                                    <Image
                                                        src={getImageUrl(img)}
                                                        alt={`${product.Name} - ${idx + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
                                    <span className="text-gray-400 text-lg">Нет изображения</span>
                                </div>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="flex flex-col">
                            {/* Category */}
                            {product.Category && (
                                <span className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-2">
                                    {product.Category}
                                </span>
                            )}

                            {/* Title */}
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                {product.Name || 'Без названия'}
                            </h1>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="text-4xl font-extrabold text-gray-900">
                                    {displayPrice.toLocaleString('ru-RU')} ₽
                                </div>
                            </div>

                            {/* Description */}
                            {product.Description && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-3">Описание</h2>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {product.Description}
                                    </p>
                                </div>
                            )}

                            {/* Add to Cart Button */}
                            <div className="mt-auto">
                                <button className="w-full bg-[#84CC16] hover:bg-[#65A30D] text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Добавить в корзину
                                </button>

                                {/* Additional Info */}
                                <div className="mt-6 space-y-3 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>В наличии</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                        <span>Доставка по Москве</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#84CC16] transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Вернуться к покупкам
                    </Link>
                </div>
            </div>
        </div>
    );
}
