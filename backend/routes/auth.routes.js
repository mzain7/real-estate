import express from "express";
import {
  signup,
  login,
  google,
  logout,
} from "../controllers/auth.controller.js";
import { setOriginControl } from "../utils/setOriginControl.js";

const router = express.Router();

router.post("/signup", setOriginControl, signup);
router.post("/login", setOriginControl, login);
router.post("/google", setOriginControl, google);
router.get("/logout", setOriginControl, logout);

export default router;
