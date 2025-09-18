import {
  findUserById,
  findUserByName,
  insertFriend,
  insertFriendRequest,
  removeFriend,
  removeFriendRequest,
  getFriendRequests,
  getFriends,
  checkFriendRequestExists,
} from "../models/userModel.js";
import { getWishlistsByUser } from "../models/wishlistModel.js";

export async function findUser(req, res) {
  try {
    const { query } = req.params;
    let user;
    if (!isNaN(parseInt(query))) {
      user = await findUserById(query);
      if (!user) {
        return res.status(200).json({ message: "User not found" });
      }
    } else {
      const users = await findUserByName(query);
      const enrichedUsers = await Promise.all(
        users.map(async (u) => {
          const wishlists = await getWishlistsByUser(u.id);
          return {
            ...u,
            wishlistCount: wishlists.length,
          };
        })
      );
      return res.status(200).json(enrichedUsers);
    }

    const wishlists = await getWishlistsByUser(user.id);
    return res.status(200).json([{ ...user, wishlistCount: wishlists.length }]);
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ message: "Error finding user" });
  }
}

export async function getUser(req, res) {
  try {
    const { userId } = req.body;
    const user = await findUserById(userId);
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).json({ message: "Error finding user" });
  }
}

export async function getOwnName(req, res) {
  try {
    const userId = req.user.id;
    const user = await findUserById(userId);
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).json({ message: "Error finding user" });
  }
}

export async function retrieveFriendRequests(req, res) {
  try {
    const userId = req.user.id;
    const requests = await getFriendRequests(userId);
    return res
      .status(200)
      .json({ message: "Friend requests retrieved", requests });
  } catch (err) {
    console.error("Error getting friend requests:", err);
    return res.status(500).json({ message: "Error getting friend requests" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const userId = req.user.id;
    const { requestId } = req.body;
    const parsedId = parseInt(requestId);
    const hasMutualRequest = await checkFriendRequestExists(parsedId, userId);
    console.log(hasMutualRequest);
    if (hasMutualRequest) {
      await removeFriendRequest(parsedId, userId);
      await insertFriend(userId, parsedId);
      await insertFriend(parsedId, userId);
      return res.status(200).json({
        message: "Friend request accepted automatically due to mutual requests",
      });
    } else {
      await insertFriendRequest(userId, parsedId);
      return res
        .status(200)
        .json({ message: "Friend request sent successfully" });
    }
  } catch (err) {
    console.error("Error sending friend request:", err);
    return res.status(500).json({ message: "Error sending friend request" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const userId = req.user.id;
    const { requestId } = req.body;
    const parsedId = parseInt(requestId);
    await removeFriendRequest(parsedId, userId);
    await insertFriend(userId, parsedId);
    await insertFriend(parsedId, userId);
    return res.status(200).json({ message: "Friend request accepted" });
  } catch (err) {
    console.error("Error accepting friend request:", err);
    return res.status(500).json({ message: "Error accepting friend request" });
  }
}

export async function retrieveFriends(req, res) {
  try {
    const userId = req.user.id;
    const friends = await getFriends(userId);
    return res.status(200).json({ message: "Friends retrieved", friends });
  } catch (err) {
    console.error("Error getting friend list:", err);
    return res.status(500).json({ message: "Error getting friend list" });
  }
}

export async function retrieveFriendsById(req, res) {
  try {
    const { id } = req.params;
    const friends = await getFriends(id);
    return res.status(200).json({ message: "Friends retrieved", friends });
  } catch (err) {
    console.error("Error getting friend list:", err);
    return res.status(500).json({ message: "Error getting friend list" });
  }
}

export async function rejectFriendRequest(req, res) {
  try {
    const userId = req.user.id;
    const { requestId } = req.body;
    const parsedId = parseInt(requestId);
    await removeFriendRequest(parsedId, userId);
    return res.status(200).json({ message: "Friend request rejected" });
  } catch (err) {
    console.error("Error rejecting friend request:", err);
    return res.status(500).json({ message: "Error rejecting friend request" });
  }
}

export async function unfriend(req, res) {
  try {
    const userId = req.user.id;
    const { friendId } = req.body;
    const parsedId = parseInt(friendId);
    await removeFriend(userId, parsedId);
    await removeFriend(parsedId, userId);
    return res.status(200).json({ message: "Friend removed" });
  } catch (err) {
    console.error("Error removing friend:", err);
    return res.status(500).json({ message: "Error removing friend" });
  }
}
