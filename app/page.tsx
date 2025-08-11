import Image from 'next/image';
import CategoryBar from './components/CategoryBar';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json() as Promise<Product[]>;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <CategoryBar />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-green-600">{product.price} руб.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
