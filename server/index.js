import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";

import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Adjust for your frontend URL
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/wishlists", wishlistRoutes);
app.use("/item", itemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});