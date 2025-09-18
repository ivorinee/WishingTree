import Button from "./Button";
import { useNavigate } from "react-router";
import priceIcon from "../assets/price-icon.svg";
import linkIcon from "../assets/link-icon.svg";
import "./styles/ReservedGiftItem.css";

function ReservedGiftItem({
  id,
  recipient,
  itemName,
  price,
  description,
  link,
  wishlistId,
  unreserve,
}) {
  const navigate = useNavigate();

  return (
    <div className="reserved-gift-container">
      <div className="reserved-gift-top-container">
        <p className="reserved-gift-recipient">For: {recipient}</p>
        <Button
          style="view-wishlist-button"
          onClick={() => navigate(`../wishlist/${wishlistId}`)}
        >
          <span className="text">View Wishlist</span>
          <span className="arrow">&gt;</span>
        </Button>
      </div>
      <div className="reserved-gift-bottom-container">
        <div className="reserved-gift-details">
          <div className="reserved-gift-name-price">
            <p className="reserved-gift-name">{itemName}</p>
            <div className="reserved-gift-price">
              <img src={priceIcon} alt="Price" />
              <p>{price}</p>
            </div>
          </div>
          <p className="reserved-gift-description">{description}</p>
        </div>
        <div className="reserved-gift-actions">
          {link && (
            <Button
              image={linkIcon}
              style="link-button"
              onClick={() => window.open({ link }, "_blank")}
            />
          )}
          <Button
            name="Unreserve"
            style="unreserve-button"
            onClick={() => unreserve(id)}
          />
        </div>
      </div>
    </div>
  );
}

export default ReservedGiftItem;
