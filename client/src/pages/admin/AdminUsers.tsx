import { Box, Heading, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchUsers, deleteUser } from "@/redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const AdminUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
      toast.success("User was successfully deleted");
    }
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Manage Users
      </Heading>

      <Heading size="lg" mb={4}>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="cursor-pointer"
        >
          <FaLongArrowAltLeft size={24} />
        </button>
      </Heading>

      {loading ? (
        <Spinner />
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Role</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.userId}
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <td style={tableCellStyle}>{user.name}</td>
                  <td style={tableCellStyle}>{user.email}</td>
                  <td style={tableCellStyle}>{user.role}</td>
                  <td style={tableCellStyle}>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDelete(user.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      )}
    </Box>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "2px solid #ddd",
};

const tableCellStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const deleteButtonStyle: React.CSSProperties = {
  padding: "5px 10px",
  backgroundColor: "#DC3545",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AdminUsers;
