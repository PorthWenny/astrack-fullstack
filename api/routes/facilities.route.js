import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import {
  addFacility,
  delFacility,
  getFacilities,
  getFacilityTypes,
  getFacility,
  updFacility,
} from "../controllers/facilities.controller.js";

const router = express.Router();

router.get("/", getFacilities);
router.get("/types", getFacilityTypes);
router.get("/:id", getFacility);
router.post("/", verifyToken, checkAdmin, addFacility);
router.put("/:id", verifyToken, checkAdmin, updFacility);
router.delete("/:id", verifyToken, checkAdmin, delFacility);

export default router;
