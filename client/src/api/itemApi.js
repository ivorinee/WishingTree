import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchWishlistItems(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/item/${id}/retrieve`, {
      withCredentials: true,
    });
    return response.data.items;
  } catch (error) {
    console.error(
      "Error fetching wishlist items:",
      error.response?.data || error
    );
  }
}

export async function addItemToWishlist(id, name, desc, link, price, currency, priority) {
  try {
    await axios.post(
      `${API_BASE_URL}/item/${id}/add`,
      {
        name,
        desc,
        link,
        price: parseFloat(price),
        currency,
        priority,
      },
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error creating item:", error.response?.data || error);
  }
}

export async function editItemInWishlist(
  id,
  name,
  desc,
  link,
  price,
  currency,
  priority
) {
  try {
    await axios.post(
      `${API_BASE_URL}/item/edit`,
      {
        itemId: id,
        name,
        desc,
        link,
        price: parseFloat(price),
        currency,
        priority,
      },
      { credential: true }
    );
  } catch (error) {
    console.error("Error editing item:", error.response?.data || error);
  }
}

export async function deleteItemInWishlist(id) {
  try {
    await axios.post(
      `${API_BASE_URL}/item/delete`,
      {
        itemId: id,
      },
      { credential: true }
    );
  } catch (error) {
    console.error("Error deleting item:", error.response?.data || error);
  }
}

export async function setReceived(state, id) {
  try {
    await axios.post(
      `${API_BASE_URL}/item/${state}`,
      { itemId: id },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(
      "Error setting item as received:",
      error.response?.data || error
    );
  }
}

export async function setReserve(state, id) {
  try {
    await axios.post(
      `${API_BASE_URL}/item/${state}`,
      { itemId: id },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error reserving item:", error.response?.data || error);
  }
}

export async function getReservedItems() {
  try {
    const response = await axios.get(`${API_BASE_URL}/item/reserved/my`, {
      withCredentials: true,
    });
    return response.data.item;
  } catch (error) {
    console.error(
      "Error getting reserved items:",
      error.response?.data || error
    );
  }
}
