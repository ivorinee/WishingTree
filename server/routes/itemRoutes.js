import express from "express";
import {
  addItem,
  editItem,
  getItemsInWishlist,
  setItemAsReceived,
  setItemAsReserved,
  setItemAsUnreserved,
  getReservedItems,
} from "../controllers/itemController.js";

const router = express.Router();

router.post("/:id/add", addItem);
router.post("/edit", editItem);
router.get("/:id/retrieve", getItemsInWishlist);
router.post("/received", setItemAsReceived);
router.post("/unreceived", setItemAsReceived);
router.post("/reserve", setItemAsReserved);
router.post("/unreserve", setItemAsUnreserved);
router.get("/reserved/my", getReservedItems);

export default router;
