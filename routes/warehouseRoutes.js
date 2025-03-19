import express from "express";
import {
  getWarehouseDetails,
  getWarehouseInventories,
} from "../controllers/warehouseController.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Warehouse routes...");
});

router.get("/:id", getWarehouseDetails);

router.get("/:id/inventories", getWarehouseInventories);

export default router;
