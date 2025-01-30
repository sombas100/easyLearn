import accentureLogo from "../assets/accenture logo.png";
import amazonLogo from "../assets/amazon logo.png";
import microsoftLogo from "../assets/microsoft logo.png";
import udemyLogo from "../assets/udemy logo.png";
import youtubeLogo from "../assets/youtube logo.png";

const Sponsor = () => {
  return (
    <div style={{ marginTop: "16px" }} className="flex-row shadow w-full">
      <div className="flex items-center justify-around gap-3">
        <i style={{ fontSize: "20px", fontWeight: "bold" }} className="w-96">
          Sponsored by:
        </i>
        <img className="w-20 h-20" src={accentureLogo} alt="accenture logo" />
        <img className="w-20 h-20" src={amazonLogo} alt="amazon logo" />
        <img className="w-20 h-20" src={microsoftLogo} alt="microsoft logo" />
        <img className="w-20 h-20" src={udemyLogo} alt="udemy logo" />
        <img className="w-20 h-20" src={youtubeLogo} alt="youtube logo" />
      </div>
    </div>
  );
};

export default Sponsor;
