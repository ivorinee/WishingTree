import { useState } from "react";
import axios from "axios";
import Button from "./Button";
import LabeledForm from "./LabeledForm";
import lockIcon from "../assets/lock-icon.svg";
import unlockIcon from "../assets/unlock-icon.svg";
import closeButton from "../assets/close-button.svg";
import "./styles/NewWishlistModal.css";

function NewWishlistModal({ onClick, refreshWishlists }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = axios.post(
        `${API_BASE_URL}/wishlists/create`,
        {
          name: formValues.wishlistName,
          privacyStatus: formValues.privacyStatus,
        },
        { withCredentials: true }
      );
      setError("");
      console.log("Wishlist created successful:", response.data);
      await refreshWishlists();
      onClick(false);
    } catch (error) {
      console.error(
        "Wishlist created failed:",
        error.response?.data || error.message
      );
    }
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
