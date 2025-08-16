import { useState } from "react";
import Button from "./Button";
import LabeledForm from "./LabeledForm";
import { createWishlist } from "../api/wishlistApi";
import lockIcon from "../assets/lock-icon.svg";
import unlockIcon from "../assets/unlock-icon.svg";
import closeButton from "../assets/close-button.svg";
import "./styles/NewWishlistModal.css";

function NewWishlistModal({ onClick, refreshWishlists }) {
  const [formValues, setFormValues] = useState({
    wishlistName: "",
    privacyStatus: true,
  });
  const fields = [
    { label: "Wishlist Name", name: "wishlistName", type: "text" },
  ];
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function togglePrivacy() {
    setFormValues((prev) => ({
      ...prev,
      privacyStatus: !prev.privacyStatus,
    }));
  }

  function validateInputs() {
    if (!formValues.wishlistName) {
      return "Please enter the name for your new wishlist.";
    }

    if (formValues.wishlistName.length > 100) {
      return "Wishlist name cannot exceed 100 characters.";
    }

    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    await createWishlist(formValues.wishlistName, formValues.privacyStatus);
    await refreshWishlists();
    onClick(false);
  }

  return (
    <div className="new-wishlist-modal-container disabled-pointer">
      <div className="new-wishlist-modal">
        <div className="new-wishlist-modal-header">
          <h3 className="new-wishlist-title">Create New Wishlist</h3>
          <Button
            image={closeButton}
            style="close-button"
            onClick={() => onClick(false)}
          />
        </div>
        <div className="new-wishlist-modal-contents">
          <LabeledForm
            fields={fields.slice(0, 1)}
            values={formValues}
            onChange={handleChange}
          />
          <div className="new-wishlist-privacy-status-container">
            <p>Privacy Status</p>
            <button
              className={`privacy-toggle ${
                formValues.privacyStatus ? "private" : ""
              }`}
              onClick={togglePrivacy}
            >
              <div
                className="privacy-thumb"
                style={{
                  backgroundColor: formValues.privacyStatus
                    ? "#FFFFFF"
                    : "#FFE770",
                }}
              >
                <img
                  src={formValues.privacyStatus ? lockIcon : unlockIcon}
                  alt={formValues.privacyStatus ? "Locked" : "Unlocked"}
                />
              </div>
            </button>
          </div>
        </div>
        <div className="error-placeholder-container">
          <p className="error-placeholder">{error}</p>
        </div>
        <Button
          name="CREATE"
          style="create-wishlist-button"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default NewWishlistModal;
