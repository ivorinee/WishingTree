import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";
import { getProfileIcon } from "../utils/profileIcons";
import bin from "../assets/small-bin-icon.svg";
import "./styles/FriendRow.css";

function FriendRow({ friend, type, accept, reject, refreshList }) {
  const navigate = useNavigate();
  const { name, id, profileIcon } = friend;
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [smallScreen, setSmallScreen] = useState(window.innerWidth <= 700);

  const handleResize = () => {
    setSmallScreen(window.innerWidth <= 700);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      {confirmationModal && (
        <ConfirmationModal
          type="friend"
          id={id}
          onClose={() => setConfirmationModal(false)}
          refresh={refreshList}
        />
      )}
      <div
        className={`friend-item ${
          type === "request" ? "friend-request-padding" : ""
        }`}
      >
        <div className="friend-info">
          <img
            src={getProfileIcon(profileIcon)}
            className="friend-profile-pic"
          />
          <div className="friend-details">
            <p className="friend-item-name">{name}</p>
            <p className="friend-item-id">ID: {id}</p>
          </div>
        </div>
        <div className="friend-actions">
          {type === "request" && (
            <>
              <Button
                style="accept-friend-button"
                name="ACCEPT"
                onClick={() => accept(id)}
              />
              <Button
                style="decline-friend-button"
                name="DECLINE"
                onClick={() => reject(id)}
              />
            </>
          )}{" "}
          {type === "friend" && (
            <>
              <Button
                style="view-friend-button"
                name="VIEW"
                onClick={() => navigate(`../user/${id}`)}
              />
              <Button
                style="remove-friend-button"
                name={!smallScreen ? "REMOVE FRIEND" : undefined}
                image={smallScreen ? bin : undefined}
                onClick={() => setConfirmationModal(true)}
              />
            </>
          )}{" "}
          {type === "" && (
            <Button
              style="view-friend-button"
              name="VIEW"
              onClick={() => navigate(`../user/${id}`)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default FriendRow;
