import express from "express";
import {
  findUser,
  getUserName,
  getOwnName,
  sendFriendRequest,
  acceptFriendRequest,
  unfriend,
  rejectFriendRequest,
  retrieveFriendRequests,
  retrieveFriends,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/search/:query", findUser);
router.get("/name/my", getOwnName);
router.get("/requests", retrieveFriendRequests);
router.get("/friends", retrieveFriends);
router.post("/user", getUserName);
router.post("/sendrequest", sendFriendRequest);
router.post("/acceptrequest", acceptFriendRequest);
router.post("/rejectrequest", rejectFriendRequest);
router.post("/removefriend", unfriend);

export default router;
