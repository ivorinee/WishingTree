import Button from "./Button";
import "./styles/FriendRow.css";

function FriendRow({ friend, type, accept, reject }) {
  const { name, id } = friend;

  return (
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
        {type === "request" ? (
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
        ) : (
          <>
            <Button style="view-friend-button" name="VIEW" />
            <Button style="remove-friend-button" name="REMOVE FRIEND" />
          </>
        )}
      </div>
    </div>
  );
}

export default FriendRow;
