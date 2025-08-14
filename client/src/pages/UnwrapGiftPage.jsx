import ScreenFrame from "../components/ScreenFrame";
import "./styles/UnwrapGiftPage.css";

function UnwrapGiftPage() {
  return (
    <ScreenFrame>
      <div className="unwrap-gift-main-container">
        <div className="gift-plan-container">
          <h1>The Gift Plan</h1>
          <div className="gift-plan-cards">
              <div className="gift-plan-card">
                <h2>01</h2>
                <div className="card-text">
                    <p className="text-bold">Drop the hints — directly</p>
                    <p className="text-light">
                      Add gifts to your wishlist, complete with links, notes, and
                      photos.
                    </p>
                </div>
              </div>
              <div className="gift-plan-card">
                <h2>02</h2>
                <div className="card-text">
                    <p className="text-bold">Share your wishlist</p>
                    <p className="text-light">
                      Send it to friends and family. Keep it public or private — you’re
                      in charge.
                    </p>
                </div>
              </div>
              <div className="gift-plan-card">
                <h2>03</h2>
                <div className="card-text">
                    <p className="text-bold">They pick. You smile.</p>
                    <p className="text-light">
                      Gifts get reserved behind the scenes. No awkward fake reactions.
                      Just joyful surprises.
                    </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

export default UnwrapGiftPage;
