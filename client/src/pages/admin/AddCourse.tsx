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
import { ToastContainer, toast } from "react-toastify";

const AddCourse = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(
        addCourse({
          title,
          description,
          videoUrl,
          lessons: [],
        })
      ).unwrap();

      navigate("/admin/courses");
      alert("Course added successfully!");
    } catch (error) {
      console.error("Failed to add course:", error);
      toast("Failed to add course. Please try again.");
    }
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

      {/* ✅ Ensure the form is properly structured */}
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
        {/* ✅ Use 'type="submit"' on the button so it properly submits the form */}
        <Button type="submit" colorScheme="blue">
          Add Course
        </Button>
      </VStack>
      <ToastContainer />
    </Box>
  );
};

export default AddCourse;
