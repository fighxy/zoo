'use client';

import { useState } from 'react';

export default function CategoryBar() {
  const categories = [
    { name: 'Собаки', sub: ['Корм Влажный', 'Корм Сухой', 'Аксессуары', 'Гигиена', 'Здоровье', 'Лакомство', 'Одежда и обувь'] },
    { name: 'Кошки', sub: ['Корм Влажный', 'Корм Сухой', 'Аксессуары', 'Гигиена', 'Здоровье', 'Лакомство', 'Наполнитель', 'Одежда и обувь'] },
    { name: 'Рыбки' },
    { name: 'Птицы' },
    { name: 'Грызуны' },
  ];
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Поиск:', searchTerm);
  };

  return (
    <div className="bg-white py-4 px-6 flex items-center justify-between shadow-md mb-8">
      <div className="flex space-x-6">
        {categories.map((cat) => (
          <div key={cat.name} className="relative group">
            <a href={`#${cat.name.toLowerCase()}`} className="text-blue-600 hover:text-blue-800">
              {cat.name}
            </a>
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block z-10">
              {cat.sub?.map((sub) => (
                <a key={sub} href={`#${sub.toLowerCase()}`} className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                  {sub}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Поиск товара..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
          Искать
        </button>
      </form>
    </div>
  );
}