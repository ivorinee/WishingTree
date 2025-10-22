import ScreenFrame from "./ScreenFrame";
import "./styles/LoadingScreen.css";

function LoadingScreen() {
  return (
    <ScreenFrame>
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    </ScreenFrame>
  );
}

export default LoadingScreen;
