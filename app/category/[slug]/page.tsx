import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pb } from '@/app/lib/pocketbase';
import ProductCard from '@/app/components/ProductCard';

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

const CATEGORY_MAP: Record<string, string> = {
    'dogs': 'Собаки',
    'cats': 'Кошки',
    'birds': 'Птицы',
    'fish': 'Рыбки',
    'rodents': 'Грызуны',
    'reptiles': 'Рептилии',
};

const CATEGORY_ICONS: Record<string, string> = {
    'dogs': '🐕',
    'cats': '🐈',
    'birds': '🦜',
    'fish': '🐠',
    'rodents': '🐹',
    'reptiles': '🦎',
};

async function getProductsByCategory(categoryName: string) {
    try {
        const records = await pb.collection('products').getList(1, 50, {
            filter: `Category = "${categoryName}"`,
        });
        return records.items;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const categoryName = CATEGORY_MAP[params.slug];

    if (!categoryName) {
        notFound();
    }

    const products = await getProductsByCategory(categoryName);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                    <Link href="/" className="hover:text-[#84CC16] transition">
                        Главная
                    </Link>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-900 font-medium">{categoryName}</span>
                </nav>

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl">{CATEGORY_ICONS[params.slug]}</span>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Товары для {categoryName.toLowerCase().replace('собаки', 'собак').replace('кошки', 'кошек').replace('птицы', 'птиц').replace('рыбки', 'рыбок').replace('грызуны', 'грызунов').replace('рептилии', 'рептилий')}
                    </h1>
                    <span className="text-gray-500 text-lg">({products.length})</span>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <span className="text-6xl mb-4 block">😕</span>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Товары не найдены</h2>
                        <p className="text-gray-500 mb-6">В этой категории пока нет товаров.</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-[#84CC16] text-white px-6 py-3 rounded-xl hover:bg-[#65A30D] transition"
                        >
                            Вернуться на главную
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
