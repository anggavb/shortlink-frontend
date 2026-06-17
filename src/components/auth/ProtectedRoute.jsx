import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthSession,
  selectIsAuthenticated,
} from "@/redux/auth/authSlice";
import { notify } from "@/utils/toast";

function ProtectedRoute({ guestOnly = false }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (guestOnly && isAuthenticated) {
      notify.info("Anda sudah login.");
      return;
    }

    if (!guestOnly && !isAuthenticated) {
      dispatch(clearAuthSession());
    }
  }, [dispatch, guestOnly, isAuthenticated]);

  if (guestOnly && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  if (guestOnly) {
    return <Outlet />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
