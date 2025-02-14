import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchLessonById } from "@/redux/slices/lessonSlice";
import { updateEnrollmentProgress } from "@/redux/slices/enrollmentSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Button, Spinner } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import LessonQuiz from "./LessonQuiz";
import LessonDiscussion from "./LessonDiscussion";

const LessonDetails = () => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { lesson, lessons, loading, error } = useSelector(
    (state: RootState) => state.lessons
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchLessonById(Number(id)));
      setIsCompleted(false);
    }
  }, [id, dispatch]);

  const lessonIndex = lessons.findIndex((l) => l.lessonId === Number(id));
  const nextLesson = lessons[lessonIndex + 1];
  const prevLesson = lessons[lessonIndex - 1];

  const handleCompleteLesson = () => {
    if (lesson) {
      dispatch(
        updateEnrollmentProgress({ courseId: lesson.courseId, progress: 100 })
      );
      setIsCompleted((completed) => !completed);
      if (!isCompleted) {
        return toast.success(`${lesson.title} has been completed!`);
      }
    }
  };

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
          <video width="100%" controls>
            <source src={lesson.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {isAuthenticated && (
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          {prevLesson && (
            <Button
              colorScheme="gray"
              onClick={() => navigate(`/lessons/${prevLesson.lessonId}`)}
            >
              Previous Lesson
            </Button>
          )}
          <Button colorScheme="green" onClick={handleCompleteLesson}>
            {isCompleted ? "Completed" : "Mark as Complete"}
          </Button>
          {nextLesson && (
            <Button
              colorScheme="blue"
              onClick={() => navigate(`/lessons/${nextLesson.lessonId}`)}
            >
              Next Lesson
            </Button>
          )}
        </div>
      )}
      <ToastContainer />
      <LessonQuiz lessonId={lesson.lessonId} />
      <LessonDiscussion />
    </div>
  );
};

export default LessonDetails;
