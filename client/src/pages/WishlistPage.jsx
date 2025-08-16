import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Button from "../components/Button";
import ScreenFrame from "../components/ScreenFrame";
import AddEditItem from "../components/AddEditItem";
import WishlistItem from "../components/WishlistItem";
import ConfirmationModal from "../components/ConfirmationModal";
import { fetchWishlistItems } from "../api/itemApi";
import {
  fetchWishlist,
  saveWishlist,
  setPrivacyStatus,
  unsaveWishlist,
} from "../api/wishlistApi";
import { fetchCurrentUser, fetchUserDetails } from "../api/userApi";
import wishlistIcon from "../assets/wishlist-icon.svg";
import closeButton from "../assets/close-button.svg";
import minimizeButton from "../assets/minimize-button.svg";
import maximizeButton from "../assets/maximize-button.svg";
import bigCloseButton from "../assets/close-button-wishlist.svg";
import addIcon from "../assets/add-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import linkIcon from "../assets/link-icon.svg";
import binIcon from "../assets/small-bin-icon.svg";
import saveIcon from "../assets/save-icon.svg";
import lockIcon from "../assets/lock-icon.svg";
import unlockIcon from "../assets/unlock-icon.svg";
import "./styles/WishListPage.css";

function WishlistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const Pages = {
    WISHLIST: "wishlist",
    ADD_ITEM: "add",
    EDIT_ITEM: "edit",
  };
  const [currentPage, setCurrentPage] = useState(Pages.WISHLIST);
  const [wishlist, setWishlist] = useState({});
  const [wishlistItems, setWishlistItems] = useState([]);
  const [name, setName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [ownership, setOwnership] = useState({});
  const [isPrivate, setIsPrivate] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditingWishlist, setIsEditingWishlist] = useState(false);
  const [savedWishlist, setSavedWishlist] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const ownershipColour = {
    ownership: {
      backgroundColor: "#FFF4BE",
      primaryColor: "#FFE770",
    },
    nonOwnership: {
      backgroundColor: "#FFECCF",
      primaryColor: "#FFD693",
    },
  };

  function handleCancel() {
    setCurrentPage(Pages.WISHLIST);
    setEditingItem(null);
  }

  async function handlePrivacyToggle() {
    const privacyStatus = await setPrivacyStatus(isPrivate, wishlist);
    setIsPrivate(privacyStatus);
  }

  async function loadData() {
    const wishlistData = await fetchWishlist(id);
    const wishlistItems = await fetchWishlistItems(id);
    const userData = await fetchCurrentUser();
    setWishlist(wishlistData);
    setWishlistItems(wishlistItems);
    setCurrentUser(userData);
  }

  async function getWishlistOwner() {
    const userData = await fetchUserDetails(wishlist.owner);

    setName(userData.name);
  }

  async function checkOwnership() {
    if (wishlist.owner === currentUser.id) {
      setOwnership(ownershipColour.ownership);
      setName(currentUser.name);
    } else {
      setOwnership(ownershipColour.nonOwnership);
      await getWishlistOwner();
      setSavedWishlist(wishlist.saved_by.includes(currentUser.id));
    }
  }

  async function handleSaveWishlist(bool) {
    if (bool) {
      await unsaveWishlist(id);
    } else {
      await saveWishlist(id);
    }
    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (wishlist?.privacy_status !== undefined) {
      setIsPrivate(wishlist.privacy_status);
    }

    if (wishlist.owner && currentUser?.id) {
      checkOwnership();
    }
  }, [wishlist, currentUser]);

  return (
    <>
      {confirmationModal && (
        <ConfirmationModal
          type="wishlist"
          id={id}
          onClose={() => setConfirmationModal(false)}
          refresh={() => navigate(-1)}
        />
      )}
      <ScreenFrame>
        <div className="wishlist-outer-layer">
          <div className="screen-border">
            <div
              className="wishlist-fixed-top-box"
              style={{ backgroundColor: ownership.backgroundColor }}
            >
              <div className="wishlist-navbar-container">
                <img className="wishlist-navbar-icon" src={wishlistIcon} />
                <div
                  className="wishlist-tab"
                  style={{ backgroundColor: ownership.primaryColor }}
                >
                  <p>{wishlist.name}</p>
                  <Button
                    style="wishlist-button-navbar"
                    image={closeButton}
                    onClick={() => navigate(-1)}
                  />
                </div>
                <div className="wishlist-navbar-right">
                  <Button
                    style="wishlist-button-navbar"
                    image={minimizeButton}
                    onClick={() => navigate(-1)}
                  />
                  <Button
                    style="wishlist-button-navbar"
                    image={maximizeButton}
                    onClick={() => navigate(-1)}
                  />
                  <Button
                    style="wishlist-button-navbar"
                    image={bigCloseButton}
                    onClick={() => navigate(-1)}
                  />
                </div>
              </div>
            </div>
            <div className="wishlist-scrollable-content">
              <div className="wishlist-title">
                <div className="wishlist-owner">
                  <p className="wishlist-card-owner">
                    {currentPage === Pages.WISHLIST ? name : wishlist.name}
                  </p>
                  <h3>
                    {currentPage === Pages.WISHLIST && wishlist.name}
                    {currentPage === Pages.ADD_ITEM && "Add Item"}
                    {currentPage === Pages.EDIT_ITEM && "Edit Item"}
                  </h3>
                </div>
                {currentPage === Pages.WISHLIST &&
                  wishlist.owner === currentUser?.id && (
                    <div className="privacy-button">
                      <button
                        className={`privacy-toggle ${
                          isPrivate ? "private" : ""
                        }`}
                        onClick={handlePrivacyToggle}
                      >
                        <div
                          className="privacy-thumb"
                          style={{ backgroundColor: ownership?.primaryColor }}
                        >
                          <img
                            src={isPrivate ? lockIcon : unlockIcon}
                            alt={isPrivate ? "Locked" : "Unlocked"}
                          />
                        </div>
                      </button>
                      <p>{isPrivate ? "Private" : "Public"}</p>
                    </div>
                  )}
                {currentPage !== Pages.WISHLIST &&
                  wishlist.owner === currentUser.id && (
                    <Button
                      image={closeButton}
                      style="close-button"
                      onClick={handleCancel}
                    />
                  )}
                {wishlist.owner !== currentUser?.id && (
                  <Button
                    name="Share List"
                    image={linkIcon}
                    style="share-list-button"
                  />
                )}
              </div>
              {currentPage === Pages.WISHLIST && (
                <div className="wishlist-items">
                  {wishlistItems.map((item) => (
                    <WishlistItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      priority={item.priority}
                      price={item.price}
                      lastModified={item.last_modified.split("T")[0]}
                      link={item.link}
                      received={item.received}
                      reserved={item.reserved_by}
                      editing={isEditingWishlist}
                      setEditItem={(item) => {
                        setEditingItem(item);
                        setIsEditingWishlist(false);
                        setCurrentPage(Pages.EDIT_ITEM);
                      }}
                      colourScheme={ownership}
                      owner={wishlist.owner === currentUser?.id}
                      currentUserId={currentUser?.id}
                      refreshPage={loadData}
                    />
                  ))}
                </div>
              )}
              {currentPage === Pages.ADD_ITEM && (
                <AddEditItem
                  type="add"
                  id={id}
                  setCurrentPage={setCurrentPage}
                  refreshWishlist={loadData}
                />
              )}
              {currentPage === Pages.EDIT_ITEM && editingItem && (
                <AddEditItem
                  type="edit"
                  id={editingItem.id}
                  editingItem={editingItem}
                  setCurrentPage={setCurrentPage}
                  refreshWishlist={loadData}
                />
              )}
            </div>
            {currentPage === Pages.WISHLIST &&
              wishlist.owner === currentUser?.id && (
                <div
                  className="wishlist-fixed-bottom-box"
                  style={{ backgroundColor: ownership.backgroundColor }}
                >
                  <Button
                    name="Add Item"
                    image={addIcon}
                    style={isEditingWishlist ? "disabled" : ""}
                    onClick={() => {
                      setCurrentPage(Pages.ADD_ITEM);
                      setEditingItem(null);
                    }}
                  />
                  {isEditingWishlist ? (
                    <Button
                      name="Complete Editing"
                      onClick={() => setIsEditingWishlist(!isEditingWishlist)}
                    />
                  ) : (
                    <Button
                      name="Edit List"
                      image={editIcon}
                      onClick={() => setIsEditingWishlist(!isEditingWishlist)}
                    />
                  )}
                  <Button
                    name="Share List"
                    image={linkIcon}
                    style={isEditingWishlist ? "disabled" : ""}
                  />
                  <Button
                    name="Delete List"
                    image={binIcon}
                    style={isEditingWishlist ? "disabled" : ""}
                    onClick={() => setConfirmationModal(true)}
                  />
                </div>
              )}
            {wishlist.owner !== currentUser?.id && (
              <div
                className="wishlist-fixed-bottom-box"
                style={{ backgroundColor: ownership.backgroundColor }}
              >
                <Button
                  name={savedWishlist ? "Unsave Wishlist" : "Save Wishlist"}
                  image={saveIcon}
                  style={
                    savedWishlist ? "white-background" : "orange-background"
                  }
                  onClick={() => {
                    handleSaveWishlist(savedWishlist);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </ScreenFrame>
    </>
  );
}

export default WishlistPage;
