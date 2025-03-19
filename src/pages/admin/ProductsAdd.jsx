import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useProducts } from '../../hooks/useProducts';
import { 
  X, 
  Upload, 
  Check, 
  ChevronLeft,
  Loader
} from 'lucide-react';

export default function ProductsAdd() {
  const navigate = useNavigate();
  const { themeColors } = useTheme();
  const { addProduct, isLoading } = useProducts();

  // Sample categories for the form
  const categories = ['Men', 'Women', 'Kids', 'Accessories', 'Footwear'];

  // Product form state
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Men',
    stock: '',
    featured: false,
    image: ''
  });

  // Image preview
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setImageFile(file);
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // Update product state with the file path or URL
      setProduct({
        ...product,
        image: previewUrl
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!product.name || !product.description || !product.price || !product.stock) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    // If no image is provided, use a default placeholder
    if (!product.image) {
      setProduct({
        ...product,
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
      });
    }
    
    try {
      setIsSubmitting(true);
      
      // Add the product
      await addProduct(product);
      
      // Show success message
      setSuccessMessage('Product added successfully!');
      setErrorMessage('');
      
      // Reset form after a delay
      setTimeout(() => {
        setProduct({
          name: '',
          description: '',
          price: '',
          category: 'Men',
          stock: '',
          featured: false,
          image: ''
        });
        setImagePreview('');
        setImageFile(null);
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Failed to add product. Please try again.');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
            style={{ color: themeColors.textSecondaryColor }}
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold" style={{ color: themeColors.textPrimaryColor }}>
            Add New Product
          </h1>
        </div>
      </div>

      {/* Success and Error Messages */}
      {successMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded flex items-center"
          style={{ backgroundColor: 'rgba(0, 200, 0, 0.1)', color: 'green' }}
        >
          <Check size={20} className="mr-2" />
          {successMessage}
        </motion.div>
      )}

      {errorMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded flex items-center"
          style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', color: 'red' }}
        >
          <X size={20} className="mr-2" />
          {errorMessage}
        </motion.div>
      )}

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium mb-2"
                style={{ color: themeColors.textPrimaryColor }}
              >
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'rgba(0,0,0,0.1)', 
                  backgroundColor: themeColors.cardColor,
                  color: themeColors.textPrimaryColor,
                  focusRingColor: themeColors.primaryColor
                }}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label 
                htmlFor="description" 
                className="block text-sm font-medium mb-2"
                style={{ color: themeColors.textPrimaryColor }}
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'rgba(0,0,0,0.1)', 
                  backgroundColor: themeColors.cardColor,
                  color: themeColors.textPrimaryColor,
                  focusRingColor: themeColors.primaryColor
                }}
                placeholder="Enter product description"
                required
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="price" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: themeColors.textPrimaryColor }}
                >
                  Price (PKR) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'rgba(0,0,0,0.1)', 
                    backgroundColor: themeColors.cardColor,
                    color: themeColors.textPrimaryColor,
                    focusRingColor: themeColors.primaryColor
                  }}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div>
                <label 
                  htmlFor="stock" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: themeColors.textPrimaryColor }}
                >
                  Stock *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: 'rgba(0,0,0,0.1)', 
                    backgroundColor: themeColors.cardColor,
                    color: themeColors.textPrimaryColor,
                    focusRingColor: themeColors.primaryColor
                  }}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label 
                htmlFor="category" 
                className="block text-sm font-medium mb-2"
                style={{ color: themeColors.textPrimaryColor }}
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: 'rgba(0,0,0,0.1)', 
                  backgroundColor: themeColors.cardColor,
                  color: themeColors.textPrimaryColor,
                  focusRingColor: themeColors.primaryColor
                }}
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Featured */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={product.featured}
                onChange={handleChange}
                className="w-4 h-4 mr-2"
                style={{ 
                  accentColor: themeColors.primaryColor
                }}
              />
              <label 
                htmlFor="featured" 
                className="text-sm font-medium"
                style={{ color: themeColors.textPrimaryColor }}
              >
                Feature this product on homepage
              </label>
            </div>
          </div>

          {/* Right column - Image upload */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ color: themeColors.textPrimaryColor }}
            >
              Product Image
            </label>
            
            <div 
              className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-64 cursor-pointer relative overflow-hidden"
              style={{ 
                borderColor: imagePreview ? 'transparent' : 'rgba(0,0,0,0.1)',
                backgroundColor: themeColors.cardColor
              }}
              onClick={() => document.getElementById('image').click()}
            >
              {imagePreview ? (
                <>
                  <img 
                    src={imagePreview} 
                    alt="Product preview" 
                    className="w-full h-full object-contain"
                  />
                  <button 
                    type="button" 
                    className="absolute top-2 right-2 p-1 rounded-full bg-white shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview('');
                      setImageFile(null);
                      setProduct({ ...product, image: '' });
                    }}
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <Upload size={32} style={{ color: themeColors.primaryColor }} className="mb-2" />
                  <p className="text-sm text-center" style={{ color: themeColors.textSecondaryColor }}>
                    Click to upload product image<br/>
                    <span className="text-xs">
                      PNG, JPG, or GIF up to 5MB
                    </span>
                  </p>
                </>
              )}
              
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            
            <p className="text-xs mt-2" style={{ color: themeColors.textSecondaryColor }}>
              If no image is provided, a placeholder will be used.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-2 mr-4 rounded border"
            style={{ 
              borderColor: 'rgba(0,0,0,0.1)', 
              color: themeColors.textSecondaryColor
            }}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded flex items-center justify-center min-w-[120px]"
            style={{ 
              backgroundColor: themeColors.primaryColor, 
              color: '#ffffff'
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader size={20} className="animate-spin" />
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 