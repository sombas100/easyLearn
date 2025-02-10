import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourseById } from "@/redux/slices/courseSlice";
import { fetchLessons } from "@/redux/slices/lessonSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Spinner } from "@chakra-ui/react";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

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

  if (courseLoading || lessonLoading) return <Spinner />;
  if (courseError) return <p>Error loading course: {courseError}</p>;
  if (lessonError) return <p>Error loading lessons: {lessonError}</p>;
  if (!course) return <p>No course found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        {course.title}
      </h1>
      <i>{course.description}</i>

      {course.videoUrl && (
        <div>
          <h3>Course Overview</h3>
          <video width="600" controls>
            <source src={course.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <h2>Lessons</h2>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.lessonId}>{lesson.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;
