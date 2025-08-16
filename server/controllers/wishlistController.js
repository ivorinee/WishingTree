import {
  insertWishlist,
  removeWishlist,
  getWishlistByOwner,
  getWishlistById,
  updatePrivacyStatus,
  insertToSavedWishlist,
  removeFromSavedWishlist,
  getSavedWishlistsByUser,
} from "../models/wishlistModel.js";

import { getItems, getUnreceivedItems } from "../models/itemModel.js";

export async function createWishlist(req, res) {
  const userId = req.user.id;
  const { name, privacyStatus } = req.body;
  try {
    const wishlist = await insertWishlist(userId, name, privacyStatus);
    return res
      .status(200)
      .json({ message: "Wishlist created successfully", wishlist });
  } catch (err) {
    console.error("Wishlist error:", err);
    return res.status(500).json({ message: "Error creating wishlist" });
  }
}

export async function deleteWishlist(req, res) {
  const { wishlistId } = req.body;
  try {
    const wishlist = await removeWishlist(wishlistId);
    return res
      .status(200)
      .json({ message: "Wishlist deleted successfully", wishlist });
  } catch (err) {
    console.error("Wishlist error:", err);
    return res.status(500).json({ message: "Error deleting wishlist" });
  }
}

export async function getUserWishlists(req, res) {
  const userId = req.user.id;
  try {
    const wishlists = await getWishlistByOwner(userId);
    return res.status(200).json({ message: "Wishlists retrieved", wishlists });
  } catch (err) {
    console.error("Wishlist error:", err);
    return res.status(500).json({ message: "Error retrieving wishlists" });
  }
}

export async function getOwnWishlists(req, res) {
  const userId = req.user.id;
  try {
    const wishlists = await getWishlistByOwner(userId);
    return res.status(200).json({ message: "Wishlists retrieved", wishlists });
  } catch (err) {
    console.error("Wishlist error:", err);
    return res.status(500).json({ message: "Error retrieving wishlists" });
  }
}

export async function getWishlistDetails(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const wishlistDetails = await getWishlistById(id);
    if (
      wishlistDetails.owner === userId ||
      wishlistDetails.privacy_status == false
    ) {
      return res.status(200).json({
        message: "Wishlist Details retrieved",
        wishlistDetails,
        owner: true,
      });
    }
    return res.status(403).json({ message: "No permission to view wishlist" });
  } catch (err) {
    console.error("Wishlist error:", err);
    return res
      .status(500)
      .json({ message: "Error retrieving wishlist details" });
  }
}

export async function setPrivacyStatus(req, res) {
  const { id, privacyStatus } = req.body;
  try {
    const wishlist = await updatePrivacyStatus(id, privacyStatus);
    return res.status(200).json({ message: "Wishlist updated:", wishlist });
  } catch (err) {
    console.error("Wishlist error:", err);
    return res.status(500).json({ message: "Error updating privacy status" });
  }
}

export async function saveWishlist(req, res) {
  console.log("req.user:", req.user);
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const wishlist = await insertToSavedWishlist(userId, id);
    return res.status(200).json({ message: "Wishlist updated:", wishlist });
  } catch (err) {
    console.error("Wishlist error:", err);
    return res.status(500).json({ message: "Error updating saved by" });
  }
}

export async function unsaveWishlist(req, res) {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    const wishlist = await removeFromSavedWishlist(userId, id);
    return res.status(200).json({ message: "Wishlist updated:", wishlist });
  } catch (err) {
    console.error("Wishlist error:", err);
    return res.status(500).json({ message: "Error updating saved by" });
  }
}

export async function getSavedWishlists(req, res) {
  const userId = req.user.id;
  try {
    const wishlists = await getSavedWishlistsByUser(userId);
    return res.status(200).json({ message: "Wishlist retrieved:", wishlists });
  } catch (err) {
    console.error("Wishlist error:", err);
    return res
      .status(500)
      .json({ message: "Error retrieving saved wishlsits" });
  }
}

export async function calculatePercentageComplete(req, res) {
  const { wishlistId } = req.body;
  try {
    const totalItems = await getItems(wishlistId);
    const unreceivedItems = await getUnreceivedItems(wishlistId);
    const percentage = Math.round(
      ((totalItems.length - unreceivedItems.length) / totalItems.length) * 100
    );
    if (totalItems.length === 0) {
      return res
        .status(200)
        .json({ message: "No items in wishlist", percentage: -1 });
    } else {
      return res
        .status(200)
        .json({ message: "Percentage complete", percentage });
    }
  } catch (err) {
    console.error("Percentage error:", err);
    return res
      .status(500)
      .json({ message: "Error calculating percentage items" });
  }
}
