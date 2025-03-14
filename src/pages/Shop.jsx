import React from 'react';
import { Loader } from 'lucide-react';

export default function Shop() {
  const isLoading = false; // Simulate loading state

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Shop</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin text-orange-600" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">All Products</h2>
            <p>Explore our wide range of products.</p>
            <div className="mt-4">
              <p>Product 1</p>
              <p>Product 2</p>
              <p>Product 3</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Men's Collection</h2>
            <p>Discover the latest trends in men's fashion.</p>
            <div className="mt-4">
              <p>Men's Product 1</p>
              <p>Men's Product 2</p>
              <p>Men's Product 3</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Women's Collection</h2>
            <p>Find stylish and trendy women's clothing.</p>
            <div className="mt-4">
              <p>Women's Product 1</p>
              <p>Women's Product 2</p>
              <p>Women's Product 3</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Kid's Collection</h2>
            <p>Shop for the best in children's fashion.</p>
            <div className="mt-4">
              <p>Kid's Product 1</p>
              <p>Kid's Product 2</p>
              <p>Kid's Product 3</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 