import { useState } from "react";
import Button from "./Button";
import { deleteItemInWishlist } from "../api/itemApi";
import { removeFriend } from "../api/userApi";
import confirmationBinIcon from "../assets/confirmation-bin-icon.svg";
import "./styles/ConfirmationModal.css";

function ConfirmationModal({ type, id, onClose, refresh }) {
  function getConfirmationText() {
    switch (type) {
      case "item":
        return "Are you sure you want to delete this item?";
      case "wishlist":
        return "Are you sure you want to delete this wishlist?";
      case "friend":
        return "Are you sure you want to remove this friend?";
      default:
        return "";
    }
  }

  async function handleDelete() {
    try {
      switch (type) {
        case "item":
          await deleteItemInWishlist(id);
          break;
        case "wishlist":
          //   await deleteWishlist(id);
          break;
        case "friend":
            await removeFriend(id);
          break;
        default:
          console.warn("Unknown delete type:", type);
      }
      refresh();
      onClose();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  return (
    <div className="modal-container disabled-pointer">
      <div className="confirmation-modal">
        <img src={confirmationBinIcon} />
        <p>{getConfirmationText()}</p>
        <div className="confirmation-modal-buttons">
          <Button name="Delete" onClick={handleDelete} />
          <Button name="Cancel" style="white-background" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
