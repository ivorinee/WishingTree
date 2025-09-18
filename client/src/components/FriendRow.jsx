import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";
import "./styles/FriendRow.css";

function FriendRow({ friend, type, accept, reject, refreshList }) {
  const { name, id } = friend;
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(false);

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
          <div className="friend-avatar">
            <img />
          </div>
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
                name="REMOVE FRIEND"
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
