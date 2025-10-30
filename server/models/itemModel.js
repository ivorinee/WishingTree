import { pool } from "../config/db.js";
import { generateUnique6DigitCode } from "./idModel.js";

export async function insertItem(
  name,
  wishlistId,
  desc,
  link,
  price,
  currency,
  priority
) {
  const itemId = await generateUnique6DigitCode();
  const result = await pool.query(
    `INSERT INTO wishlist_items (id, wishlist_id, name, description, price, currency, priority, link) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [itemId, wishlistId, name, desc, price, currency, priority, link]
  );
  return result.rows[0];
}

export async function modifyItem(itemId, name, desc, link, price, currency, priority) {
  const result = await pool.query(
    `UPDATE wishlist_items 
    SET name = $1, description = $2, price = $3, currency = $4, priority = $5, link = $6, last_modified = NOW() 
    WHERE id = $7`,
    [name, desc, price, currency, priority, link, itemId]
  );
  return result.rows[0];
}

export async function removeItem(itemId) {
  const result = await pool.query("DELETE FROM wishlist_items WHERE id = $1", [
    itemId,
  ]);
  return result.rows[0];
}

export async function getItems(wishlistId) {
  const result = await pool.query(
    `SELECT * FROM wishlist_items 
    WHERE wishlist_id = $1 
    ORDER BY received ASC, 
      CASE priority 
        WHEN 'HIGH' THEN 1
        WHEN 'MEDIUM' THEN 2
        WHEN 'LOW' THEN 3
        ELSE 4
      END ASC`,
    [wishlistId]
  );
  return result.rows;
}

export async function setReceived(itemId, bool) {
  const result = await pool.query(
    "UPDATE wishlist_items SET received = $1 WHERE id = $2",
    [bool, itemId]
  );
  return result.rows[0];
}

export async function setReserved(itemId, nameId) {
  const result = await pool.query(
    "UPDATE wishlist_items SET reserved_by = $1 WHERE id = $2",
    [nameId, itemId]
  );
  return result.rows[0];
}

export async function getReservedItemsById(nameId) {
  const result = await pool.query(
    "SELECT * FROM wishlist_items WHERE reserved_by = $1",
    [nameId]
  );
  return result.rows;
}

export async function getUnreceivedItems(wishlistId) {
  const result = await pool.query(
    "SELECT * FROM wishlist_items WHERE received = false AND wishlist_id = $1",
    [wishlistId]
  );
  return result.rows;
}
