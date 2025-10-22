import { getProfileIcon } from "../utils/profileIcons";
import "./styles/ProfileImage.css";

export default function ProfileImage({ index = 1 }) {
  return (
    <div className="profile-image-border">
      <img src={getProfileIcon(index)} />
    </div>
  );
}
