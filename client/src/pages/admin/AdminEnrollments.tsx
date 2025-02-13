import { Box, Heading, Spinner, Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchEnrollments,
  updateEnrollmentProgress,
} from "@/redux/slices/enrollmentSlice";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminEnrollments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { enrollments, loading } = useSelector(
    (state: RootState) => state.enrollments
  );

  const [progressUpdates, setProgressUpdates] = useState<{
    [courseId: number]: number;
  }>({});

  const handleProgressChange = (courseId: number, value: number) => {
    setProgressUpdates((prev) => ({ ...prev, [courseId]: value }));
  };

  const handleUpdateProgress = (courseId: number) => {
    if (progressUpdates[courseId] !== undefined) {
      dispatch(
        updateEnrollmentProgress({
          courseId,
          progress: progressUpdates[courseId],
        })
      );
    }
  };

  useEffect(() => {
    console.log("Dispatching fetchEnrollments...");
    dispatch(fetchEnrollments());
  }, [dispatch]);

  useEffect(() => {
    console.log(
      "✅ Updated Redux enrollments:",
      JSON.stringify(enrollments, null, 2)
    );
  }, [enrollments]);
  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Manage Enrollments
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
      ) : enrollments.length === 0 ? (
        <p>No enrollments found.</p>
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
                <th style={tableHeaderStyle}>User</th>
                <th style={tableHeaderStyle}>Course</th>
                <th style={tableHeaderStyle}>Progress</th>
                <th style={tableHeaderStyle}>Update Progress</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => (
                <tr
                  key={enrollment.enrollmentId}
                  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <td style={tableCellStyle}>
                    {enrollment.User?.name ?? "Unknown User"}
                  </td>
                  <td style={tableCellStyle}>
                    {enrollment.Course?.title ?? "Unknown Course"}
                  </td>
                  <td style={tableCellStyle}>{enrollment.progress}%</td>
                  <td style={tableCellStyle}>
                    <Input
                      type="number"
                      value={progressUpdates[enrollment.enrollmentId] || ""}
                      onChange={(e) =>
                        handleProgressChange(
                          enrollment.enrollmentId,
                          Number(e.target.value)
                        )
                      }
                      placeholder="Set Progress"
                      size="sm"
                    />
                    <Button
                      mt={2}
                      size="sm"
                      colorScheme="blue"
                      onClick={() =>
                        handleUpdateProgress(enrollment.enrollmentId)
                      }
                    >
                      Update
                    </Button>
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

export default AdminEnrollments;
