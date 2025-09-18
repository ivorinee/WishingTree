import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { logout } from "../api/authApi";
import loginIcon from "../assets/login-icon.svg";
import signUpIcon from "../assets/sign-up-icon.svg";
import unwrapGiftIcon from "../assets/unwrap-gift-icon.svg";
import searchIcon from "../assets/search-icon.svg";
import burgerIcon from "../assets/burger-icon.svg";
import "./styles/ScreenFrame.css";

function ScreenFrame({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const isLoggedOutPage = ["/unwrap-gift", "/login", "/signup"].includes(path);
  const isLandingPage = ["/"].includes(path);
  const navItems = [
    { label: "Login", path: "/login", icon: loginIcon },
    { label: "Sign Up", path: "/signup", icon: signUpIcon },
    { label: "Unwrap Gift", path: "/unwrap-gift", icon: unwrapGiftIcon },
  ];
  const currentLabel = navItems.find(
    (item) => item.path === location.pathname
  )?.icon;
  const sortedNav = [
    ...navItems.filter((item) => item.path === path),
    ...navItems.filter((item) => item.path !== path),
  ];
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavigation(newPath) {
    if (newPath === path) {
      return;
    } else {
      navigate(newPath);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  }

  return (
    <div className="outer-layer">
      <div className="screen-border">
        {isLoggedOutPage && !isLandingPage && (
          <div className="fixed-top-box">
            <div className="unlogged-in-container">
              <img className="unlogged-in-navbar-icon" src={currentLabel} />
              <button
                className={`unlogged-in-burger ${menuOpen ? "burger-open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img className="burger" src={burgerIcon} />
              </button>
              <div
                className={`unlogged-in-navbar ${
                  menuOpen ? "unlogged-in-burger-open" : ""
                }`}
              >
                {sortedNav.map((item) => (
                  <div
                    key={item.path}
                    className={
                      path === item.path
                        ? "unlogged-in-current"
                        : "unlogged-in-other"
                    }
                  >
                    <button
                      className="unlogged-in-other-button"
                      onClick={() => handleNavigation(item.path)}
                    >
                      <p
                        className={
                          path === item.path ? "text-bold" : "text-light"
                        }
                      >
                        {item.label}
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!isLoggedOutPage && !isLandingPage && (
          <div className="fixed-top-box">
            <div className="logged-in-container">
              <div className="search-wrapper">
                <img className="search" src={searchIcon} />
                <input
                  className="search-input"
                  placeholder="Search User/ID"
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleNavigation(`/search/${searchInput}`);
                    }
                  }}
                ></input>
              </div>
              <button
                className={`logged-in-burger ${menuOpen ? "burger-open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img className="burger" src={burgerIcon} />
              </button>
              <div
                className={`logged-in-navbar ${
                  menuOpen ? "logged-in-burger-open" : ""
                }`}
              >
                <button
                  className="logged-in-button"
                  onClick={() => handleNavigation("/home")}
                >
                  Home
                </button>
                <button
                  className="logged-in-button"
                  onClick={() => handleNavigation("/friends")}
                >
                  Friends
                </button>
                <button className="logged-in-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="scrollable-content">{children}</div>
      </div>
    </div>
  );
}

export default ScreenFrame;
