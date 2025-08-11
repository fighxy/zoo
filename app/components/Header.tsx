'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white text-black py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between w-full">
        <div className="flex items-center">
        {/* Placeholder for logo */}
        <Image
          src="/images/logo.png"
          alt="Логотип зоомагазина"
          width={160}
          height={57}
          className="mr-4"
        />
        <nav className="flex space-x-6">
          <Link href="/" className="hover:text-blue-800">Главная</Link>
          <Link href="/about" className="hover:text-blue-800">О нас</Link>
          <Link href="/stores" className="hover:text-blue-800">Наши магазины</Link>
        </nav>
      </div>
      <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-800"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}