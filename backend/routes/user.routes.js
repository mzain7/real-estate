import express from "express";
import {
  updateUser,
  deleteUser,
  getUserProperties,
  getUserDetails,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/properties/:id", verifyUser, getUserProperties);
router.get("/details/:id", getUserDetails);

export default router;
