import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addFacility,
  delFacility,
  getFacilities,
  getFacility,
  updFacility,
} from "../controllers/facilities.controller.js";

const router = express.Router();

router.get("/", getFacilities);
router.get("/:id", getFacility);
router.post("/", verifyToken, addFacility);
router.put("/:id", verifyToken, updFacility);
router.delete("/:id", verifyToken, delFacility);

export default router;
