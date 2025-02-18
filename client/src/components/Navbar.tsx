import { Button, Image, Text } from "@chakra-ui/react";
import easylearnLogo from "../assets/easylearn logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    toast.success(`${user?.name} has successfully logged out`);
  };

  return (
    <div style={{ padding: "12px" }} className="shadow w-screen">
      <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-around">
        <Link to={`/`}>
          <Image
            className="w-22 h-20 overflow-auto items-center justify-center sm:hidden"
            src={easylearnLogo}
            alt="Logo"
          />
        </Link>

        <div style={{ fontWeight: "bold", fontSize: "20px" }}>
          {user ? `Welcome, ${user.name}!` : ""}
        </div>

        <div className="flex gap-4 max-sm:text-xs items-center">
          {isAuthenticated ? (
            <>
              <Text fontSize="lg" fontWeight="bold">
                {user?.role === "Admin" && (
                  <Button
                    colorScheme="blue"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    Admin Dashboard
                  </Button>
                )}
              </Text>
              <Button colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/register")}
                sm={{ color: "blue.500 " }}
                variant="solid"
              >
                Register
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="md:text-amber-300"
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
