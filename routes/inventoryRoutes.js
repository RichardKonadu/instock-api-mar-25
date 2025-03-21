import express from "express";
import { addInventory } from "../controllers/inventoryController.js";
import {
  getSingleInventory,
  getAllInventories,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.route("/").get(getAllInventories).post(addInventory);

router.get("/:id", getSingleInventory);

export default router;
