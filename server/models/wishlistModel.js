import { pool } from "../config/db.js";
import { generateUnique5DigitCode } from "./idModel.js";

export async function insertWishlist(nameId, wishlistName, privacyStatus) {
  const id = await generateUnique5DigitCode();
  const baseUrl = process.env.CLIENT_BASE_URL || "http://localhost:5173";
  const link = `${baseUrl}/wishlist-${id}`;

  const result = await pool.query(
    `INSERT INTO wishlists (id, owner, name, privacy_status, share_link) 
    VALUES ($1, $2, $3, $4, $5)`,
    [id, nameId, wishlistName, privacyStatus, link]
  );

  return result.rows[0];
}

export async function removeWishlist(wishlistId) {
  const result = await pool.query("DELETE FROM wishlists WHERE id = $1", [
    wishlistId,
  ]);

  return result.rows[0];
}

export async function getWishlistByOwner(ownerId) {
  const result = await pool.query("SELECT * FROM wishlists WHERE owner = $1", [
    ownerId,
  ]);
  return result.rows;
}

export async function getWishlistById(id) {
  const result = await pool.query("SELECT * FROM wishlists WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
}

export async function updatePrivacyStatus(id, status) {
  const result = await pool.query(
    "UPDATE wishlists SET privacy_status = $1 WHERE id = $2",
    [status, id]
  );
  return result.rows[0];
}

export async function getWishlistsByUser(id) {
  const result = await pool.query("SELECT * FROM wishlists WHERE owner = $1", [
    id,
  ]);
  return result.rows;
}

export async function insertToSavedWishlist(nameId, wishlistId) {
  const result = await pool.query(
    `UPDATE wishlists 
    SET saved_by = array_append(saved_by, $1) 
    WHERE id = $2 
      AND NOT (saved_by @> ARRAY[$1::smallint])`,
    [nameId, wishlistId]
  );
  return result.rows;
}

export async function removeFromSavedWishlist(nameId, wishlistId) {
  const result = await pool.query(
    `UPDATE wishlists 
    SET saved_by = array_remove(saved_by, $1) 
    WHERE id = $2`,
    [nameId, wishlistId]
  );
  return result.rows;
}

export async function getSavedWishlistsByUser(id) {
  const result = await pool.query(
    "SELECT * FROM wishlists WHERE saved_by @> ARRAY[$1::smallint]",
    [id]
  );
  return result.rows;
}
