import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchWishlists() {
  try {
    const response = await axios.get(`${API_BASE_URL}/wishlists/retrieve/my`, {
      withCredentials: true,
    });
    return response.data.wishlists;
  } catch (err) {
    console.error(
      "Wishlists retrieval failed:",
      err.response?.data || err.message
    );
  }
}

export async function fetchWishlist(id) {
  try {
    const wishlistResponse = await axios.get(
      `${API_BASE_URL}/wishlists/${id}`,
      {
        withCredentials: true,
      }
    );
    return wishlistResponse.data.wishlistDetails;
  } catch (error) {
    console.error("Error fetching wishlist:", error.response?.data || error);
  }
}

export async function createWishlist(name, privacyStatus) {
  try {
    await axios.post(
      `${API_BASE_URL}/wishlists/create`,
      {
        name,
        privacyStatus,
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.error(
      "Wishlist created failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function setPrivacyStatus(isPrivate, wishlist) {
  try {
    const newStatus = !isPrivate;
    await axios.post(
      `${API_BASE_URL}/wishlists/privacy/set`,
      {
        id: wishlist.id,
        privacyStatus: newStatus,
      },
      {
        withCredentials: true,
      }
    );
    return newStatus;
  } catch (error) {
    console.error(
      "Error setting privacy status:",
      error.response?.data || error
    );
  }
}

export async function saveWishlist(id) {
  try {
    const wishlist = await axios.post(
      `${API_BASE_URL}/wishlists/save/${id}`,
      null,
      {
        withCredentials: true,
      }
    );
    return wishlist.data;
  } catch (error) {
    console.error("Error saving wishlist:", error.response?.data || error);
  }
}

export async function unsaveWishlist(id) {
  try {
    const wishlist = await axios.post(
      `${API_BASE_URL}/wishlists/unsave/${id}`,
      null,
      {
        withCredentials: true,
      }
    );
    return wishlist.data;
  } catch (error) {
    console.error("Error unsaving wishlist:", error.response?.data || error);
  }
}

export async function fetchSavedWishlists() {
  try {
    const wishlists = await axios.get(
      `${API_BASE_URL}/wishlists/retrieve/saved`,
      {
        withCredentials: true,
      }
    );
    return wishlists.data.wishlists;
  } catch (error) {
    console.error(
      "Error fetching saved wishlists:",
      error.response?.data || error
    );
  }
}

export async function fetchPercentageComplete(wishlistId) {
  try {
    const wishlist = await axios.post(
      `${API_BASE_URL}/wishlists/percentage`,
      { wishlistId },
      {
        withCredentials: true,
      }
    );
    return wishlist.data.percentage;
  } catch (error) {
    console.error("Error fetching percentage:", error.response?.data || error);
  }
}
