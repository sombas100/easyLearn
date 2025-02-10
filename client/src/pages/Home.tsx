import CourseList from "@/components/CourseList";
import Hero from "@/components/Hero";
import Sponsor from "@/components/Sponsor";

const Home = () => {
  return (
    <>
      <div className="app">
        <Hero />
      </div>
      <div className="app">
        <Sponsor />
      </div>
      <div className="">
        <CourseList />
      </div>
    </>
  );
};

export default Home;
