import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Warehouse routes...");
});

export default router;
