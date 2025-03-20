import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Star, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader,
  ShoppingCart,
  Heart,
  Search
} from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Local placeholder image instead of via.placeholder.com
const placeholderImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b3ff4cca%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b3ff4cca%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22110.5%22%20y%3D%22157.1%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
const errorImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22300%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20300%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b3ff4cca%20text%20%7B%20fill%3A%23FF5555%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A15pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b3ff4cca%22%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20fill%3D%22%23FFEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22110.5%22%20y%3D%22157.1%22%3EError%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

// Sample high-quality product images
const sampleImages = [
  {
    url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    name: 'Luxury Collection 2023',
    description: 'Discover premium quality fashion for all seasons'
  },
  {
    url: 'https://images.unsplash.com/photo-1519759563599-e383275c91e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    name: 'Summer Fashion Trends',
    description: 'Beat the heat with our stylish summer collection'
  },
  {
    url: 'https://images.unsplash.com/photo-1601924357840-6adaf9e1ea15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    name: 'Winter Essentials',
    description: 'Stay warm and stylish with our winter collection'
  },
  {
    url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    name: 'Exclusive Limited Edition',
    description: 'Shop our premium collection before it\'s gone'
  }
];

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
  const { store, themeColors } = useTheme();
  const { products, isLoading, getFeaturedProducts, getNewArrivals, getBestSellers } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const bestSellersRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    if (products.length > 0) {
      setFeaturedProducts(getFeaturedProducts());
      setNewArrivals(getNewArrivals());
      setBestSellers(getBestSellers());
    }
  }, [products]);

  // GSAP Animations
  useEffect(() => {
    // Hero Section Animation
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    // New Arrivals Animation
    gsap.from(newArrivalsRef.current.querySelectorAll('.product-card'), {
      scrollTrigger: {
        trigger: newArrivalsRef.current,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Best Sellers Animation
    gsap.from(bestSellersRef.current.querySelectorAll('.product-card'), {
      scrollTrigger: {
        trigger: bestSellersRef.current,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Features Animation
    gsap.from(featuresRef.current.querySelectorAll('.feature-card'), {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.6,
      ease: 'power2.out'
    });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  // Auto advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredProducts]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Loader className="w-12 h-12 animate-spin mb-4" style={{ color: themeColors.primaryColor }} />
        <p className="text-lg" style={{ color: themeColors.textPrimaryColor }}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Hero Section with Featured Products Carousel */}
      <section ref={heroRef} className="relative h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {featuredProducts[currentSlide] && (
              <div 
                className="relative h-full bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${featuredProducts[currentSlide].image})`,
                  backgroundColor: themeColors.cardColor 
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <motion.h1 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl md:text-6xl font-bold mb-4"
                    >
                      {featuredProducts[currentSlide].name}
                    </motion.h1>
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl md:text-2xl mb-8"
                    >
                      {featuredProducts[currentSlide].description}
                    </motion.p>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Link
                        to={`/product/${featuredProducts[currentSlide].id}`}
                        className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black hover:bg-gray-100 transition-colors"
                      >
                        Shop Now
                        <ArrowRight className="ml-2" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {featuredProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section ref={newArrivalsRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: themeColors.textPrimaryColor }}>
              New Arrivals
            </h2>
            <Link
              to="/shop"
              className="flex items-center text-sm hover:underline"
              style={{ color: themeColors.primaryColor }}
            >
              View All
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <Link to={`/product/${product.id}`}>
                  <div 
                    className="relative overflow-hidden rounded-lg aspect-square mb-4"
                    style={{ backgroundColor: themeColors.cardColor }}
                  >
                    <img
                      src={product.image || sampleImages[index % sampleImages.length].url}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = sampleImages[index % sampleImages.length].url;
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: themeColors.textPrimaryColor }}>
                    {product.name}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: themeColors.textSecondaryColor }}>
                    {product.description || "Premium quality product for your collection"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color: themeColors.primaryColor }}>
                      ${product.price}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm" style={{ color: themeColors.textSecondaryColor }}>
                        {product.rating || '4.5'}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section ref={bestSellersRef} className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: themeColors.textPrimaryColor }}>
              Best Sellers
            </h2>
            <Link
              to="/shop"
              className="flex items-center text-sm hover:underline"
              style={{ color: themeColors.primaryColor }}
            >
              View All
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <Link to={`/product/${product.id}`}>
                  <div 
                    className="relative overflow-hidden rounded-lg aspect-square mb-4"
                    style={{ backgroundColor: themeColors.cardColor }}
                  >
                    <img
                      src={product.image || sampleImages[(index + 2) % sampleImages.length].url}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = sampleImages[(index + 2) % sampleImages.length].url;
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: themeColors.textPrimaryColor }}>
                    {product.name}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: themeColors.textSecondaryColor }}>
                    {product.description || "Our customers' favorite choice"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color: themeColors.primaryColor }}>
                      ${product.price}
                    </span>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4" style={{ color: themeColors.primaryColor }} />
                      <span className="ml-1 text-sm" style={{ color: themeColors.textSecondaryColor }}>
                        {product.sold || Math.floor(Math.random() * 50) + 20} sold
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over ${store.shipping?.freeThreshold || 100}</p>
            </div>
            <div className="feature-card bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">{store.shipping?.standardDays || 3}-{store.shipping?.expressDays || 5} days delivery</p>
            </div>
            <div className="feature-card bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Guaranteed quality</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 