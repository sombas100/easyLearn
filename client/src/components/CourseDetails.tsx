import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourseById } from "@/redux/slices/courseSlice";
import { fetchLessons } from "@/redux/slices/lessonSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { enrollInCourse } from "@/redux/slices/enrollmentSlice";
import { Button } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    courses,
    loading: courseLoading,
    error: courseError,
  } = useSelector((state: RootState) => state.courses);
  const {
    lessons,
    loading: lessonLoading,
    error: lessonError,
  } = useSelector((state: RootState) => state.lessons);

  const course = courses.length > 0 ? courses[0] : null;

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
      dispatch(fetchLessons(Number(id)));
    }
  }, [id, dispatch]);

  const handleEnroll = () => {
    if (id) {
      dispatch(enrollInCourse(Number(id)));
      setIsEnrolled(true);
      toast.success(`${user?.name} has successfully enrolled on this course`);
    }
  };

  if (courseLoading || lessonLoading) return <Spinner />;
  if (courseError) return <p>Error loading course: {courseError}</p>;
  if (lessonError) return <p>Error loading lessons: {lessonError}</p>;
  if (!course) return <p>No course found.</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        {course.title}
      </h1>
      <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
        {course.description}
      </p>

      {course.videoUrl && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Course Overview</h3>
          <video width="100%" controls>
            <source src={course.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {isAuthenticated && user?.role === "Learner" && (
        <Button
          disabled={isEnrolled}
          colorScheme="blue"
          mt={4}
          onClick={handleEnroll}
        >
          {isEnrolled ? "Enrolled" : "Enroll in course"}
        </Button>
      )}

      <h2
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginBottom: "10px",
          marginTop: "30px",
        }}
      >
        Lessons
      </h2>

      <div style={{ display: "grid", gap: "15px" }}>
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <div
              key={lesson.lessonId}
              style={{
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                background: "#ffffff",
                transition: "transform 0.2s ease-in-out",
                border: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div>
                <h3 style={{ fontSize: "18px", margin: "0" }}>
                  {lesson.title}
                </h3>
                <p
                  style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}
                >
                  {lesson.content.length > 80
                    ? lesson.content.substring(0, 80) + "..."
                    : lesson.content}
                </p>
              </div>
              <Link to={`/lessons/${lesson.lessonId}`}>
                <button
                  style={{
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0056b3")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#007BFF")
                  }
                >
                  View Lesson
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#777" }}>
            No lessons available.
          </p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CourseDetails;
