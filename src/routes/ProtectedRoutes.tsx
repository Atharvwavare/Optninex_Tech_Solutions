import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ⏳ While restoring user from localStorage, wait
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  // ❌ If NOT logged in → redirect to login
  // and SAVE the page user was trying to open
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // ✅ Logged in → allow access
  return children;
}
