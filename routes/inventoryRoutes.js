import express from "express";
import { deleteInventory } from "../controllers/inventoryController.js";
import {
  getSingleInventory,
  getAllInventories,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getAllInventories);

router.route("/:id").get(getSingleInventory).delete(deleteInventory);

export default router;
