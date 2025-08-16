import { useState } from "react";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";
import { setReceived, setReserve } from "../api/itemApi";
import priceIcon from "../assets/price-icon.svg";
import linkIcon from "../assets/link-icon.svg";
import receivedIcon from "../assets/received-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import binIcon from "../assets/small-bin-icon.svg";
import cancelIcon from "../assets/cancel-icon.svg";
import undoIcon from "../assets/undo-icon.svg";
import "./styles/WishlistItem.css";

function WishlistItem({
  id,
  name,
  description,
  priority,
  lastModified,
  price,
  link,
  received,
  reserved,
  editing,
  setEditItem,
  colourScheme,
  owner,
  currentUserId,
  refreshPage,
}) {
  const [hasReceived, setHasReceived] = useState(received);
  const [reservedBy, setReservedBy] = useState(reserved);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const priorityColors = {
    HIGH: "#E76F6F",
    MEDIUM: "#FFBC40",
    LOW: "#9CF3A6",
  };
  const effectivePriorityColor = hasReceived
    ? "#1515154D"
    : priorityColors[priority];

  async function markAsReceived() {
    setHasReceived(true);
    setReceived("received", id);
  }

  async function markAsUnreceived() {
    setHasReceived(false);
    setReceived("unreceived", id);
  }

  async function reserveItem() {
    setReservedBy(currentUserId);
    setReserve("reserve", id);
  }

  async function unreserveItem() {
    setReservedBy(null);
    setReserve("unreserve", id);
  }

  return (
    <>
      {confirmationModal && (
        <ConfirmationModal
          type="item"
          id={id}
          onClose={() => setConfirmationModal(false)}
          refresh={refreshPage}
        />
      )}
      <div className="wishlist-item">
        <div
          className={`wishlist-item-container ${
            editing ? "wishlist-item-editing" : ""
          }`}
          style={{
            backgroundColor: hasReceived
              ? "#FFFFFF"
              : colourScheme.backgroundColor,
          }}
        >
          <div className="wishlist-item-content-container">
            {owner && hasReceived && (
              <div className="wishlist-item-owned">
                <p>OWNED</p>
              </div>
            )}
            <div className="wishlist-item-content">
              <div className="wishlist-item-name-tag">
                <p className="wishlist-item-name">{name}</p>
                <div
                  className="wishlist-item-priority "
                  style={{ backgroundColor: effectivePriorityColor }}
                >
                  <p>{priority}</p>
                </div>
              </div>
              <p className="wishlist-item-description">{description}</p>
            </div>
          </div>
          <div className="wishlist-item-actions">
            <div className="wishlist-item-details">
              <p className="wishlist-item-modified">
                Last Modified: {lastModified}
              </p>
              <div className="wishlist-item-price">
                <img src={priceIcon} alt="Price" />
                <p>{price}</p>
              </div>
            </div>
            <div className="wishlist-item-buttons">
              <Button image={linkIcon} style="link-button" />
              {owner &&
                (hasReceived ? (
                  <Button
                    name="Undo Received"
                    image={undoIcon}
                    style="mark-received-reserve-button white-background"
                    onClick={markAsUnreceived}
                  />
                ) : (
                  <Button
                    name="Mark as Received"
                    image={receivedIcon}
                    style="mark-received-reserve-button"
                    onClick={markAsReceived}
                  />
                ))}
              {!owner && (
                <>
                  {hasReceived ? (
                    <Button
                      name="Already Owned"
                      image={receivedIcon}
                      style="mark-received-reserve-button disabled"
                      disabled
                    />
                  ) : reservedBy !== null ? (
                    reservedBy === currentUserId ? (
                      <Button
                        name="Unreserve Gift"
                        image={cancelIcon}
                        style="mark-received-reserve-button  white-background"
                        onClick={unreserveItem}
                      />
                    ) : (
                      <Button
                        name={`Reserved by: ${reservedBy}`}
                        style="mark-received-reserve-button orange-background disabled"
                        disabled
                      />
                    )
                  ) : (
                    <Button
                      name="Reserve Gift"
                      image={editIcon}
                      style="mark-received-reserve-button orange-background"
                      onClick={reserveItem}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {editing && (
          <div className="wishlist-item-editing-container">
            {!hasReceived && (
              <Button
                image={editIcon}
                style="edit-item-button "
                onClick={() => {
                  setEditItem({ id, name, description, priority, price, link });
                }}
              />
            )}
            <Button
              image={binIcon}
              style="delete-item-button"
              onClick={() => setConfirmationModal(true)}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default WishlistItem;
