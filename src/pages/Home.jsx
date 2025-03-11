import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

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
  const featuredProducts = products?.slice(0, 4) || [];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Welcome to Khatak Store
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl text-gray-100 max-w-3xl"
          >
            Discover our latest collection of fashion and accessories.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10"
          >
            <Link
              to="/shop"
              className="inline-block bg-orange-600 py-3 px-8 rounded-md text-white font-medium hover:bg-orange-700 transition-colors"
            >
              Shop Now
            </Link>
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
              <div className="relative w-full h-80 rounded-lg overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <Link
                to={category.href}
                className="absolute inset-0 flex items-end p-6"
              >
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
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
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-block bg-orange-600 py-3 px-8 rounded-md text-white font-medium hover:bg-orange-700 transition-colors"
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