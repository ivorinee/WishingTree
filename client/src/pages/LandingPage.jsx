import { useNavigate } from "react-router";
import ScreenFrame from "../components/ScreenFrame";
import signupBtn from "../assets/sign-up-button.svg";
import loginBtn from "../assets/login-button.svg";
import unwrapGiftBtn from "../assets/unwrap-gift-button.svg";
import logo from "../assets/logo.svg";
import "./styles/LandingPage.css";

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
            <button onClick={() => navigate("/login")}>
              <img
                className="landing-page-navigation-button"
                src={loginBtn}
                alt="Login Button"
              />
              <p>Login</p>
            </button>
            <button onClick={() => navigate("/signup")}>
              <img
                className="landing-page-navigation-button"
                src={signupBtn}
                alt="Sign Up Button"
              />
              <p>Sign Up</p>
            </button>
            <button onClick={() => navigate("/unwrap-gift")}>
              <img
                className="landing-page-navigation-button"
                src={unwrapGiftBtn}
                alt="Unwrap Gift Button"
              />
              <p>Unwrap Gift</p>
            </button>
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
