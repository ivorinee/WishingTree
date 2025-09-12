import ScreenFrame from "../components/ScreenFrame";
import binder from "../assets/binder-2.svg";
import birthdayIcon from "../assets/birthday.svg";
import graduationIcon from "../assets/graduation.svg";
import anniversaryIcon from "../assets/anniversary.svg";
import secretSantaIcon from "../assets/santa.svg";
import babyShowerIcon from "../assets/baby-shower.svg";
import "./styles/UnwrapGiftPage.css";

function UnwrapGiftPage() {
  const giftPlanSteps = [
    {
      step: "01",
      title: "Drop the hints — directly",
      description:
        "Add gifts to your wishlist, complete with links and notes.",
    },
    {
      step: "02",
      title: "Share your wishlist",
      description:
        "Send it to friends and family. Keep it public or private — you’re in charge.",
    },
    {
      step: "03",
      title: "They pick. You smile.",
      description:
        "Gifts get reserved behind the scenes. No awkward fake reactions. Just joyful surprises.",
    },
  ];

  const occasions = [
    { name: "Birthday", icon: birthdayIcon },
    { name: "Graduation", icon: graduationIcon },
    { name: "Anniversary", icon: anniversaryIcon },
    { name: "Secret Santa", icon: secretSantaIcon },
    { name: "Baby Shower", icon: babyShowerIcon },
  ];

  return (
    <ScreenFrame>
      <div className="unwrap-gift-main-container">
        <div className="gift-plan-container">
          <h1>The Gift Plan</h1>
          <div className="gift-plan-cards">
            {giftPlanSteps.map(({ step, title, description }) => (
              <div className="gift-plan-card" key={step}>
                <h2>{step}</h2>
                <div className="card-text">
                  <p className="text-bold">{title}</p>
                  <p className="text-light">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <div />
          <div className="gift-plan-occasion-wrapper">
            <div className="gift-plan-occasion-binder">
              <img src={binder} alt="binder" />
              <div className="gift-plan-occasion-title">
                <h1>OCCASION</h1>
              </div>
              <img src={binder} alt="binder" />
            </div>
            <div className="gift-plan-occasion-container">
              {occasions.map(({ name, icon }) => (
                <div className="gift-plan-occasion">
                  <img src={icon} alt={name} />
                  <p>{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}

export default UnwrapGiftPage;
