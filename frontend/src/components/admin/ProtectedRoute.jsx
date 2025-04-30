import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();

  // If no token or user, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is specified and user role doesn't match, redirect to home or another page
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // If everything is fine, render the protected route
  return children;
};

export default ProtectedRoute;
