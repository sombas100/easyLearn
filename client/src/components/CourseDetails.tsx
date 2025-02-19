import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourseById } from "@/redux/slices/courseSlice";
import { fetchLessons } from "@/redux/slices/lessonSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCourseById(id));
    dispatch(fetchLessons(Number(id)));
  }, [id, dispatch]);

  const course = courses.find((c) => c.courseId === Number(id));
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
        <Button disabled={isEnrolled} colorScheme="blue" mt={4}>
          {isEnrolled ? "Enrolled" : "Enroll in course"}
        </Button>
      )}

      <Button mt={4} ml={5} onClick={() => navigate("/")}>
        Return to homepage
      </Button>

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
                background: "#fff",
                border: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3 style={{ fontSize: "18px", margin: "0" }}>
                  {lesson.title}
                </h3>
              </div>
              <Button
                colorScheme="blue"
                onClick={() => navigate(`/lessons/${lesson.lessonId}`)}
              >
                View Lesson
              </Button>
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
