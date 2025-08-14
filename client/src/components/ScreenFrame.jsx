import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import loginIcon from "../assets/login-icon.svg";
import signUpIcon from "../assets/sign-up-icon.svg";
import unwrapGiftIcon from "../assets/unwrap-gift-icon.svg";
import searchIcon from "../assets/search-icon.svg";
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

  function handleNavigation(newPath) {
    if (newPath === path) {
      return;
    } else {
      navigate(newPath);
    }
  }

  return (
    <div className="outer-layer">
      <div className="screen-border">
        {isLoggedOutPage && !isLandingPage && (
          <div className="fixed-top-box">
            <div className="unlogged-in-container">
              <img className="unlogged-in-navbar-icon" src={currentLabel} />
              <div className="unlogged-in-navbar">
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
                <img src={searchIcon} />
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
              <div className="logged-in-navbar">
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
                <button
                  className="logged-in-button"
                  onClick={() => handleNavigation("/")}
                >
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
