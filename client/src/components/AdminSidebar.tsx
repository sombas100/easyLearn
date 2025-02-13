import { Box, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { CiLogout } from "react-icons/ci";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box
      w="250px"
      h="100vh"
      bg="white"
      p={6}
      shadow="md"
      position="sticky"
      top="0"
    >
      <VStack gap={6} align="stretch">
        <Button w="full" onClick={() => navigate("/admin/dashboard")}>
          Dashboard
        </Button>
        <Button w="full" onClick={() => navigate("/admin/courses")}>
          Manage Courses
        </Button>
        <Button w="full" onClick={() => navigate("/admin/users")}>
          Manage Users
        </Button>
        <Button w="full" onClick={() => navigate("/")}>
          Home page
        </Button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "10px",
            backgroundColor: "#000000",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "550px",
            transition: "background 0.3s ease",
          }}
          onClick={handleLogout}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#DC3545")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#000000")
          }
        >
          Logout <CiLogout style={{ marginLeft: "7px" }} />
        </button>
      </VStack>
    </Box>
  );
};

export default AdminSidebar;
