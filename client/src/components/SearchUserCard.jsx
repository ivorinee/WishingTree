import { useNavigate } from "react-router";
import Button from "../components/Button";
import ProfileImage from "./ProfileImage";
import { handleSendRequest } from "../api/userApi";
import "./styles/SearchUserCard.css";

function SearchUserCard({
  name,
  id,
  profileIcon,
  wishlists,
  friends,
  currentUser,
  userFriendRequests = [],
  currentUserFriends = [],
  onButtonClick,
}) {
  const navigate = useNavigate();
  const isOwner = currentUser.id === id;
  const isFriend = currentUserFriends.includes(id);
  const hasSentRequest = userFriendRequests.includes(currentUser.id);

  let buttonText = "Befriend";
  let buttonDisabled = false;
  let buttonClass = "";
  if (isOwner) {
    buttonText = "It's You";
    buttonDisabled = true;
    buttonClass = "disabled";
  } else if (isFriend) {
    buttonText = "Already Friend";
    buttonDisabled = true;
    buttonClass = "disabled";
  } else if (hasSentRequest) {
    buttonText = "Request Sent";
    buttonDisabled = true;
    buttonClass = "disabled";
  }

  return (
    <div className="search-user-card" onClick={() => navigate(`/user/${id}`)}>
      <div className="search-user-profile">
        <ProfileImage index={profileIcon} />
        <div className="search-user-profile-details">
          <p className="search-user-profile-name">{name}</p>
          <p className="search-user-profile-id">ID: {id}</p>
        </div>
      </div>
      <div className="search-user-details">
        <div className="search-user-details-row">
          <p># of Wishlists</p>
          <p>{wishlists}</p>
        </div>
        <div className="search-user-details-row">
          <p># of Friends</p>
          <p>{friends}</p>
        </div>
      </div>
      <div className="search-user-action">
        <Button
          name={buttonText}
          disabled={buttonDisabled}
          style={`${buttonClass} searchUserButton`}
          onClick={() => handleSendRequest(id, onButtonClick)}
        />
      </div>
    </div>
  );
}

export default SearchUserCard;
