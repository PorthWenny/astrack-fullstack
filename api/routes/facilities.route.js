import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
  console.log("it works!");
});

router.post("/test", (req, res) => {
  console.log("it works!");
});

router.put("/test", (req, res) => {
  console.log("it works!");
});

router.delete("/test", (req, res) => {
  console.log("it works!");
});

export default router;
