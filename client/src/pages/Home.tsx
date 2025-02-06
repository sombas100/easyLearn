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
    </>
  );
};

export default Home;
