import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useProducts } from '../hooks/useProducts';
import { updateFilters, clearFilters, fetchProducts } from '../store/slices/productSlice';
import { Loader, ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { addToCart } from '../store/slices/cartSlice';

// Local placeholder image instead of via.placeholder.com
const placeholderImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b3ff4cca%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b3ff4cca%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22110.5%22%20y%3D%22157.1%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
const errorImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b3ff4cca%20text%20%7B%20fill%3A%23FF5555%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b3ff4cca%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23FFEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22110.5%22%20y%3D%22157.1%22%3EError%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

// Memoized Product Card Component
const ProductCard = React.memo(({ product, onAddToCart, isLoading }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate random rating between 3.5 and 5.0
  const rating = useMemo(() => (Math.random() * 1.5 + 3.5).toFixed(1), []);
  
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative overflow-hidden bg-gray-100">
            <img
              className="w-full h-64 object-cover object-center transition-transform duration-500 ease-in-out"
              style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
              src={product.imageUrl || product.image || placeholderImage}
              alt={product.name}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = errorImage;
              }}
            />
            
            {/* Discount badge if applicable */}
            {product.discount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                {product.discount}% OFF
              </div>
            )}
            
            {/* Quick action buttons */}
            <div 
              className={`absolute right-2 top-2 flex flex-col gap-2 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <button 
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  toast.success('Added to wishlist!');
                }}
              >
                <Heart size={18} className="text-gray-600" />
              </button>
              <button 
                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/product/${product.id}`;
                }}
              >
                <Eye size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </Link>
        
        <div className="p-4">
          <div className="flex items-center mb-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({rating})</span>
          </div>
          
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors truncate">{product.name}</h3>
          </Link>
          
          <p className="mt-1 text-sm text-gray-500 capitalize">{product.category}</p>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-lg font-bold text-gray-900">PKR {parseFloat(product.price).toFixed(2)}</p>
              {product.oldPrice && (
                <p className="ml-2 text-sm text-gray-500 line-through">PKR {parseFloat(product.oldPrice).toFixed(2)}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <>
              <ShoppingCart size={18} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
});

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

  useEffect(() => {
    dispatch(fetchProducts()); // Ensure products are fetched on mount
  }, [dispatch]);

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