import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse } from "@/redux/slices/courseSlice";
import { AppDispatch } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

const AddCourse = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addCourse({ title, description, videoUrl, lessons: [] }));
    navigate("/admin/courses");
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Add New Course
      </Heading>
      <Heading size="lg" mb={4}>
        <button
          onClick={() => navigate("/admin/courses")}
          className="cursor-pointer"
        >
          <FaLongArrowAltLeft size={24} />
        </button>
      </Heading>
      <VStack as="form" gap={4} onSubmit={handleSubmit}>
        <Input
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          placeholder="Video URL (optional)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <Button
          style={{
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
          onClick={() => navigate("/admin/courses/new")}
        >
          Add New Course
        </Button>
      </VStack>
    </Box>
  );
};

export default AddCourse;
