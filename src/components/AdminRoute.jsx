import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { user, isAdmin } = useSelector((state) => state.auth);

  return user && isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute; 