import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchCourses } from "@/redux/slices/courseSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Spinner } from "@chakra-ui/react";

const SearchResults = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";

  const { searchResults, loading, error } = useSelector(
    (state: RootState) => state.courses
  );

  useEffect(() => {
    if (query) {
      dispatch(searchCourses(query));
    }
  }, [query, dispatch]);

  if (loading) return <Spinner />;
  if (error) return <p>Error fetching courses: {error}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Search Results for: "{query}"
      </h1>

      {searchResults && searchResults.length > 0 ? (
        <ul>
          {searchResults.map((course) => (
            <li key={course.courseId} style={{ marginBottom: "10px" }}>
              {course.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses found. Try a different keyword.</p>
      )}
    </div>
  );
};

export default SearchResults;
