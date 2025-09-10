import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchCurrentUser() {
  try {
    const result = await axios.get(`${API_BASE_URL}/users/name/my`, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error);
  }
}

export async function fetchUserDetails(id) {
  try {
    const result = await axios.post(
      `${API_BASE_URL}/users/user`,
      { userId: id },
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error);
  }
}

export async function searchUsers(query) {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/search/${query}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error searching for user:", error.response?.data || error);
  }
}

export async function handleSendRequest(id, onButtonClick) {
  try {
    await axios.post(
      `${API_BASE_URL}/users/sendrequest`,
      { requestId: id },
      {
        withCredentials: true,
      }
    );
    onButtonClick();
  } catch (error) {
    console.error(
      "Error sending friend request:",
      error.response?.data || error
    );
  }
}

export async function acceptRequest(id, onButtonClick) {
  try {
    await axios.post(
      `${API_BASE_URL}/users/acceptrequest`,
      { requestId: id },
      {
        withCredentials: true,
      }
    );
    onButtonClick();
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error);
  }
}

export async function rejectRequest(id, onButtonClick) {
  try {
    await axios.post(
      `${API_BASE_URL}/users/rejectrequest`,
      { requestId: id },
      {
        withCredentials: true,
      }
    );
    onButtonClick();
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error);
  }
}

export async function removeFriend(id) {
  try {
    await axios.post(
      `${API_BASE_URL}/users/removefriend`,
      { friendId: id },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error unfriending user:", error.response?.data || error);
  }
}
