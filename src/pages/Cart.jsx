import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { removeFromCart, clearCart } from '../store/slices/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Your cart is empty</h2>
        <p className="mt-4 text-gray-500">Add some products to your cart to continue shopping</p>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-orange-600 px-8 py-3 rounded-md text-white font-medium hover:bg-orange-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
      <div className="mt-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex py-6 border-b border-gray-200"
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">${item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {item.quantity}</p>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="font-medium text-orange-600 hover:text-orange-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="mt-6">
              <button
                onClick={handleClearCart}
                className="text-sm font-medium text-orange-600 hover:text-orange-500"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">${totalAmount}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium text-gray-900">Free</p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <p className="text-base font-medium text-gray-900">Order total</p>
                <p className="text-base font-medium text-gray-900">${totalAmount}</p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/checkout"
                className="w-full bg-orange-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-orange-700"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 