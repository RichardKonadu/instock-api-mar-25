import express from "express";
import {
  getAllWarehouses,
  getWarehouseDetails,
  getWarehouseInventories,
} from "../controllers/warehouseController.js";


const router = express.Router();

router.get("/", getAllWarehouses);

router.get("/:id", getWarehouseDetails);

router.get("/:id/inventories", getWarehouseInventories);

export default router;
