import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart as clearCartAction } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

export function useCart() {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const [cart, setCart] = useState([]);

  // Convert Redux cart items to local cart format
  useEffect(() => {
    setCart(items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.imageUrl
    })));
  }, [items]);

  // Calculate cart total
  const cartTotal = totalAmount || cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const addItem = (product, quantity = 1) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image || product.imageUrl,
      quantity
    }));
    toast.success('Added to cart');
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Removed from cart');
  };

  const updateItem = (productId, quantity) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  const getCartItem = (productId) => {
    return cart.find(item => item.id === productId);
  };

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  return {
    cart,
    cartTotal,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    getCartItem,
    isInCart
  };
} 