import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { ShoppingBag, Truck, ArrowRight, Star, Users, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Hero section images from internet
const heroImages = [
  "https://images.unsplash.com/photo-1612619548304-fd96374f4dfd?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556741533-411cf82e4e2d?q=80&w=1000&auto=format&fit=crop",
];

// Featured products images from internet
const featuredProducts = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Leather Wallet',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop',
    rating: 4.3,
  },
];

// Collection images from internet
const collections = [
  {
    id: 1,
    name: 'Summer Collection',
    description: 'Discover our new summer styles',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    link: '/shop?collection=summer',
  },
  {
    id: 2,
    name: 'Winter Essentials',
    description: 'Stay warm with our winter collection',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop',
    link: '/shop?collection=winter',
  },
];

// Testimonial images from internet
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Regular Customer',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'The quality of the products is exceptional. I\'ve been a loyal customer for years and have never been disappointed.',
  },
  {
    id: 2,
    name: 'Mike Thompson',
    role: 'New Customer',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'Fast shipping and excellent customer service. Will definitely shop here again!',
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Fashion Blogger',
    image: 'https://randomuser.me/api/portraits/women/67.jpg',
    text: 'I love the unique styles they offer. Always on trend and great quality for the price.',
  },
];

export default function Home() {
  const { themeColors } = useTheme();
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const collectionsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const benefitsRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      '.hero-content > *',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      }
    );

    // Featured products animation
    gsap.fromTo(
      '.product-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 80%',
        },
      }
    );

    // Collections animation
    gsap.fromTo(
      '.collection-item',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: collectionsRef.current,
          start: 'top 75%',
        },
      }
    );

    // Testimonials animation
    gsap.fromTo(
      '.testimonial-card',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.7,
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 70%',
        },
      }
    );

    // Benefits animation
    gsap.fromTo(
      '.benefit-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div style={{ backgroundColor: themeColors.bgColor, color: themeColors.textPrimaryColor }}>
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden" 
        style={{ minHeight: '85vh' }}
        ref={heroRef}
      >
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full overflow-hidden">
            {heroImages.map((image, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.7)',
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-32 sm:px-6 lg:px-8 flex items-center min-h-[85vh]">
          <div className="hero-content max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
              Discover Your Perfect Style
            </h1>
            <p className="text-xl text-white opacity-90 mb-8">
              Explore our latest collection and find the perfect addition to your wardrobe.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/shop"
                  className="px-8 py-3 text-base font-medium rounded-md text-white shadow-sm flex items-center gap-2"
                  style={{ backgroundColor: themeColors.primaryColor }}
                >
                  Shop Now
                  <ShoppingBag size={18} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="px-8 py-3 text-base font-medium rounded-md bg-white text-gray-900 shadow-sm flex items-center gap-2"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section 
        className="py-16 sm:py-24"
        ref={featuredRef}
        style={{ backgroundColor: themeColors.bgSecondaryColor }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: themeColors.textPrimaryColor }}>
              Featured Products
            </h2>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: themeColors.textSecondaryColor }}>
              Discover our most popular and trending items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="product-card bg-white rounded-lg overflow-hidden shadow-lg"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-5" style={{ backgroundColor: themeColors.cardBgColor }}>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: themeColors.textPrimaryColor }}>
                      {product.name}
                    </h3>
                    <p className="text-xl font-bold" style={{ color: themeColors.primaryColor }}>
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      className="mt-4 w-full py-2 text-sm font-medium rounded flex items-center justify-center gap-2 transition-colors"
                      style={{ 
                        backgroundColor: themeColors.primaryColor,
                        color: 'white',
                      }}
                    >
                      <ShoppingBag size={16} />
                      Add to Cart
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white"
                style={{ backgroundColor: themeColors.primaryColor }}
              >
                View All Products
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section 
        className="py-16"
        ref={collectionsRef}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: themeColors.textPrimaryColor }}>
              Our Collections
            </h2>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: themeColors.textSecondaryColor }}>
              Explore our carefully curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <motion.div
                key={collection.id}
                className="collection-item relative rounded-xl overflow-hidden shadow-lg group h-96"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-white/90 mb-4">
                    {collection.description}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Link
                      to={collection.link}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 transition-colors hover:bg-white/20"
                    >
                      Explore Collection
                      <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        className="py-16"
        ref={benefitsRef}
        style={{ backgroundColor: themeColors.bgSecondaryColor }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: themeColors.textPrimaryColor }}>
              Why Shop With Us
            </h2>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: themeColors.textSecondaryColor }}>
              We pride ourselves on providing the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="benefit-item text-center p-6 rounded-lg" style={{ backgroundColor: themeColors.cardBgColor }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: `${themeColors.primaryColor}20` }}>
                <Truck size={24} style={{ color: themeColors.primaryColor }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: themeColors.textPrimaryColor }}>Free Shipping</h3>
              <p style={{ color: themeColors.textSecondaryColor }}>
                Free shipping on all orders over $50. We deliver to your doorstep anywhere in the country.
              </p>
            </div>

            <div className="benefit-item text-center p-6 rounded-lg" style={{ backgroundColor: themeColors.cardBgColor }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: `${themeColors.primaryColor}20` }}>
                <Shield size={24} style={{ color: themeColors.primaryColor }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: themeColors.textPrimaryColor }}>Secure Payments</h3>
              <p style={{ color: themeColors.textSecondaryColor }}>
                Your payment information is always safe with our secure payment system.
              </p>
            </div>

            <div className="benefit-item text-center p-6 rounded-lg" style={{ backgroundColor: themeColors.cardBgColor }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: `${themeColors.primaryColor}20` }}>
                <Users size={24} style={{ color: themeColors.primaryColor }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: themeColors.textPrimaryColor }}>Customer Support</h3>
              <p style={{ color: themeColors.textSecondaryColor }}>
                Our friendly customer support team is available 24/7 to help you with any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        className="py-16"
        ref={testimonialsRef}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: themeColors.textPrimaryColor }}>
              What Our Customers Say
            </h2>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: themeColors.textSecondaryColor }}>
              Don't just take our word for it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card p-6 rounded-lg shadow-lg"
                style={{ backgroundColor: themeColors.cardBgColor }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold" style={{ color: themeColors.textPrimaryColor }}>{testimonial.name}</h4>
                    <p className="text-sm" style={{ color: themeColors.textSecondaryColor }}>{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic" style={{ color: themeColors.textSecondaryColor }}>"{testimonial.text}"</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16" style={{ backgroundColor: themeColors.primaryColor }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers and discover our latest collections today.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-md font-medium shadow-lg"
            >
              Shop Now
              <ShoppingBag size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 