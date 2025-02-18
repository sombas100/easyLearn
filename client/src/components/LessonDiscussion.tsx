import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const LessonDiscussion: React.FC = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const handlePostComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div
      style={{ marginTop: "30px", padding: "20px", border: "1px solid #ddd" }}
    >
      <h3 style={{ fontWeight: "bold", marginBottom: "14px" }}>
        Discussion Thread
      </h3>
      {comments.map((c, index) => (
        <p
          key={index}
          style={{ borderBottom: "1px solid #ddd", padding: "5px 0" }}
        >
          {user?.name}: {c}
        </p>
      ))}
      {isAuthenticated && (
        <div>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            style={{ width: "80%", padding: "10px" }}
          />
          <button
            onClick={handlePostComment}
            style={{
              marginLeft: "10px",
              padding: "10px",
              backgroundColor: "#28A745",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginTop: "14px",
            }}
          >
            Post comment
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonDiscussion;
