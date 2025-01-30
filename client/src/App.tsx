import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Sponsor from "./components/Sponsor";

function App() {
  return (
    <>
      <Navbar />
      <div className="app">
        <Hero />
      </div>
      <div className="app">
        <Sponsor />
      </div>
    </>
  );
}

export default App;
