import { Box, Button, Heading, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchCourses, deleteCourse } from "@/redux/slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

const AdminCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { courses, loading } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse(id));
    }
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Manage Courses
      </Heading>

      <Heading size="lg" mb={4}>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="cursor-pointer"
        >
          <FaLongArrowAltLeft size={24} />
        </button>
      </Heading>
      <Button
        style={{
          padding: "10px 15px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
        onClick={() => navigate("/admin/courses/new")}
      >
        Add New Course
      </Button>

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
                <th style={tableHeaderStyle}>Title</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.courseId}
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <td style={tableCellStyle}>{course.title}</td>
                  <td style={tableCellStyle}>{course.description}</td>
                  <td style={tableCellStyle}>
                    <button
                      style={editButtonStyle}
                      onClick={() =>
                        navigate(`/admin/courses/edit/${course.courseId}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDelete(course.courseId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

const editButtonStyle: React.CSSProperties = {
  padding: "5px 10px",
  backgroundColor: "#FFC107",
  color: "#000",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "8px",
};

const deleteButtonStyle: React.CSSProperties = {
  padding: "5px 10px",
  backgroundColor: "#DC3545",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AdminCourses;
