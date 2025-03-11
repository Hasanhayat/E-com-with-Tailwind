import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/config';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const snapshot = await getDocs(productsCollection);
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const addProduct = async ({ productData, image }) => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }
      
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        imageUrl,
        createdAt: new Date().toISOString(),
      });

      const newProduct = {
        id: docRef.id,
        ...productData,
        imageUrl,
        createdAt: new Date().toISOString(),
      };

      setProducts([...products, newProduct]);
      return newProduct;
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const updateProduct = async ({ id, productData, image }) => {
    try {
      const productRef = doc(db, 'products', id);
      let imageUrl = productData.imageUrl;

      if (image) {
        // If there's an existing image, delete it
        if (imageUrl) {
          const oldImageRef = ref(storage, imageUrl);
          try {
            await deleteObject(oldImageRef);
          } catch (err) {
            console.error('Error deleting old image:', err);
          }
        }
        imageUrl = await uploadImage(image);
      }

      const updatedData = {
        ...productData,
        imageUrl,
        updatedAt: new Date().toISOString(),
      };

      await updateDoc(productRef, updatedData);

      setProducts(products.map(product =>
        product.id === id ? { ...product, ...updatedData } : product
      ));
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const product = products.find(p => p.id === id);
      if (product?.imageUrl) {
        const imageRef = ref(storage, product.imageUrl);
        try {
          await deleteObject(imageRef);
        } catch (err) {
          console.error('Error deleting product image:', err);
        }
      }

      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  return {
    products,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  };
} 