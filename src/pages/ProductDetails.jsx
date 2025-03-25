import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { addToCart } from '../store/slices/cartSlice';
import { Loader, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

// Local placeholder image instead of via.placeholder.com
const placeholderImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20600%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b3ff4cca%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A30pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b3ff4cca%22%3E%3Crect%20width%3D%22600%22%20height%3D%22600%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22220.5%22%20y%3D%22314.1%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
const errorImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22600%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20600%20600%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_189b3ff4cca%20text%20%7B%20fill%3A%23FF5555%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A30pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_189b3ff4cca%22%3E%3Crect%20width%3D%22600%22%20height%3D%22600%22%20fill%3D%22%23FFEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22220.5%22%20y%3D%22314.1%22%3EError%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, isLoading } = useProducts();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  
  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  const product = products?.find(p => p.id === id);

  const handleAddToCart = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`);
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add product to cart');
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  if (pageLoading || isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center py-32">
          <Loader className="animate-spin text-orange-600 mb-4" size={48} />
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden"
        >
          <img
            src={product.imageUrl || placeholderImage}
            alt={product.name}
            className="w-full h-full object-cover object-center rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = errorImage;
            }}
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0"
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">${parseFloat(product.price).toFixed(2)}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product.description || 'No description available for this product.'}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={loading}
              className="w-full bg-orange-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" size={20} />
                  Adding to Cart...
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </>
              )}
            </motion.button>
          </div>

          {/* Product Details */}
          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Details</h2>
            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">{product.details || 'No additional details available for this product.'}</p>
            </div>
          </div>

          {/* Size Guide */}
          {product.category !== 'accessories' && (
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Size Guide</h2>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <div
                    key={size}
                    className="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase hover:border-gray-400 focus:outline-none cursor-pointer"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}