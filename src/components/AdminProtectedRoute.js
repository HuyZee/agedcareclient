import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // User is not authenticated
    return <Navigate to="/" />;
  }

  // Check if the user belongs to Admin model
  if (user.admin_id !== undefined) {
    // User is admin, allow access
    return children;
  }

  // Redirect user to unauthorized page or home page
  return <Navigate to="/unauthorized" />;
};