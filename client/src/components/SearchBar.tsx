import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { searchCourses } from "@/redux/slices/courseSlice";
import { AppDispatch } from "@/redux/store";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search..." }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      dispatch(searchCourses(searchQuery));
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "5px",
        width: "95%",
      }}
    >
      <input
        style={{
          flex: 1,
          padding: "10px",
          border: "none",
          outline: "none",
          fontSize: "16px",
          borderRadius: "8px",
        }}
        placeholder={placeholder}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        style={{
          backgroundColor: "#ffcc00",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleSearch}
      >
        <AiOutlineSearch size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
