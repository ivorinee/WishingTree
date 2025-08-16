import { useEffect, useState } from "react";
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
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  async function loadData() {
    const userData = await fetchCurrentUser();
    console.log(userData);
    const friendDetails = await Promise.all(
      userData.friends.map((id) => fetchUserDetails(id))
    );
    const friendRequestDetails = await Promise.all(
      userData.friend_requests.map((id) => fetchUserDetails(id))
    );

    setFriends(friendDetails);
    setFriendRequests(friendRequestDetails);
    console.log(friendDetails);
    console.log(friendRequestDetails);
  }

  async function acceptFriendRequest(id) {
    await acceptRequest(id);
    loadData();
  }

  async function rejectFriendRequest(id) {
    await rejectRequest(id);
    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScreenFrame>
      <div className="friend-list-page-main-container">
        <h1>Friend List</h1>
        <div className="friend-list-container">
          <div className="friend-list">
            {friends.map((friend, index) => (
              <div key={friend.id}>
                <FriendRow
                  friend={{ name: friend.name, id: friend.id }}
                  type="friend"
                  refreshList={loadData}
                />
                {index < friends.length - 1 && (
                  <div className="friend-item-gap" />
                )}
              </div>
            ))}
          </div>
        </div>
        {friendRequests.length > 0 && (
          <div className="friend-request-container">
            <h1>Friend Requests</h1>
            <div className="friend-request-list">
              {friendRequests.map((request) => (
                <FriendRow
                  key={request.id}
                  friend={{ name: request.name, id: request.id }}
                  type="request"
                  accept={acceptFriendRequest}
                  reject={rejectFriendRequest}
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
