import { useNavigate } from "react-router";
import ScreenFrame from "../components/ScreenFrame";
import signupBtn from "../assets/sign-up-button.svg";
import loginBtn from "../assets/login-button.svg";
import unwrapGiftBtn from "../assets/unwrap-gift-button.svg";
import logo from "../assets/logo.svg";
import "./styles/LandingPage.css";
import LandingPageButton from "../components/LandingPageButton";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <ScreenFrame>
      <div className="landing-page-main-container">
        <div className="landing-page-header">
          <h1>WISHING TREE</h1>
        </div>
        <div className="landing-page-content">
          <img className="logo" src={logo} />
          <div className="landing-page-navigation-container">
            <LandingPageButton type="login" onClick={() => navigate("/login")} />
            <LandingPageButton type="signup" onClick={() => navigate("/signup")} />
            <LandingPageButton type="unwrapGift" onClick={() => navigate("/unwrap-gift")} />
          </div>
          <div className="hero-section">
            <div className="landing-page-text-container">
              <h1 className="hero-text">Because another mug won’t cut it.</h1>
              <p className="headline">
                Create your wishlist and share it with friends. <br /> Let them
                reserve what you truly want.
              </p>
              <p className="guide-text">Get started by unwrapping the gift!</p>
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

export default LandingPage;
