import express from "express";
import {
  getAllWarehouses,
  getWarehouseDetails,
  getWarehouseInventories,
  deleteWarehouse,
} from "../controllers/warehouseController.js";

const router = express.Router();

router.get("/", getAllWarehouses);

router.get("/:id", getWarehouseDetails);

router.get("/:id/inventories", getWarehouseInventories);

router.delete("/:id/delete", deleteWarehouse);

router.patch("/:id");

export default router;
