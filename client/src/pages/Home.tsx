import CourseList from "@/components/CourseList";
import Hero from "@/components/Hero";
import LessonList from "@/components/LessonList";
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
      <div>
        <LessonList />
      </div>
    </>
  );
};

export default Home;
