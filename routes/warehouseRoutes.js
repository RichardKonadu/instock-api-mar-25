import express from "express";
import {
  addWarehouse,
  getAllWarehouses,
  getWarehouseDetails,
  getWarehouseInventories,
  deleteWarehouse,
  updateWarehouse,
} from "../controllers/warehouseController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllWarehouses)
  .post(addWarehouse);

router.route("/:id").get(getWarehouseDetails).patch(updateWarehouse);

router.get("/:id/inventories", getWarehouseInventories);

router.delete("/:id", deleteWarehouse);

export default router;
