import express from "express";
import {
  updateUser,
  deleteUser,
  getUserProperties,
  getUserDetails,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
import { setOriginControl } from "../utils/setOriginControl.js";

const router = express.Router();

router.post("/update/:id", verifyUser, setOriginControl, updateUser);
router.delete("/delete/:id", verifyUser, setOriginControl, deleteUser);
router.get("/properties/:id", verifyUser, setOriginControl, getUserProperties);
router.get("/details/:id", setOriginControl, getUserDetails);

export default router;
