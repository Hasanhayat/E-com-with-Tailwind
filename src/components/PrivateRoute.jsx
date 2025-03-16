import { Navigate, Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoadingContext } from '../App';
import { Loader } from 'lucide-react';

export default function PrivateRoute() {
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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
} 