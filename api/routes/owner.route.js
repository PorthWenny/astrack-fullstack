import express from "express";
import {
  getOwners,
  getOwner,
  addOwner,
  updateOwner,
  deleteOwner,
} from "../controllers/owner.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getOwners);

router.get("/:id", verifyToken, getOwner);

router.post("/", verifyToken, addOwner);

router.put("/:id", verifyToken, updateOwner);

router.delete("/:id", verifyToken, deleteOwner);

export default router;
