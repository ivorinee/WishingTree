import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ScreenFrame from "../components/ScreenFrame";
import FriendRow from "../components/FriendRow";
import {
  fetchCurrentUser,
  fetchUserDetails,
  acceptRequest,
  rejectRequest,
} from "../api/userApi";
import "./styles/FriendListPage.css";

function FriendListPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  async function loadData() {
    let userData;
    if (!id) {
      // load own friend list
      userData = await fetchCurrentUser();
      // only fetch friend requests if viewing own profile
      const friendRequestDetails = await Promise.all(
        userData.friend_requests.map((id) => fetchUserDetails(id))
      );
      setFriendRequests(friendRequestDetails);
    } else {
      // load another user's friend list
      userData = await fetchUserDetails(id);

      // if trying to view own profile, redirect to /friends
      const currentUser = await fetchCurrentUser();
      if (userData.id === currentUser.id) {
        navigate("/friends");
      } else {
        setName(userData.name);
      }
    }

    const friendDetails = await Promise.all(
      userData.friends.map((id) => fetchUserDetails(id))
    );
    setFriends(friendDetails);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScreenFrame>
      <div className="friend-list-page-main-container">
        <h1>{id ? `${name}'s` : ""} Friend List</h1>
        <div className="friend-list-container">
          <div className="friend-list">
            {friends.map((friend, index) => (
              <div key={friend.id}>
                <FriendRow
                  friend={{
                    name: friend.name,
                    id: friend.id,
                    profileIcon: friend.profile_icon,
                  }}
                  type={id ? "" : "friend"}
                  refreshList={loadData}
                />
                {index < friends.length - 1 && (
                  <div className="friend-item-gap" />
                )}
              </div>
            ))}
            {friends.length === 0 && <p>You have no friends at the moment!</p>}
          </div>
        </div>
        {friendRequests.length > 0 && (
          <div className="friend-request-container">
            <h1>Friend Requests</h1>
            <div className="friend-request-list">
              {friendRequests.map((request) => (
                <FriendRow
                  key={request.id}
                  friend={{
                    name: request.name,
                    id: request.id,
                    profileIcon: request.profile_icon,
                  }}
                  type="request"
                  accept={() => acceptRequest(request.id, loadData)}
                  reject={() => rejectRequest(request.id, loadData)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </ScreenFrame>
  );
}

export default FriendListPage;
