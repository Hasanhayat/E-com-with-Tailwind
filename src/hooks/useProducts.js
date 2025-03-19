import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample product images from Unsplash
        const productImages = [
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1588117305388-c2631a279f82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1568251847923-14b9039bb92c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
        ];
        
        // Sample products data
        const mockProducts = [
          {
            id: 1,
            name: 'Classic T-Shirt',
            description: 'Comfortable cotton T-shirt for everyday wear',
            price: 29.99,
            image: productImages[0],
            category: 'Men',
            stock: 50,
            featured: true,
            rating: 4.5,
            sold: 120,
            createdAt: '2023-01-15'
          },
          {
            id: 2,
            name: 'Denim Jeans',
            description: 'High-quality denim jeans with perfect fit',
            price: 59.99,
            image: productImages[1],
            category: 'Men',
            stock: 35,
            featured: true,
            rating: 4.7,
            sold: 98,
            createdAt: '2023-02-10'
          },
          {
            id: 3,
            name: 'Leather Jacket',
            description: 'Premium leather jacket for a stylish look',
            price: 199.99,
            image: productImages[2],
            category: 'Men',
            stock: 15,
            featured: false,
            rating: 4.8,
            sold: 45,
            createdAt: '2023-03-05'
          },
          {
            id: 4,
            name: 'Summer Dress',
            description: 'Light and breezy summer dress for hot days',
            price: 49.99,
            image: productImages[3],
            category: 'Women',
            stock: 40,
            featured: true,
            rating: 4.6,
            sold: 78,
            createdAt: '2023-04-01'
          },
          {
            id: 5,
            name: 'Running Shoes',
            description: 'Comfortable running shoes with great support',
            price: 79.99,
            image: productImages[4],
            category: 'Footwear',
            stock: 25,
            featured: false,
            rating: 4.4,
            sold: 65,
            createdAt: '2023-02-22'
          },
          {
            id: 6,
            name: 'Winter Coat',
            description: 'Warm winter coat perfect for cold weather',
            price: 129.99,
            image: productImages[5],
            category: 'Women',
            stock: 20,
            featured: false,
            rating: 4.3,
            sold: 42,
            createdAt: '2022-11-15'
          },
          {
            id: 7,
            name: 'Designer Handbag',
            description: 'Elegant designer handbag for any occasion',
            price: 149.99,
            image: productImages[6],
            category: 'Accessories',
            stock: 15,
            featured: true,
            rating: 4.9,
            sold: 53,
            createdAt: '2023-03-20'
          },
          {
            id: 8,
            name: 'Kids Pajamas',
            description: 'Comfortable cotton pajamas for children',
            price: 24.99,
            image: productImages[7],
            category: 'Kids',
            stock: 45,
            featured: false,
            rating: 4.5,
            sold: 37,
            createdAt: '2023-01-30'
          },
          {
            id: 9,
            name: 'Casual Hoodie',
            description: 'Soft and warm hoodie for casual days',
            price: 39.99,
            image: productImages[8],
            category: 'Men',
            stock: 60,
            featured: false,
            rating: 4.2,
            sold: 85,
            createdAt: '2023-04-05'
          },
          {
            id: 10,
            name: 'Sunglasses',
            description: 'Stylish sunglasses with UV protection',
            price: 29.99,
            image: productImages[9],
            category: 'Accessories',
            stock: 30,
            featured: false,
            rating: 4.6,
            sold: 48,
            createdAt: '2023-03-15'
          }
        ];
        
        setProducts(mockProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products data.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Add a product
  const addProduct = async (product) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newProduct = {
        id: products.length + 1,
        ...product,
        createdAt: new Date().toISOString().split('T')[0],
        sold: 0,
        rating: 0
      };
      
      setProducts([...products, newProduct]);
      return newProduct;
    } catch (err) {
      setError('Failed to add product.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update a product
  const updateProduct = async (id, updatedData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedProducts = products.map(product => 
        product.id === id ? { ...product, ...updatedData } : product
      );
      
      setProducts(updatedProducts);
      return updatedProducts.find(product => product.id === id);
    } catch (err) {
      setError('Failed to update product.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete a product
  const deleteProduct = async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      return true;
    } catch (err) {
      setError('Failed to delete product.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get product by ID
  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id) || product.id === id);
  };
  
  // Filter products by category
  const filterByCategory = (category) => {
    if (!category || category === 'all') return products;
    return products.filter(product => product.category === category);
  };
  
  // Search products
  const searchProducts = (query) => {
    if (!query) return products;
    
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  };
  
  // Get featured products
  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };
  
  return { 
    products, 
    isLoading, 
    error, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    getProductById, 
    filterByCategory,
    searchProducts,
    getFeaturedProducts
  };
}
