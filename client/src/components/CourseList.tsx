import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "@/redux/slices/courseSlice";
import { RootState, AppDispatch } from "@/redux/store";
import CourseItem from "./CourseItem";
import { Spinner } from "@chakra-ui/react";

const CourseList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading, error } = useSelector(
    (state: RootState) => state.courses
  );

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
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
        Available Courses
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {courses.map((course) => (
          <CourseItem key={course.courseId} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
