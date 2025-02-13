import { Box, Heading, Spinner, Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchEnrollments,
  updateEnrollmentProgress,
} from "@/redux/slices/enrollmentSlice";

const AdminEnrollments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { enrollments, loading } = useSelector(
    (state: RootState) => state.enrollments
  );

  const [progressUpdates, setProgressUpdates] = useState<{
    [courseId: number]: number;
  }>({});

  useEffect(() => {
    dispatch(fetchEnrollments());
  }, [dispatch]);

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

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Manage Enrollments
      </Heading>

      {loading && !enrollments ? (
        <>
          <Spinner />
          <p>No enrollments available</p>
        </>
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
                  <td style={tableCellStyle}>{enrollment.user.name}</td>
                  <td style={tableCellStyle}>{enrollment.course.title}</td>
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
                      size="sm"
                      colorScheme="blue"
                      ml={2}
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
