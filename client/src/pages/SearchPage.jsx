import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ScreenFrame from "../components/ScreenFrame";
import SearchUserCard from "../components/SearchUserCard";
import { fetchCurrentUser, searchUsers } from "../api/userApi";
import "./styles/SearchPage.css";

function SearchPage() {
  const { query } = useParams();
  const [userResults, setUserResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  async function loadData() {
    const userData = await fetchCurrentUser();
    const searchResults = await searchUsers(query);
    setCurrentUser(userData);
    setUserResults(searchResults);
  }

  useEffect(() => {
    loadData();
  }, [query]);

  return (
    <ScreenFrame>
      <div className="search-page-container">
        <h1>Search Result: {query}</h1>
        <div className="search-results-container">
          {userResults.map((user) => (
            <SearchUserCard
              key={user.id}
              id={user.id}
              profileIcon={user.profile_icon}
              name={user.name}
              wishlists={user.wishlistCount}
              friends={user.friends.length}
              currentUser={currentUser}
              userFriendRequests={user.friend_requests}
              currentUserFriends={currentUser.friends}
              onButtonClick={loadData}
            />
          ))}
        </div>
        {userResults.length == 0 && (
          <div className="search-empty-results-container">
            <p>No user found!</p>
          </div>
        )}
      </div>
    </ScreenFrame>
  );
}

export default SearchPage;
