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

router.route("/").get(getAllWarehouses).post(addWarehouse);

router
  .route("/:id")
  .get(getWarehouseDetails)
  .patch(updateWarehouse)
  .delete(deleteWarehouse);

router.get("/:id/inventories", getWarehouseInventories);

export default router;
