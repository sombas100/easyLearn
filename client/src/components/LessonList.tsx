import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLessons } from "@/redux/slices/lessonSlice";
import { RootState, AppDispatch } from "@/redux/store";
import LessonItem from "./LessonItem";
import { Spinner } from "@chakra-ui/react";

interface Props {
  courseId: number;
}

const LessonList = ({ courseId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { lessons, loading, error } = useSelector(
    (state: RootState) => state.lessons
  );

  useEffect(() => {
    dispatch(fetchLessons(courseId));
  }, [dispatch, courseId]);

  if (loading) return <Spinner />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        Course Lessons
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {lessons.map((lesson) => (
          <LessonItem key={lesson.lessonId} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default LessonList;
