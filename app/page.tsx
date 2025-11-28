import Link from 'next/link';
import ProductCard from './components/ProductCard';
import PromoBanner from './components/PromoBanner';
import { pb } from '@/app/lib/pocketbase';

type PocketBaseProduct = {
  id: string;
  Name: string;
  Description: string;
  Price: string;
  Image: string;
  Category: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
};

async function getProducts() {
  try {
    const result = await pb.collection('products').getList<PocketBaseProduct>(1, 50);
    return result.items;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  const categories = [
    { name: 'Собаки', slug: 'dogs', icon: '🐕', color: 'from-orange-400 to-red-400' },
    { name: 'Кошки', slug: 'cats', icon: '🐈', color: 'from-purple-400 to-pink-400' },
    { name: 'Птицы', slug: 'birds', icon: '🦜', color: 'from-green-400 to-emerald-400' },
    { name: 'Рыбки', slug: 'fish', icon: '🐠', color: 'from-blue-400 to-cyan-400' },
    { name: 'Грызуны', slug: 'rodents', icon: '🐹', color: 'from-yellow-400 to-orange-400' },
    { name: 'Рептилии', slug: 'reptiles', icon: '🦎', color: 'from-lime-400 to-green-400' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <PromoBanner />
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Категории товаров</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-200 hover:border-[#84CC16] transition-all duration-300 hover:shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition`}></div>
              <div className="relative p-6 flex flex-col items-center text-center">
                <span className="text-5xl mb-3 transform group-hover:scale-110 transition">{category.icon}</span>
                <span className="font-bold text-gray-900 group-hover:text-[#84CC16] transition">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Популярные товары</h2>
            <p className="text-gray-600 mt-1">Лучшие предложения для ваших питомцев</p>
          </div>
          <a href="/catalog" className="hidden md:flex items-center gap-2 text-[#84CC16] font-semibold hover:text-[#65A30D] transition">
            Смотреть все
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {products.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-300">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Товаров пока нет</h3>
              <p className="text-gray-500 mb-4">Добавьте первые товары через админ-панель PocketBase</p>
              <a
                href="http://127.0.0.1:8090/_/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#84CC16] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#65A30D] transition"
              >
                Открыть админ-панель
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-t border-gray-200 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#84CC16] to-[#65A30D] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Гарантия качества</h3>
              <p className="text-gray-600">Только сертифицированные товары от проверенных производителей</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставим ваш заказ в день оформления или на следующий день</p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Забота о клиентах</h3>
              <p className="text-gray-600">Профессиональные консультации по подбору корма и уходу</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
