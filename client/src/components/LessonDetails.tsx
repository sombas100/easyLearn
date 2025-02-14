import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchLessonById } from "@/redux/slices/lessonSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Spinner } from "@chakra-ui/react";

const LessonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { lesson, loading, error } = useSelector(
    (state: RootState) => state.lessons
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchLessonById(Number(id)));
    }
  }, [id, dispatch]);

  if (loading) return <Spinner />;
  if (error) return <p>Error loading lesson: {error}</p>;
  if (!lesson) return <p>No lesson found.</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        {lesson.title}
      </h1>
      <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
        {lesson.content}
      </p>

      {lesson.videoUrl && (
        <div>
          <h3>Lesson Video</h3>
          <video width="100%" controls>
            <source src={lesson.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default LessonDetails;
