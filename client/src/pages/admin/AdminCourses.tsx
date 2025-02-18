import {
  Box,
  Button,
  Heading,
  Input,
  Spinner,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchCourses,
  deleteCourse,
  updateCourse,
} from "@/redux/slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import CustomModal from "@/components/CustomModal";
import { ToastContainer, toast } from "react-toastify";

const AdminCourses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { courses, loading } = useSelector((state: RootState) => state.courses);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<{
    id: number;
    title: string;
    description: string;
    videoUrl: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse(id));
      toast("Course has been successfully deleted!");
    }
  };

  const handleEdit = (course: {
    courseId: number;
    title: string;
    description: string;
    videoUrl: string;
  }) => {
    setEditingCourse({
      id: course.courseId,
      title: course.title,
      description: course.description,
      videoUrl: course.videoUrl || "",
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (editingCourse) {
      await dispatch(
        updateCourse({ id: editingCourse.id, courseData: editingCourse })
      );
      setIsModalOpen(false);
      dispatch(fetchCourses());
      alert("Course updated successfully!");
    }
  };

  if (loading) return <Spinner />;

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

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                    onClick={() => handleEdit(course)}
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

      {/* Edit Course Modal */}
      <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Edit Course
        </h2>
        <VStack gap={4}>
          <Input
            placeholder="Course Title"
            value={editingCourse?.title || ""}
            onChange={(e) =>
              setEditingCourse((prev) =>
                prev ? { ...prev, title: e.target.value } : null
              )
            }
          />
          <Textarea
            placeholder="Course Description"
            value={editingCourse?.description || ""}
            onChange={(e) =>
              setEditingCourse((prev) =>
                prev ? { ...prev, description: e.target.value } : null
              )
            }
          />
          <Input
            placeholder="Video URL (optional)"
            value={editingCourse?.videoUrl || ""}
            onChange={(e) =>
              setEditingCourse((prev) =>
                prev ? { ...prev, videoUrl: e.target.value } : null
              )
            }
          />
          <Button colorScheme="blue" onClick={handleUpdate}>
            Update Course
          </Button>
        </VStack>
      </CustomModal>
      <ToastContainer />
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
