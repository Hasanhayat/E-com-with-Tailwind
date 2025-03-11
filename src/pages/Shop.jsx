import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useProducts } from '../hooks/useProducts';
import { updateFilters, clearFilters } from '../store/slices/productSlice';

export default function Shop() {
  const dispatch = useDispatch();
  const { products, isLoading } = useProducts();
  const filters = useSelector((state) => state.products.filters);
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  const categories = ['all', 'men', 'women', 'kids'];
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  const handleFilterChange = (type, value) => {
    dispatch(updateFilters({ [type]: value }));
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    dispatch(updateFilters({ priceRange: value }));
  };

  const filteredProducts = products?.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    return true;
  }) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="flex gap-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange([parseInt(e.target.value), priceRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => dispatch(clearFilters())}
          className="mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium"
        >
          Clear Filters
        </button>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-900">${product.price}</p>
                  <button
                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                    onClick={() => {/* Add to cart logic */}}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
} 