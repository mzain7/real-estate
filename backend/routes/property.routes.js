import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createProperty,
  deleteProperty,
  getProperty,
  getProperties,
  updateProperty,
  getVisitedProperties,
} from "../controllers/property.controller.js";
import { setOriginControl } from "../utils/setOriginControl.js";

const router = express.Router();

router.post("/create", verifyUser, createProperty);
router.delete("/delete/:id", verifyUser, deleteProperty);
router.post("/update/:id", verifyUser, updateProperty);
router.get("/get/:id", getProperty);
router.get("/get",setOriginControl, getProperties);
router.get("/get-visited", getVisitedProperties);

export default router;
