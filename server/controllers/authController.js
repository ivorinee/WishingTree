import bcrypt from "bcrypt";
import passport from "passport";
import { createUser, checkUserExists } from "../models/userModel.js";

const SALT_ROUNDS = 10;

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (await checkUserExists(email)) {
      return res.status(409).json({ message: "This email is already registered. Please log in or use a different one." });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser(name, email, hashedPassword);
    return res.status(201).json({ message: "User registered successfully.", user });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Error registering user." });
  }
}

export function loginUser(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).json({ message: "Authentication error." });
    }

    if (!user) {
      return res.status(401).json({ message: info?.message });
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        console.error("Login error:", loginErr);
        return res.status(500).json({ message: "Login error." });
      }

      return res.status(200).json({ message: "Login successful.", user });
    });
  })(req, res, next);
}

export async function logoutUser(req, res) {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout error" });
    return res.status(200).json({ message: "Logged out successfully" });
  });
}

export async function checkAuth(req, res) {
  if (req.isAuthenticated()) {
    return res.status(200).json({ loggedIn: true, user: req.user });
  }
  return res.status(401).json({ loggedIn: false });
}
