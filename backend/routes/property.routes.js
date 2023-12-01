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

router.post("/create", verifyUser,setOriginControl, createProperty);
router.delete("/delete/:id", verifyUser,setOriginControl, deleteProperty);
router.post("/update/:id", verifyUser,setOriginControl, updateProperty);
router.get("/get/:id",setOriginControl, getProperty);
router.get("/get",setOriginControl, getProperties);
router.get("/get-visited",setOriginControl, getVisitedProperties);

export default router;
