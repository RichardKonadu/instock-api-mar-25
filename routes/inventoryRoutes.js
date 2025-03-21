import express from "express";
import { updateInventory } from "../controllers/inventoryController.js";
import {
  getSingleInventory,
  getAllInventories,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getAllInventories);

router.route("/:id").get(getSingleInventory).patch(updateInventory);

export default router;
