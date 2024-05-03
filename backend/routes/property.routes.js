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

const router = express.Router();

router.post("/", verifyUser, createProperty);
router.delete("/:id", verifyUser, deleteProperty);
router.put("/:id", verifyUser, updateProperty);
router.get("/:id", getProperty);
router.get("/", getProperties);
router.get("/get-visited", getVisitedProperties);

export default router;
