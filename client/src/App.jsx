import { Routes, Route } from "react-router";
import PrivateRoute from "./components/PrivateRoute.jsx";
import LandingPage from "./pages/LandingPage";
import UnwrapGiftPage from "./pages/UnwrapGiftPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import WishlistPage from "./pages/WishlistPage";
import FriendListPage from "./pages/FriendListPage";
import SearchPage from "./pages/SearchPage";
import ReservedGiftPage from "./pages/ReservedGiftPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/unwrap-gift" element={<UnwrapGiftPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/wishlist/:id" element={<WishlistPage />} />
        <Route path="/friends" element={<PrivateRoute><FriendListPage /></PrivateRoute>} />
        <Route path="/search/:query" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
        <Route path="/reserved-gifts" element={<PrivateRoute><ReservedGiftPage /></PrivateRoute>} />
        <Route path="/user/:id" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
