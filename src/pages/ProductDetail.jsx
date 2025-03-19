import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useProducts } from '../hooks/useProducts';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  RefreshCw, 
  Shield, 
  Star,
  ChevronRight,
  Minus,
  Plus,
  Loader
} from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { themeColors } = useTheme();
  const { products, getProductById, isLoading } = useProducts();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = getProductById(parseInt(id)) || products.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Set default selected color
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
        
        // Find related products (same category)
        const related = products
          .filter(p => p.id !== foundProduct.id && p.category === foundProduct.category)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        // Product not found
        console.error(`Product with ID ${id} not found`);
      }
    }
  }, [id, products, getProductById]);

  const handleAddToCart = () => {
    // Add to cart functionality would go here
    console.log('Added to cart:', { ...product, quantity, size: selectedSize, color: selectedColor });
    
    // Show success message
    alert(`Added ${quantity} ${product.name} to cart`);
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  // Available sizes
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  // Available colors (would typically come from the product data)
  const colors = ['#000000', '#3498db', '#e74c3c', '#2ecc71', '#f39c12'];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-12 h-12 animate-spin" style={{ color: themeColors.primaryColor }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4" style={{ color: themeColors.textPrimaryColor }}>Product Not Found</h2>
        <p className="mb-8" style={{ color: themeColors.textSecondaryColor }}>The product you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/shop')}
          className="px-6 py-2 rounded"
          style={{ backgroundColor: themeColors.primaryColor, color: '#ffffff' }}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 mb-8">
        <button 
          onClick={() => navigate('/')}
          className="text-sm hover:underline"
          style={{ color: themeColors.textSecondaryColor }}
        >
          Home
        </button>
        <ChevronRight className="w-4 h-4" style={{ color: themeColors.textSecondaryColor }} />
        <button 
          onClick={() => navigate('/shop')}
          className="text-sm hover:underline"
          style={{ color: themeColors.textSecondaryColor }}
        >
          Shop
        </button>
        <ChevronRight className="w-4 h-4" style={{ color: themeColors.textSecondaryColor }} />
        <button 
          onClick={() => navigate(`/shop?category=${product.category}`)}
          className="text-sm hover:underline"
          style={{ color: themeColors.textSecondaryColor }}
        >
          {product.category}
        </button>
        <ChevronRight className="w-4 h-4" style={{ color: themeColors.textSecondaryColor }} />
        <span className="text-sm font-medium" style={{ color: themeColors.textPrimaryColor }}>
          {product.name}
        </span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden"
          style={{ backgroundColor: themeColors.cardColor }}
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
            }}
          />
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: themeColors.textPrimaryColor }}>
              {product.name}
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`w-5 h-5 ${star <= (product.rating || 4.5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span style={{ color: themeColors.textSecondaryColor }}>
                {product.rating || 4.5} ({product.sold || 45} reviews)
              </span>
            </div>
            <p className="text-2xl font-bold mb-4" style={{ color: themeColors.primaryColor }}>
              ${product.price}
            </p>
            <p className="mb-6" style={{ color: themeColors.textSecondaryColor }}>
              {product.description}
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: themeColors.textPrimaryColor }}>
              COLOR
            </h3>
            <div className="flex space-x-3">
              {(product.colors || colors).map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full transition-all ${
                    selectedColor === color ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{ 
                    backgroundColor: color,
                    ringColor: themeColors.primaryColor
                  }}
                  aria-label={`Color: ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium" style={{ color: themeColors.textPrimaryColor }}>
                SIZE
              </h3>
              <button 
                className="text-sm underline" 
                style={{ color: themeColors.primaryColor }}
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex items-center justify-center w-10 h-10 rounded-md border transition-all ${
                    selectedSize === size 
                      ? 'border-2 font-medium' 
                      : 'border border-gray-300'
                  }`}
                  style={{ 
                    borderColor: selectedSize === size ? themeColors.primaryColor : '',
                    color: selectedSize === size ? themeColors.primaryColor : themeColors.textSecondaryColor,
                    backgroundColor: themeColors.cardColor
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium mb-3" style={{ color: themeColors.textPrimaryColor }}>
              QUANTITY
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 rounded-l-md border border-r-0"
                  style={{ 
                    borderColor: 'rgba(0,0,0,0.1)', 
                    backgroundColor: themeColors.cardColor,
                    color: themeColors.textPrimaryColor
                  }}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock || 10}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 1 && val <= (product.stock || 10)) {
                      setQuantity(val);
                    }
                  }}
                  className="w-16 text-center border-t border-b"
                  style={{ 
                    borderColor: 'rgba(0,0,0,0.1)', 
                    backgroundColor: themeColors.cardColor,
                    color: themeColors.textPrimaryColor
                  }}
                />
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 rounded-r-md border border-l-0"
                  style={{ 
                    borderColor: 'rgba(0,0,0,0.1)', 
                    backgroundColor: themeColors.cardColor,
                    color: themeColors.textPrimaryColor
                  }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm" style={{ color: themeColors.textSecondaryColor }}>
                {product.stock || 10} items available
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-8 rounded transition-colors"
              style={{ backgroundColor: themeColors.primaryColor, color: '#ffffff' }}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              className="flex items-center justify-center gap-2 py-3 px-4 rounded border transition-colors"
              style={{ 
                borderColor: themeColors.primaryColor, 
                color: themeColors.primaryColor,
                backgroundColor: 'transparent'
              }}
            >
              <Heart className="w-5 h-5" />
              Wishlist
            </button>
            <button
              className="flex items-center justify-center gap-2 py-3 px-4 rounded border transition-colors"
              style={{ 
                borderColor: 'rgba(0,0,0,0.1)', 
                color: themeColors.textSecondaryColor,
                backgroundColor: 'transparent'
              }}
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          {/* Product Highlights */}
          <div className="pt-6 space-y-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5" style={{ color: themeColors.primaryColor }} />
              <span style={{ color: themeColors.textSecondaryColor }}>
                Free shipping for orders over $100
              </span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5" style={{ color: themeColors.primaryColor }} />
              <span style={{ color: themeColors.textSecondaryColor }}>
                30-day return policy
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5" style={{ color: themeColors.primaryColor }} />
              <span style={{ color: themeColors.textSecondaryColor }}>
                2-year warranty
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: themeColors.textPrimaryColor }}>
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <div 
                  className="relative overflow-hidden rounded-lg aspect-square mb-4"
                  style={{ backgroundColor: themeColors.cardColor }}
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: themeColors.textPrimaryColor }}>
                  {relatedProduct.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold" style={{ color: themeColors.primaryColor }}>
                    ${relatedProduct.price}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm" style={{ color: themeColors.textSecondaryColor }}>
                      {relatedProduct.rating || '4.5'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 