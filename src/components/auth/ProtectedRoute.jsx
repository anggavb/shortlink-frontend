import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthSession,
  selectIsAuthenticated,
} from "@/redux/auth/authSlice";

function ProtectedRoute() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearAuthSession());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
