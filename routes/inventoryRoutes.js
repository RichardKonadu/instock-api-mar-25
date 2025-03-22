import express from "express";
import {
  getSingleInventory,
  getAllInventories,
  updateInventory,
  deleteInventory
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getAllInventories);

router.route("/:id").get(getSingleInventory).patch(updateInventory).delete(deleteInventory);


export default router;
