import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadToCloudinary } from '../utils/cloudinary';

export const useProducts = () => {
  const queryClient = useQueryClient();

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const addProduct = async ({ productData, image }) => {
    if (image) {
      const imageUrl = await uploadToCloudinary(image);
      productData.imageUrl = imageUrl;
    }
    
    const docRef = await addDoc(collection(db, 'products'), productData);
    return { id: docRef.id, ...productData };
  };

  const updateProduct = async ({ id, productData, image }) => {
    if (image) {
      const imageUrl = await uploadToCloudinary(image);
      productData.imageUrl = imageUrl;
    }
    
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, productData);
    return { id, ...productData };
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    return id;
  };

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  return {
    products,
    isLoading,
    error,
    addProduct: addProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    isAddingProduct: addProductMutation.isLoading,
    isUpdatingProduct: updateProductMutation.isLoading,
    isDeletingProduct: deleteProductMutation.isLoading,
  };
}; 