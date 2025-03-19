import express from "express";
import { getSingleInventory } from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Inventory routes...");
});

router.get("/:id", getSingleInventory);

export default router;
