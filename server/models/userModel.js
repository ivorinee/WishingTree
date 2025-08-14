import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import { generateUnique4DigitCode } from "./idModel.js";

export async function findUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
}

export async function findUserByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}

export async function findUserByName(name) {
  const nameQuery = `%${name.toLowerCase()}%`;
  const result = await pool.query(
    "SELECT * FROM users WHERE LOWER(name) LIKE $1",
    [nameQuery]
  );
  return result.rows;
}

export async function createUser(name, email, password) {
  const id = await generateUnique4DigitCode();
  const result = await pool.query(
    "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)",
    [id, name, email, password]
  );
  return result.rows[0];
}

export async function checkUserExists(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rowCount > 0;
}

export async function validatePassword(inputPassword, hashedPassword) {
  return bcrypt.compare(inputPassword, hashedPassword);
}

export async function getFriendRequests(userId) {
  const result = await pool.query(
    "SELECT friend_requests FROM users WHERE id = $1",
    [userId]
  );
  return result.rows[0];
}

export async function insertFriendRequest(requesterId, requesteeId) {
  const result = await pool.query(
    `UPDATE users 
    SET friend_requests = array_append(friend_requests, $1) 
    WHERE id = $2 
      AND NOT (friend_requests @> ARRAY[$1::smallint])`,
    [requesterId, requesteeId]
  );
  return result.rows[0];
}

export async function removeFriendRequest(requesterId, requesteeId) {
  const result = await pool.query(
    "UPDATE users SET friend_requests = array_remove(friend_requests, $1) WHERE id = $2",
    [requesterId, requesteeId]
  );
  return result.rows[0];
}

export async function checkFriendRequestExists(requesterId, requesteeId) {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1 AND friend_requests @> ARRAY[$2::smallint]",
    [requesteeId, requesterId]
  );
  return result.rowCount > 0;
}

export async function getFriends(userId) {
  const result = await pool.query("SELECT friends FROM users WHERE id = $1", [
    userId,
  ]);
  return result.rows[0];
}

export async function insertFriend(id1, id2) {
  const result = await pool.query(
    `UPDATE users 
    SET friends = array_append(friends, $1) 
    WHERE id = $2 
      AND NOT (friends @> ARRAY[$1::smallint])`,
    [id1, id2]
  );
  return result.rows[0];
}

export async function removeFriend(id1, id2) {
  const result = await pool.query(
    "UPDATE users SET friends = array_remove(friends, $1) WHERE id = $2",
    [id1, id2]
  );
  return result.rows[0];
}
