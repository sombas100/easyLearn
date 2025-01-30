import { Button, Image } from "@chakra-ui/react";
import easylearnLogo from "../assets/easylearn logo.jpg";

const Navbar = () => {
  return (
    <div style={{ padding: "12px" }} className="shadow w-screen">
      <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-around">
        <Image
          className="w-22 h-20 overflow-auto items-center justify-center sm:hidden"
          src={easylearnLogo}
          alt=""
        />
        <div className="flex gap-4 max-sm:text-xs">
          <Button sm={{ color: "blue.500 " }} variant="solid">
            Teacher Login
          </Button>
          <Button className="md:text-amber-300">Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
