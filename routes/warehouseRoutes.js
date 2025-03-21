import express from "express";
import {
  getAllWarehouses,
  getWarehouseDetails,
  getWarehouseInventories,
  deleteWarehouse,
  updateWarehouse,
} from "../controllers/warehouseController.js";

const router = express.Router();

router.get("/", getAllWarehouses);

router.route("/:id").get(getWarehouseDetails).patch(updateWarehouse);

router.get("/:id/inventories", getWarehouseInventories);

router.delete("/:id/delete", deleteWarehouse);

export default router;
