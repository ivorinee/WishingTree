import profileIcon1 from "../assets/profile-1.svg";
import profileIcon2 from "../assets/profile-2.svg";
import profileIcon3 from "../assets/profile-3.svg";
import profileIcon4 from "../assets/profile-4.svg";
import profileIcon5 from "../assets/profile-5.svg";
import profileIcon6 from "../assets/profile-6.svg";
import profileIcon7 from "../assets/profile-7.svg";
import profileIcon8 from "../assets/profile-8.svg";

export const profileIcons = [
  profileIcon1,
  profileIcon2,
  profileIcon3,
  profileIcon4,
  profileIcon5,
  profileIcon6,
  profileIcon7,
  profileIcon8,
];

export function getProfileIcon(index = 1) {
  return profileIcons[index - 1];
}
