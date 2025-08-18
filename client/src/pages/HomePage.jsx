import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import ScreenFrame from "../components/ScreenFrame";
import WishlistCard from "../components/WishlistCard";
import NewWishlistModal from "../components/NewWishlistModal";
import { fetchCurrentUser, fetchUserDetails } from "../api/userApi";
import {
  fetchPercentageComplete,
  fetchSavedWishlists,
  fetchWishlists,
} from "../api/wishlistApi";
import { getReservedItems } from "../api/itemApi";
import profilePic from "../assets/profile-1.svg";
import sortIcon from "../assets/sort-icon.svg";
import rightIcon from "../assets/right-icon.svg";
import leftIcon from "../assets/left-icon.svg";
import "./styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [newWishlistModal, setNewWishlistModal] = useState(false);
  const [reservedGifts, setReservedGifts] = useState(0);
  const itemsPerPage = 2;

  const [personalWishlists, setPersonalWishlists] = useState([]);
  const [personalPercentage, setPersonalPercentage] = useState({});
  const [totalPersonalPages, setTotalPersonalPages] = useState(0);
  const [personalPage, setPersonalPage] = useState(0);
  const [personalLeftBtn, setPersonalLeftBtn] = useState(false);
  const [personalRightBtn, setPersonalRightBtn] = useState(false);
  const [displayedPersonalWishlists, setDisplayedPersonalWishlist] = useState(
    []
  );

  const [savedWishlists, setSavedWishlists] = useState([]);
  const [savedOwners, setSavedOwners] = useState({});
  const [savedPercentage, setSavedPercentage] = useState({});
  const [totalSavedPages, setTotalSavedPages] = useState(0);
  const [savedPage, setSavedPage] = useState(0);
  const [savedLeftBtn, setSavedLeftBtn] = useState(false);
  const [savedRightBtn, setSavedRightBtn] = useState(false);
  const [displayedSavedWishlists, setDisplayedSavedWishlist] = useState([]);

  async function loadReservedGifts() {
    const reservedGifts = await getReservedItems();
    setReservedGifts(reservedGifts.length);
  }

  async function loadPersonalWishlists() {
    const userData = await fetchCurrentUser();
    const wishlistData = await fetchWishlists();
    setName(userData.name);
    setPersonalWishlists(wishlistData);

    const pages = Math.ceil(wishlistData.length / itemsPerPage);
    setTotalPersonalPages(pages);

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
    setPersonalPercentage(percentageMap);
  }

  async function loadSavedWishlists() {
    const wishlistData = await fetchSavedWishlists();
    setSavedWishlists(wishlistData);

    const pages = Math.ceil(wishlistData.length / itemsPerPage);
    setTotalSavedPages(pages);

    const ownerData = await Promise.all(
      wishlistData.map((wishlist) =>
        fetchUserDetails(wishlist.owner).then((data) => ({
          id: wishlist.owner,
          name: data.name,
        }))
      )
    );

    const ownersMap = {};
    ownerData.forEach(({ id, name }) => {
      ownersMap[id] = name;
    });
    setSavedOwners(ownersMap);

    const percentageData = await Promise.all(
      wishlistData.map((wishlist) =>
        fetchPercentageComplete(wishlist.id).then((data) => ({
          id: wishlist.id,
          percentage: data,
        }))
      )
    );
    console.log(percentageData);

    const percentageMap = {};
    percentageData.forEach(({ id, percentage }) => {
      percentageMap[id] = percentage;
    });
    setSavedPercentage(percentageMap);
  }

  useEffect(() => {
    loadPersonalWishlists();
    loadSavedWishlists();
    loadReservedGifts();
  }, []);

  useEffect(() => {
    const viewedWishlists = personalWishlists.slice(
      personalPage * itemsPerPage,
      personalPage * itemsPerPage + itemsPerPage
    );
    setPersonalLeftBtn(personalPage > 0);
    setPersonalRightBtn(personalPage < totalPersonalPages - 1);
    setDisplayedPersonalWishlist(viewedWishlists);
  }, [personalWishlists, personalPage]);

  useEffect(() => {
    const viewedWishlists = savedWishlists.slice(
      savedPage * itemsPerPage,
      savedPage * itemsPerPage + itemsPerPage
    );
    setSavedLeftBtn(savedPage > 0);
    setSavedRightBtn(savedPage < totalSavedPages - 1);
    setDisplayedSavedWishlist(viewedWishlists);
  }, [savedWishlists, savedPage]);

  return (
    <>
      {newWishlistModal && (
        <NewWishlistModal
          onClick={setNewWishlistModal}
          refreshWishlists={loadPersonalWishlists}
        />
      )}
      <ScreenFrame>
        <div className="home-page-main-container">
          <div className="home-page-top-section">
            <div className="home-page-profile">
              <img src={profilePic} className="home-page-profile-pic" />
              <div className="home-page-profile-text">
                <h1>Hey {name}!</h1>
                <p>Ready to drop some hints?</p>
              </div>
            </div>
            <div className="home-page-reserved-wrapper">
              <div className="home-page-divider"></div>
              <div className="home-page-reserved-gifts-container">
                <p>You have reserved {reservedGifts} gifts</p>
                <Button
                  name="VIEW NOW"
                  style={reservedGifts === 0 && "disabled"}
                  disabled={reservedGifts === 0}
                  onClick={() => navigate("/reserved-gifts")}
                />
              </div>
            </div>
            <div className="home-page-wishlists">
              <div className="home-page-wishlists-title">
                <h1>Your Wishlists</h1>
                <Button style="sort-button" name="SORT" image={sortIcon} />
              </div>
              <div className="wishlists-content">
                {displayedPersonalWishlists.length >= 1 && (
                  <Button
                    style={`next-prev-button ${
                      !personalLeftBtn ? "opacity-disabled" : ""
                    }`}
                    image={leftIcon}
                    disabled={!personalLeftBtn}
                    onClick={() =>
                      setPersonalPage((prev) => Math.max(prev - 1, 0))
                    }
                  />
                )}
                {displayedPersonalWishlists.length === 0 ? (
                  <div className="wishlists-empty-placeholder">
                    <p>You have no existing wishlists!</p>
                  </div>
                ) : (
                  <div className="wishlists-cards">
                    {displayedPersonalWishlists.map((wishlist, index) => (
                      <WishlistCard
                        key={wishlist.id}
                        id={wishlist.id}
                        title={wishlist.name}
                        progress={personalPercentage[wishlist.id]}
                        privacy={wishlist.privacy_status}
                        link={wishlist.share_link}
                        color={index % 2 === 0 ? "pink" : "purple"}
                        side={index % 2 === 0 ? "left" : "right"}
                      />
                    ))}
                  </div>
                )}

                {displayedPersonalWishlists.length >= 1 && (
                  <Button
                    style={`next-prev-button ${
                      !personalRightBtn ? "opacity-disabled" : ""
                    }`}
                    image={rightIcon}
                    disabled={!personalRightBtn}
                    onClick={() =>
                      setPersonalPage((prev) =>
                        Math.min(prev + 1, totalPersonalPages - 1)
                      )
                    }
                  />
                )}
              </div>
              <div className="create-new-wishlist">
                <Button
                  name="START A WISHLIST"
                  style="create-new-wishlist-button"
                  onClick={() => setNewWishlistModal(true)}
                />
              </div>
            </div>
          </div>
          <div className="home-page-wishlists">
            <div className="home-page-wishlists-title">
              <h1>Saved Wishlists</h1>
              <Button style="sort-button" name="SORT" image={sortIcon} />
            </div>
            <div className="wishlists-content">
              {displayedSavedWishlists.length >= 1 && (
                <Button
                  style={`next-prev-button ${
                    !savedLeftBtn ? "opacity-disabled" : ""
                  }`}
                  image={leftIcon}
                  disabled={!savedLeftBtn}
                  onClick={() => setSavedPage((prev) => Math.max(prev - 1, 0))}
                />
              )}
              {displayedSavedWishlists.length === 0 ? (
                <div className="wishlists-empty-placeholder">
                  <p>You have no saved wishlists!</p>
                </div>
              ) : (
                <div className="wishlists-cards">
                  {displayedSavedWishlists.map((wishlist, index) => (
                    <WishlistCard
                      key={wishlist.id}
                      id={wishlist.id}
                      owner={savedOwners[wishlist.owner]}
                      title={wishlist.name}
                      progress={savedPercentage[wishlist.id]}
                      privacy={wishlist.privacy_status}
                      link={wishlist.share_link}
                      color={index % 2 === 0 ? "green" : "blue"}
                      side={index % 2 === 0 ? "left" : "right"}
                      func={loadSavedWishlists}
                    />
                  ))}
                </div>
              )}
              {displayedSavedWishlists.length >= 1 && (
                <Button
                  style={`next-prev-button ${
                    !savedRightBtn ? "opacity-disabled" : ""
                  }`}
                  image={rightIcon}
                  disabled={!savedRightBtn}
                  onClick={() =>
                    setSavedPage((prev) =>
                      Math.min(prev + 1, totalSavedPages - 1)
                    )
                  }
                />
              )}
            </div>
          </div>
        </div>
      </ScreenFrame>
    </>
  );
}

export default HomePage;
