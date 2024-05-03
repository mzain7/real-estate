import express from "express";
import {
  updateUser,
  deleteUser,
  getUserProperties,
  getUserDetails,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", getUserDetails);
router.get("/properties/:id", verifyUser, getUserProperties);

export default router;
