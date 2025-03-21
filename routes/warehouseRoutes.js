import express from "express";
import {
  addWarehouse,
  getAllWarehouses,
  getWarehouseDetails,
  getWarehouseInventories,
  deleteWarehouse,
} from "../controllers/warehouseController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllWarehouses)
  .post(addWarehouse);

router.get("/:id", getWarehouseDetails);

router.get("/:id/inventories", getWarehouseInventories);

router.delete("/:id/delete", deleteWarehouse);

export default router;
