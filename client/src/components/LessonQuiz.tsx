import { useState } from "react";
import { quizData } from "@/data/quizData";

interface LessonQuizProps {
  lessonId: number;
}

const LessonQuiz: React.FC<LessonQuizProps> = ({ lessonId }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const lessonQuiz = quizData.find((q) => q.lessonId === lessonId);

  if (!lessonQuiz)
    return (
      <p style={{ marginTop: "30px" }}>No quiz available for this lesson.</p>
    );

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div
      style={{ marginTop: "30px", padding: "20px", border: "1px solid #ddd" }}
    >
      <h3>{lessonQuiz.question}</h3>
      {lessonQuiz.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={option}
            name="quiz"
            value={option}
            checked={selectedAnswer === option}
            onChange={() => setSelectedAnswer(option)}
            style={{ cursor: "pointer" }}
          />
          <label htmlFor={option} style={{ marginLeft: "5px" }}>
            {option}
          </label>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Submit
      </button>
      {submitted && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          {selectedAnswer === lessonQuiz.correctAnswer
            ? "✅ Correct!"
            : "❌ Incorrect. Try again!"}
        </p>
      )}
    </div>
  );
};

export default LessonQuiz;
