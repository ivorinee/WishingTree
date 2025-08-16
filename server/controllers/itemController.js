import {
  insertItem,
  modifyItem,
  removeItem,
  getItems,
  setReceived,
  setReserved,
  getReservedItemsById,
} from "../models/itemModel.js";

export async function addItem(req, res) {
  const { id } = req.params;
  const { name, desc, link, price, priority } = req.body;
  const parsedPrice = parseFloat(price);
  try {
    await insertItem(name, id, desc, link, parsedPrice, priority);
    return res.status(200).json({ message: "Item added successfully" });
  } catch (err) {
    console.error("Item error:", err);
    return res.status(500).json({ message: "Error adding item to wishlist" });
  }
}

export async function editItem(req, res) {
  const { name, itemId, desc, link, price, priority } = req.body;
  try {
    await modifyItem(itemId, name, desc, link, price, priority);
    return res.status(200).json({ message: "Item edited successfully" });
  } catch (err) {
    console.error("Item error:", err);
    return res.status(500).json({ message: "Error editing item in wishlist" });
  }
}

export async function deleteItem(req, res) {
  const { itemId } = req.body;
  try {
    await removeItem(itemId);
    return res.status(200).json({ message: "Item removed successfully" });
  } catch (err) {
    console.error("Item error:", err);
    return res.status(500).json({ message: "Error removing item in wishlist" });
  }
}

export async function getItemsInWishlist(req, res) {
  const { id } = req.params;
  try {
    const items = await getItems(id);
    return res
      .status(200)
      .json({ message: "Item retrieved successfully", items });
  } catch (err) {
    console.error("Item error:", err);
    return res
      .status(500)
      .json({ message: "Error retrieving item in wishlist" });
  }
}

export async function setItemAsReceived(req, res) {
  const { itemId } = req.body;
  try {
    await setReceived(itemId, true);
    return res.status(200).json({ message: "Item received" });
  } catch (err) {
    console.error("Item error:", err);
    return res.status(500).json({ message: "Error setting item as received" });
  }
}

export async function setItemAsUnreceived(req, res) {
  const { itemId } = req.body;
  try {
    await setReceived(itemId, false);
    return res.status(200).json({ message: "Item unreceived" });
  } catch (err) {
    console.error("Item error:", err);
    return res
      .status(500)
      .json({ message: "Error setting item as unreceived" });
  }
}

export async function setItemAsReserved(req, res) {
  const userId = req.user.id;
  const { itemId } = req.body;
  try {
    const item = await setReserved(itemId, userId);
    return res.status(200).json({ message: "Item reserved", item });
  } catch (err) {
    console.error("Item error:", err);
    return res.status(500).json({ message: "Error setting item as reserved" });
  }
}

export async function setItemAsUnreserved(req, res) {
  const { itemId } = req.body;
  try {
    const item = await setReserved(itemId, null);
    return res.status(200).json({ message: "Item unreserved", item });
  } catch (err) {
    console.error("Item error:", err);
    return res
      .status(500)
      .json({ message: "Error setting item as unreserved" });
  }
}

export async function getReservedItems(req, res) {
  const userId = req.user.id;
  try {
    const item = await getReservedItemsById(userId);
    return res.status(200).json({ message: "Item reserved", item });
  } catch (err) {
    console.error("Item error:", err);
    return res.status(500).json({ message: "Error getting reserved items" });
  }
}
