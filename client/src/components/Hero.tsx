const Hero = () => {
  return (
    <div
      style={{ marginTop: "58px" }}
      className="
    flex-col items-center justify-center w-screen h-[450px] p-4
     mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-md"
    >
      <div className="flex-col items-center mx-auto justify-around max-w-96 translate-x-[600px] translate-y-16">
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
          <input
            style={{ padding: "7px" }}
            placeholder="Search..."
            className="mx-auto w-96 h-8 px-3 rounded-lg bg-white"
            type="text"
            name="Search"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
