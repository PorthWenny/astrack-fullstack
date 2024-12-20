import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addReservation,
  delReservation,
  getReservations,
  getReservation,
  updReservation,
} from "../controllers/reservations.controller.js";

const router = express.Router();

router.get("/:id", getReservation);
router.get("/", getReservations);
router.post("/", verifyToken, addReservation);
router.put("/:id", verifyToken, updReservation);
router.delete("/:id", verifyToken, delReservation);

export default router;
