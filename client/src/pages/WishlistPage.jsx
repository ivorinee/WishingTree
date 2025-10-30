import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Button from "../components/Button";
import ScreenFrame from "../components/ScreenFrame";
import LoadingScreen from "../components/LoadingScreen";
import AddEditItem from "../components/AddEditItem";
import WishlistItem from "../components/WishlistItem";
import ConfirmationModal from "../components/ConfirmationModal";
import { fetchWishlistItems } from "../api/itemApi";
import {
  fetchWishlist,
  saveWishlist,
  setPrivacyStatus,
  unsaveWishlist,
  renameWishlist,
} from "../api/wishlistApi";
import { fetchCurrentUser, fetchUserDetails } from "../api/userApi";
import wishlistIcon from "../assets/wishlist-icon.svg";
import savedWishlistIcon from "../assets/saved-wishlist-icon.svg";
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
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);
  const Pages = {
    WISHLIST: "wishlist",
    ADD_ITEM: "add",
    EDIT_ITEM: "edit",
  };
  const [currentPage, setCurrentPage] = useState(Pages.WISHLIST);
  const [smallScreen, setSmallScreen] = useState(
    window.innerWidth <= 600 ? false : true
  );
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState("");

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

  function handleResize() {
    setSmallScreen(window.innerWidth <= 600 ? false : true);
  }

  function handleCancel() {
    setCurrentPage(Pages.WISHLIST);
    setEditingItem(null);
  }

  async function handlePrivacyToggle() {
    const privacyStatus = await setPrivacyStatus(isPrivate, wishlist);
    setIsPrivate(privacyStatus);
  }

  async function getWishlistOwner() {
    const userData = await fetchUserDetails(wishlist.owner);
    setName(userData.name);
  }

  async function loadData() {
    try {
      const wishlistData = await fetchWishlist(id);
      const wishlistItems = await fetchWishlistItems(id);

      let currentUser = null;
      try {
        currentUser = await fetchCurrentUser();
      } catch {
        currentUser = null;
      }

      setWishlist(wishlistData);
      setWishlistItems(wishlistItems);
      setCurrentUser(currentUser);

      if (currentUser) {
        if (wishlistData.owner === currentUser.id) {
          setOwnership(ownershipColour.ownership);
          setName(currentUser.name);
        } else {
          setOwnership(ownershipColour.nonOwnership);
          await getWishlistOwner();
          setSavedWishlist(wishlist.saved_by.includes(currentUser.id));
        }
      } else {
        setOwnership(ownershipColour.nonOwnership);
      }

      setIsPrivate(wishlist.privacy_status);
      setSavedWishlist(
        currentUser && wishlistData.saved_by.includes(currentUser.id)
      );
    } catch (error) {
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleRenameWishlist(name) {
    if (name.length > 50) {
      setError("Wishlist name cannot exceed 50 characters.");
      return;
    }
    setError("");
    await renameWishlist(id, name);
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
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   if (wishlist.owner && currentUser?.id) {
  //     checkOwnership();
  //   } else {
  //     setOwnership(ownershipColour.nonOwnership);
  //   }
  // }, [wishlist, currentUser]);

  if (loading) {
    return <LoadingScreen />;
  }

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
        {authorized && (
          <div className="wishlist-outer-layer">
            <div className="screen-border">
              <div
                className="wishlist-fixed-top-box"
                style={{ backgroundColor: ownership.backgroundColor }}
              >
                <div className="wishlist-navbar-container">
                  <img
                    className="wishlist-navbar-icon"
                    src={savedWishlist ? savedWishlistIcon : wishlistIcon}
                  />
                  <div
                    className="wishlist-tab"
                    style={{ backgroundColor: ownership.primaryColor }}
                  >
                    <p>{wishlist.name}</p>
                    <Button
                      style="wishlist-button-navbar"
                      image={closeButton}
                      onClick={() => {
                        currentUser ? navigate(-1) : navigate("/");
                      }}
                    />
                  </div>
                  <div className="wishlist-navbar-right">
                    {smallScreen && (
                      <Button
                        style="wishlist-button-navbar"
                        image={minimizeButton}
                        onClick={() => {
                          currentUser ? navigate(-1) : navigate("/");
                        }}
                      />
                    )}
                    {smallScreen && (
                      <Button
                        style="wishlist-button-navbar"
                        image={maximizeButton}
                        onClick={() => {
                          currentUser ? navigate(-1) : navigate("/");
                        }}
                      />
                    )}

                    <Button
                      style="wishlist-button-navbar"
                      image={bigCloseButton}
                      onClick={() => {
                        currentUser ? navigate(-1) : navigate("/");
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="wishlist-scrollable-content">
                <div className="wishlist-heading">
                  <div className="wishlist-title">
                    <p>
                      {currentPage === Pages.WISHLIST ? name : wishlist.name}
                    </p>
                    {currentPage === Pages.WISHLIST &&
                      (isEditingWishlist ? (
                        <input
                          name="wishlist-name"
                          className="wishlist-rename-input"
                          type="text"
                          size={wishlist.name.length || 1}
                          value={wishlist.name}
                          onChange={(e) =>
                            setWishlist({ ...wishlist, name: e.target.value })
                          }
                          onBlur={() => handleRenameWishlist(wishlist.name)}
                        />
                      ) : (
                        <h3>{wishlist.name}</h3>
                      ))}
                    {currentPage === Pages.ADD_ITEM && <h3>Add Item</h3>}
                    {currentPage === Pages.EDIT_ITEM && <h3>Edit Item</h3>}
                    {error && <p className="error-placeholder">{error}</p>}
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
                            style={{
                              backgroundColor: ownership?.primaryColor,
                            }}
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
                        currency={item.currency}
                        lastModified={new Intl.DateTimeFormat("en-US").format(
                          new Date(item.last_modified)
                        )}
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
                    {wishlistItems.length === 0 && (
                      <div className="wishlist-empty-placeholder">
                        <p>This wishlist has no items!</p>
                      </div>
                    )}
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
                  <>
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
                          onClick={() =>
                            setIsEditingWishlist(!isEditingWishlist)
                          }
                        />
                      ) : (
                        <Button
                          name="Edit List"
                          image={editIcon}
                          onClick={() =>
                            setIsEditingWishlist(!isEditingWishlist)
                          }
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
                    <div
                      className="wishlist-fixed-bottom-box more-button-container"
                      style={{ backgroundColor: ownership.backgroundColor }}
                    >
                      {isEditingWishlist ? (
                        <Button
                          name="Complete Editing"
                          style="more-button"
                          onClick={() =>
                            setIsEditingWishlist(!isEditingWishlist)
                          }
                        />
                      ) : (
                        <Button
                          name={menuOpen ? "Close Menu" : "More Options"}
                          style="more-button"
                          onClick={() => setMenuOpen(!menuOpen)}
                        />
                      )}
                      <div
                        className={
                          "wishlist-menu-container" +
                          (!menuOpen ? " hide-menu" : "")
                        }
                      >
                        {menuOpen && (
                          <div className="wishlist-menu-items">
                            <Button
                              name="Add Item"
                              image={addIcon}
                              style={isEditingWishlist ? "disabled" : ""}
                              onClick={() => {
                                setCurrentPage(Pages.ADD_ITEM);
                                setMenuOpen(false);
                                setEditingItem(null);
                              }}
                            />
                            <Button
                              name="Edit List"
                              image={editIcon}
                              onClick={() => {
                                setIsEditingWishlist(!isEditingWishlist);
                                setMenuOpen(false);
                              }}
                            />
                            <Button
                              name="Share List"
                              image={linkIcon}
                              style={isEditingWishlist ? "disabled" : ""}
                              onClick={() => setMenuOpen(false)}
                            />
                            <Button
                              name="Delete List"
                              image={binIcon}
                              style={isEditingWishlist ? "disabled" : ""}
                              onClick={() => {
                                setConfirmationModal(true);
                                setMenuOpen(false);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              {wishlist.owner !== currentUser?.id && (
                <div
                  className="wishlist-fixed-bottom-box display-on"
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
        )}
        {!authorized && (
          <div className="unauthorized-access-placeholder">
            <p>You don't have access to this wishlist!</p>
          </div>
        )}
      </ScreenFrame>
    </>
  );
}

export default WishlistPage;
