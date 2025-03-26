import { Navigate, Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { LoadingContext } from '../App';
import { Loader } from 'lucide-react';

export default function AdminRoute() {
  const { user, isLoading } = useAuth();
  const { setIsLoading } = useContext(LoadingContext);
  
  useEffect(() => {
    setIsLoading(isLoading);
    return () => setIsLoading(false);
  }, [isLoading, setIsLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader className="animate-spin text-orange-600" size={36} />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
} 