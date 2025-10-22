import loginIcon from "../assets/login-icon.svg";
import signUpIcon from "../assets/sign-up-icon.svg";
import unwrapGiftIcon from "../assets/unwrap-gift-icon.svg";
import "./styles/LandingPageButton.css";

function LandingPageButton({ type, icon, onClick }) {
  const typeTable = {
    signup: { label: "Sign Up", color: "#FFF4BE", icon: signUpIcon },
    login: { label: "Login", color: "#D2C8FF", icon: loginIcon },
    unwrapGift: {
      label: "Unwrap Gift",
      color: "#FAC9E1",
      icon: unwrapGiftIcon,
    },
  };
  return (
    <button className="landing-page-button" onClick={onClick}>
      <div className="landing-page-button-container" style={{ backgroundColor: typeTable[type].color }}>
          <img
            src={typeTable[type].icon}
            alt={typeTable[type].label}
          />
      </div>
      <p>{typeTable[type].label}</p>
    </button>
  );
}

export default LandingPageButton;
