import express from "express";
import {
  getSingleInventory,
  getAllInventories,
  updateInventory,
  deleteInventory,
  addInventory,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.route("/").get(getAllInventories).post(addInventory);

router
  .route("/:id")
  .get(getSingleInventory)
  .patch(updateInventory)
  .delete(deleteInventory);

export default router;
