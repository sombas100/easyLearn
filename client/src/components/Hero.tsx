import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* 🌟 Desktop Hero Section */}
      <div
        style={{ marginTop: "58px" }}
        className="hidden lg:flex flex-col items-center justify-center 
        w-screen h-[450px] p-4 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-md"
      >
        <div className="flex-col items-center mx-auto justify-around max-w-96">
          <p
            style={{ fontSize: "48px", marginBottom: "18px" }}
            className="font-bold text-white"
          >
            Over 2000+ available online courses
          </p>
          <div className="gap-4">
            <h2 className="font-bold text-white text-3xl mx-4">
              Search from a variety of our online academic courses
            </h2>
            {/* ✅ Reusable Search Bar Component */}
            <SearchBar />
          </div>
        </div>
      </div>

      {/* 📱 Mobile Hero Section */}
      <div
        className="flex flex-col items-center justify-center 
        w-full h-[350px] p-4 mx-auto bg-blue-500 rounded-md lg:hidden"
      >
        <h2 className="text-white text-2xl font-bold mb-3 text-center">
          Find the Best Online Courses
        </h2>
        <p className="text-white text-sm text-center max-w-xs">
          Explore a wide range of courses and start learning today.
        </p>

        {/* ✅ Reusable Search Bar Component */}
        <SearchBar placeholder="Search courses..." />

        {/* 🔥 Call-To-Action Button */}
        <button
          onClick={() => navigate("/courses")}
          style={{
            backgroundColor: "#ffcc00",
            color: "#333",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "8px",
            marginTop: "15px",
            cursor: "pointer",
          }}
        >
          Browse Courses
        </button>
      </div>
    </>
  );
};

export default Hero;
