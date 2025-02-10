import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CourseDetails from "./components/CourseDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/courses/:id" element={<CourseDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
