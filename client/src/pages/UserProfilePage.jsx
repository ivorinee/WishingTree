import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ScreenFrame from "../components/ScreenFrame";
import Button from "../components/Button";
import WishlistCard from "../components/WishlistCard";
import ConfirmationModal from "../components/ConfirmationModal";
import { fetchCurrentUser, fetchUserDetails } from "../api/userApi";
import {
  handleSendRequest,
  acceptRequest,
  rejectRequest,
} from "../api/userApi";
import {
  fetchUserWishlists,
  fetchPercentageComplete,
} from "../api/wishlistApi";
import { getProfileIcon } from "../utils/profileIcons";
import sortIcon from "../assets/sort-icon.svg";
import rightIcon from "../assets/right-icon.svg";
import leftIcon from "../assets/left-icon.svg";
import "./styles/UserProfilePage.css";

function UserProfilePage() {
  const id = useParams().id;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [profileIcon, setProfileIcon] = useState(0);
  const [friend, setFriend] = useState(false);
  const [friendRequest, setFriendRequest] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);

  const [userWishlists, setUserWishlists] = useState([]);
  const itemsPerPage = 2;
  const [percentage, setPercentage] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [leftBtn, setLeftBtn] = useState(false);
  const [rightBtn, setRightBtn] = useState(false);
  const [displayedWishlists, setDisplayedWishlist] = useState([]);

  async function loadData() {
    const userData = await fetchUserDetails(id);
    const currentUserData = await fetchCurrentUser();

    let isFriend = false;
    let requestStatus = "";
    if (
      userData["friends"].includes(currentUserData.id) &&
      currentUserData["friends"].includes(userData.id)
    ) {
      isFriend = true;
      requestStatus = "";
    } else if (currentUserData["friend_requests"].includes(userData.id)) {
      isFriend = false;
      requestStatus = "received";
    } else if (userData["friend_requests"].includes(currentUserData.id)) {
      isFriend = false;
      requestStatus = "sent";
    }

    setFriend(isFriend);
    setFriendRequest(requestStatus);

    const wishlistData = await fetchUserWishlists(id, isFriend);
    setName(userData.name);
    setUserWishlists(wishlistData);
    setProfileIcon(userData.profile_icon);

    const pages = Math.ceil(wishlistData.length / itemsPerPage);
    setTotalPages(pages);

    const percentageData = await Promise.all(
      wishlistData.map((wishlist) =>
        fetchPercentageComplete(wishlist.id).then((data) => ({
          id: wishlist.id,
          percentage: data,
        }))
      )
    );

    const percentageMap = {};
    percentageData.forEach(({ id, percentage }) => {
      percentageMap[id] = percentage;
    });
    setPercentage(percentageMap);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const viewedWishlists = userWishlists.slice(
      page * itemsPerPage,
      page * itemsPerPage + itemsPerPage
    );
    setLeftBtn(page > 0);
    setRightBtn(page < totalPages - 1);
    setDisplayedWishlist(viewedWishlists);
  }, [userWishlists, page]);

  return (
    <ScreenFrame>
      <div className="user-page-main-container">
        <div className="user-page-profile-container">
          <div className="user-page-profile">
            <img
              src={getProfileIcon(profileIcon)}
              className="user-page-profile-pic"
            />
            <div className="user-page-profile-text">
              <h1>{name}</h1>
              <p className="user-page-id">ID: {id}</p>
            </div>
          </div>
          <div className="user-page-actions">
            {friend && (
              <Button
                name="View Friends"
                onClick={() => {
                  navigate(`/${id}/friends`);
                }}
              />
            )}
            {friend && (
              <Button
                name="Remove Friend"
                style={"white-background"}
                onClick={() => setConfirmationModal(true)}
              />
            )}
            {confirmationModal && (
              <ConfirmationModal
                type="friend"
                id={id}
                onClose={() => setConfirmationModal(false)}
                refresh={loadData}
              />
            )}

            {!friend && friendRequest == "received" && (
              <Button
                name="Accept Friend Request"
                onClick={() => acceptRequest(id, loadData)}
              />
            )}
            {!friend && friendRequest == "received" && (
              <Button
                name="Reject Friend Request"
                style={"white-background"}
                onClick={() => rejectRequest(id, loadData)}
              />
            )}

            {!friend && friendRequest == "sent" && (
              <Button name="Friend Request Sent" style={"disabled"} />
            )}
            {!friend && friendRequest == "" && (
              <Button
                name="Add Friend"
                onClick={() => handleSendRequest(id, loadData)}
              />
            )}
          </div>
        </div>
        <div />
        <div className="user-page-wishlists">
          <div className="user-page-wishlists-title">
            <h1>{name}'s Wishlists</h1>
            {/* <Button style="sort-button" name="SORT" image={sortIcon} /> */}
          </div>
          <div className="wishlists-content">
            {userWishlists.length >= 1 && (
              <Button
                style={`next-prev-button ${!leftBtn ? "opacity-disabled" : ""}`}
                image={leftIcon}
                disabled={!leftBtn}
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              />
            )}
            {userWishlists.length === 0 ? (
              <div className="wishlists-empty-placeholder">
                <p>This user has no existing wishlists!</p>
              </div>
            ) : (
              <div className="wishlists-cards">
                {displayedWishlists.map((wishlist, index) => (
                  <WishlistCard
                    key={wishlist.id}
                    id={wishlist.id}
                    title={wishlist.name}
                    progress={percentage[wishlist.id]}
                    link={wishlist.share_link}
                    color={index % 2 === 0 ? "green" : "blue"}
                    side={index % 2 === 0 ? "left" : "right"}
                  />
                ))}
              </div>
            )}

            {displayedWishlists.length >= 1 && (
              <Button
                style={`next-prev-button ${
                  !rightBtn ? "opacity-disabled" : ""
                }`}
                image={rightIcon}
                disabled={!rightBtn}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages - 1))
                }
              />
            )}
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

export default UserProfilePage;
