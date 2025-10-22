import { pool } from "../config/db.js";

export async function generateUnique4DigitCode() {
  // user ID generator
  let unique = false;
  let code;

  while (!unique) {
    code = Math.floor(1000 + Math.random() * 9000);
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      code,
    ]);
    if (result.rowCount === 0) {
      unique = true;
    }
  }

  return code;
}

export async function generateUnique5DigitCode() {
  // wishlist ID generator
  let unique = false;
  let code;

  while (!unique) {
    code = Math.floor(10000 + Math.random() * 90000);
    const result = await pool.query("SELECT * FROM wishlists WHERE id = $1", [
      code,
    ]);
    if (result.rowCount === 0) {
      unique = true;
    }
  }

  return code;
}

export async function generateUnique6DigitCode() {
  // wishlist item ID generator
  let unique = false;
  let code;

  while (!unique) {
    code = Math.floor(100000 + Math.random() * 900000);
    const result = await pool.query(
      "SELECT * FROM wishlist_items WHERE id = $1",
      [code]
    );
    if (result.rowCount === 0) {
      unique = true;
    }
  }

  return code;
}

export function generateAuthorizationCode(length = 20) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => characters[n % characters.length]).join("");
}

export function generateWishlistURL(wishlistId, authorizationCode) {
  return `https://ivorinee.github.io/wishing-tree/wishlist/${wishlistId}?auth=${authorizationCode}`;
}

export function generateProfileIcon() {
  return Math.floor(1 + Math.random() * 8);
}
