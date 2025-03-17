import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { Loader } from 'lucide-react';
import { useState, useEffect } from 'react';

// Local placeholder image instead of via.placeholder.com
const placeholderImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b3ff4cca%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b3ff4cca%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22110.5%22%20y%3D%22157.1%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
const errorImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b3ff4cca%20text%20%7B%20fill%3A%23FF5555%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b3ff4cca%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23FFEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22110.5%22%20y%3D%22157.1%22%3EError%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

const categories = [
  {
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
    href: '/shop?category=men',
  },
  {
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    href: '/shop?category=women',
  },
  {
    name: 'Kids',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7',
    href: '/shop?category=kids',
  },
];

export default function Home() {
  const { products, isLoading } = useProducts();
  const [pageLoading, setPageLoading] = useState(true);
  
  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  const featuredProducts = products?.slice(0, 4) || [];

  if (pageLoading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader className="animate-spin text-orange-600 mb-4" size={48} />
        <p className="text-gray-600 text-lg">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Welcome to Khattak Store
            </h1>
            <p className="mt-6 max-w-md mx-auto text-xl text-white">
              Discover the latest fashion trends for everyone in your family.
            </p>
            <div className="mt-10">
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-orange-600 bg-white hover:bg-gray-50 shadow-md"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Shop by Category</h2>
        <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative w-full h-80 rounded-lg overflow-hidden bg-gray-200 group-hover:opacity-90 transition-opacity">
                <img
                  src={category.image || placeholderImage}
                  alt={category.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = errorImage;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link
                    to={category.href}
                    className="text-center px-4 py-2 border border-transparent text-lg font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 shadow-sm"
                  >
                    {category.name}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative w-full h-72 rounded-lg overflow-hidden bg-gray-200">
                  <img
                    src={product.imageUrl || product.image || placeholderImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = errorImage;
                    }}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      <Link to={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${parseFloat(product.price).toFixed(2)}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-gray-500">No featured products available at the moment.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 shadow-md"
          >
            View All Products
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {[
              {
                title: 'Free Shipping',
                description: 'Free shipping on orders over $100',
                icon: '🚚',
              },
              {
                title: 'Secure Payment',
                description: 'Safe & secure payment methods',
                icon: '🔒',
              },
              {
                title: '24/7 Support',
                description: 'Contact us 24 hours a day',
                icon: '💬',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 