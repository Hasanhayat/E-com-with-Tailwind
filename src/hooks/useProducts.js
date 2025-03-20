import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from localStorage or API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new product
  const addProduct = async (productData) => {
    try {
      const newProduct = {
        id: Date.now().toString(),
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update product
  const updateProduct = async (id, productData) => {
    try {
      const updatedProducts = products.map(product =>
        product.id === id
          ? { ...product, ...productData, updatedAt: new Date().toISOString() }
          : product
      );
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return updatedProducts.find(product => product.id === id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    try {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Filter products
  const filterProducts = (filters) => {
    return products.filter(product => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '') return true;
        return product[key].toLowerCase().includes(value.toLowerCase());
      });
    });
  };

  // Search products
  const searchProducts = (query) => {
    if (!query) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Get featured products
  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  // Get new arrivals
  const getNewArrivals = () => {
    return [...products]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8);
  };

  // Get best sellers
  const getBestSellers = () => {
    return [...products]
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 8);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    filterProducts,
    searchProducts,
    getFeaturedProducts,
    getNewArrivals,
    getBestSellers,
    fetchProducts
  };
};
