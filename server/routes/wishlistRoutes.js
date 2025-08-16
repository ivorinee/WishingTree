import express from "express";
import {
  createWishlist,
  deleteWishlist,
  getUserWishlists,
  getOwnWishlists,
  getWishlistDetails,
  setPrivacyStatus,
  saveWishlist,
  unsaveWishlist,
  getSavedWishlists,
  calculatePercentageComplete,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/create", createWishlist);
router.post("/delete", deleteWishlist);
router.get("/retrieve/my", getOwnWishlists);
router.get("/retrieve/user", getUserWishlists);
router.get("/:id", getWishlistDetails);
router.post("/privacy/set", setPrivacyStatus);
router.post("/save/:id", saveWishlist);
router.post("/unsave/:id", unsaveWishlist);
router.get("/retrieve/saved", getSavedWishlists);
router.post("/percentage", calculatePercentageComplete);

export default router;
