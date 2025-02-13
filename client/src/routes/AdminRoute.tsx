import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AdminRoute = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  return isAuthenticated && user?.role === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace />
  );
};

export default AdminRoute;
