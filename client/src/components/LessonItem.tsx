import React from "react";
import { Lesson } from "@/interfaces/interface";

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
    <div className="lesson-item">
      <h3>{lesson.title}</h3>
      <p>{lesson.content}</p>
      {lesson.videoUrl && <video src={lesson.videoUrl} controls />}
    </div>
  );
};

export default LessonItem;
