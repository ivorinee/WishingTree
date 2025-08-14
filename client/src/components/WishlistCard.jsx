import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";
import paperclip from "../assets/paperclip.svg";
import binder from "../assets/binder.svg";
import linkIcon from "../assets/link-icon.svg";
import lockIcon from "../assets/lock-icon.svg";
import unlockIcon from "../assets/unlock-icon.svg";
import binIcon from "../assets/big-bin-icon.svg";
import "./styles/WishlistCard.css";

const COLOR_SCHEMES = {
  pink: {
    backgroundColor: "#FAC9E1",
    mainColor: "#F896C7",
  },
  purple: {
    backgroundColor: "#D2C8FF",
    mainColor: "#9884F0",
  },
  green: {
    backgroundColor: "#D0FFDA",
    mainColor: "#8CE59F",
  },
  blue: {
    backgroundColor: "#A5C9FF",
    mainColor: "#5C9BF9",
  },
};

function WishlistCard({
  id,
  title,
  owner,
  progress,
  privacy,
  link,
  color,
  side,
}) {
  const navigate = useNavigate();
  const [isPrivate, setIsPrivate] = useState(privacy);
  const scheme = COLOR_SCHEMES[color] || COLOR_SCHEMES.pink;

  return (
    <div className="wishlist-card-container">
      <div className="wishlist-card-wrapper">
        <div className="wishlist-paperclip">
          <img src={paperclip} alt="paperclip" />
        </div>
        <div
          className={`wishlist-binder ${
            side === "right" ? "binder-right" : ""
          }`}
        >
          <img src={binder} alt="binder" />
        </div>
        <div className="wishlist-body">
          <div
            className="wishlist-card"
            style={{ backgroundColor: scheme.backgroundColor }}
          >
            <div className="wishlist-card-header">
              <div className="wishlist-card-title">
                <div>
                  <p className="wishlist-card-owner">{owner}</p>
                  <h3>{title}</h3>
                </div>
                {link && <Button style="link-button" image={linkIcon} />}
              </div>
              {progress >= 0 ? (
                <div className="progress-bar">
                  <p>{progress}% Complete</p>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: scheme.mainColor,
                      }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="progress-bar">
                  <p>Oops! Someone forgot to wish.</p>
                </div>
              )}
            </div>
            <div className="wishlist-card-footer">
              {!owner && (
                <button
                  className={`privacy-toggle ${isPrivate ? "private" : ""}`}
                  onClick={() => setIsPrivate(!isPrivate)}
                >
                  <div
                    className="privacy-thumb"
                    style={{
                      backgroundColor: isPrivate
                        ? "#FFFFFF"
                        : scheme.backgroundColor,
                    }}
                  >
                    <img
                      src={isPrivate ? lockIcon : unlockIcon}
                      alt={isPrivate ? "Locked" : "Unlocked"}
                    />
                  </div>
                </button>
              )}
              {owner && <Button image={binIcon} style="bin-button" />}
              <button
                className="view-button"
                style={{ backgroundColor: scheme.mainColor }}
                onClick={() => navigate(`/wishlist/${id}`)}
              >
                VIEW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
