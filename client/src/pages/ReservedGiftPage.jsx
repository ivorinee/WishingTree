import { useState, useEffect } from "react";
import ScreenFrame from "../components/ScreenFrame";
import ReservedGiftItem from "../components/ReservedGiftItem";
import { getReservedItems, setReserve } from "../api/itemApi";
import { fetchWishlist } from "../api/wishlistApi";
import { fetchUserDetails } from "../api/userApi";
import "./styles/ReservedGiftPage.css";

function ReservedGiftPage() {
  const [reservedGifts, setReservedGifts] = useState([]);
  const [recipients, setRecipients] = useState({});

  async function loadData() {
    const reservedGifts = await getReservedItems();
    setReservedGifts(reservedGifts);

    const ownerData = await Promise.all(
      reservedGifts.map(async (gift) => {
        const wishlistData = await fetchWishlist(gift.wishlist_id);
        const ownerId = wishlistData.owner;
        const userData = await fetchUserDetails(ownerId);

        return {
          wishlistId: gift.wishlist_id,
          name: userData.name,
        };
      })
    );

    const ownersMap = {};
    ownerData.forEach(({ wishlistId, name }) => {
      ownersMap[wishlistId] = name;
    });
    setRecipients(ownersMap);
  }

  async function unreserveGift(itemId) {
    await setReserve("unreserve", itemId);
    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScreenFrame>
      <div className="reserved-gift-page-main-container">
        <h1>Gifts You’ve Reserved</h1>
        <div className="reserved-gift-page-list-container">
          {reservedGifts.map((item) => (
            <ReservedGiftItem
              key={item.id}
              id={item.id}
              recipient={recipients[item.wishlist_id]}
              itemName={item.name}
              price={item.price}
              description={item.description}
              wishlistId={item.wishlist_id}
              unreserve={unreserveGift}
            />
          ))}
          {reservedGifts.length === 0 && (
            <p className="reserved-empty-placeholder">
              You haven't reserved any gifts yet.
            </p>
          )}
        </div>
      </div>
    </ScreenFrame>
  );
}

export default ReservedGiftPage;
