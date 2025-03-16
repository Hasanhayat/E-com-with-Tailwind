import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useProducts } from '../hooks/useProducts';
import { updateFilters, clearFilters } from '../store/slices/productSlice';
import { Loader, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { addToCart } from '../store/slices/cartSlice';

// Placeholder image for fallback
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x300?text=No+Image';

// Memoized Product Card Component
const ProductCard = React.memo(({ product, onAddToCart, isLoading }) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <Link to={`/product/${product.id}`} className="block">
      <div className="relative aspect-w-1 aspect-h-1 bg-gray-200">
        <img
          className="w-full h-64 object-cover object-center transition-opacity duration-300"
          src={product.imageUrl || product.image || PLACEHOLDER_IMAGE}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_IMAGE;
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 capitalize">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-medium text-gray-900">${parseFloat(product.price).toFixed(2)}</p>
        </div>
      </div>
    </Link>
    <div className="px-4 pb-4">
      <button
        onClick={() => onAddToCart(product)}
        disabled={isLoading}
        className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader className="animate-spin" size={16} />
        ) : (
          <>
            <ShoppingCart size={16} />
            Add to Cart
          </>
        )}
      </button>
    </div>
  </motion.div>
));

// Memoized Filter Component
const Filters = React.memo(({ filters, categories, sortOptions, onFilterChange, onPriceChange, priceRange, onClearFilters }) => (
  <div className="bg-white p-4 rounded-lg shadow-md mb-8 sticky top-0 z-10">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
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
            onChange={(e) => onPriceChange([parseInt(e.target.value), priceRange[1]])}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
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
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
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
      onClick={onClearFilters}
      className="mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium"
    >
      Clear Filters
    </button>
  </div>
));

export default function Shop() {
  const dispatch = useDispatch();
  const { products, isLoading } = useProducts();
  const filters = useSelector((state) => state.products.filters);
  const [priceRange, setPriceRange] = useState(filters.priceRange);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['all', 'men', 'women', 'kids'];
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  // Memoized handlers
  const handleFilterChange = useCallback((type, value) => {
    dispatch(updateFilters({ [type]: value }));
  }, [dispatch]);

  const handlePriceChange = useCallback((value) => {
    setPriceRange(value);
    dispatch(updateFilters({ priceRange: value }));
  }, [dispatch]);

  const handleAddToCart = useCallback((product) => {
    setLoadingProductId(product.id);
    
    // Simulate API call
    setTimeout(() => {
      try {
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`);
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add product to cart');
      } finally {
        setLoadingProductId(null);
      }
    }, 800);
  }, [dispatch]);

  // Memoized filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    return [...products]
      .filter((product) => {
        if (filters.category !== 'all' && product.category !== filters.category) return false;
        if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          default:
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
      });
  }, [products, filters]);

  // Show loading state if page is loading or products are loading
  if (pageLoading || isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center py-32">
          <Loader className="animate-spin text-orange-600 mb-4" size={48} />
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Filters
        filters={filters}
        categories={categories}
        sortOptions={sortOptions}
        onFilterChange={handleFilterChange}
        onPriceChange={handlePriceChange}
        priceRange={priceRange}
        onClearFilters={() => dispatch(clearFilters())}
      />

      <AnimatePresence>
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                isLoading={loadingProductId === product.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 