import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { addToCart } from '../store/slices/cartSlice';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, isLoading } = useProducts();
  const product = products?.find(p => p.id === id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="aspect-w-1 aspect-h-1"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center rounded-lg"
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
            <p className="text-3xl text-gray-900">${product.price}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full bg-orange-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Add to Cart
            </motion.button>
          </div>

          {/* Product Details */}
          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Details</h2>
            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">{product.details}</p>
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
                    className="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase hover:border-gray-400 focus:outline-none"
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