interface Props {
  lesson: {
    lessonId: number;
    title: string;
    content: string;
    videoUrl?: string;
  };
}

const LessonItem = ({ lesson }: Props) => {
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
      {lesson.videoUrl ? (
        <iframe
          style={{ width: "100%", height: "180px", borderRadius: "8px" }}
          src={lesson.videoUrl}
          title={lesson.title}
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
          No Video Available
        </div>
      )}
      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "12px" }}>
        {lesson.title}
      </h2>
      <p style={{ color: "#6b7280", marginTop: "8px" }}>
        {lesson.content.substring(0, 100)}...
      </p>
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
        View Lesson
      </button>
    </div>
  );
};

export default LessonItem;
