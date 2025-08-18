import { Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import UnwrapGiftPage from "./pages/UnwrapGiftPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import WishlistPage from "./pages/WishlistPage";
import FriendListPage from "./pages/FriendListPage";
import SearchPage from "./pages/SearchPage";
import ReservedGiftPage from "./pages/ReservedGiftPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/unwrap-gift" element={<UnwrapGiftPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/wishlist/:id" element={<WishlistPage />} />
        <Route path="/friends" element={<FriendListPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/reserved-gifts" element={<ReservedGiftPage />} />
      </Routes>
    </>
  );
}

export default App;
