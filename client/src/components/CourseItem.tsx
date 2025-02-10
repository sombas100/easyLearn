import React from "react";
import { Link } from "react-router-dom";

interface CourseProps {
  course: {
    courseId: number;
    title: string;
    description: string;
    videoUrl?: string;
  };
}

const CourseItem: React.FC<CourseProps> = ({ course }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease-in-out",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0px 6px 12px rgba(0, 0, 0, 0.15)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)")
      }
    >
      {course.videoUrl ? (
        <iframe
          style={{ width: "100%", height: "180px", borderRadius: "8px" }}
          src={course.videoUrl}
          title={course.title}
          allowFullScreen
        />
      ) : (
        <div
          style={{
            height: "180px",
            backgroundColor: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            color: "#6b7280",
          }}
        >
          No Preview Available
        </div>
      )}
      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "12px" }}>
        {course.title}
      </h2>
      <p style={{ color: "#6b7280", marginTop: "8px" }}>
        {course.description.substring(0, 100)}...
      </p>
      <Link to={`/courses/${course.courseId}`}>
        <button
          style={{
            marginTop: "12px",
            backgroundColor: "#2563eb",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#1e40af")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#2563eb")
          }
        >
          View Course
        </button>
      </Link>
    </div>
  );
};

export default CourseItem;
