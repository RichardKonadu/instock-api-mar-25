import express from "express";
import {  } from "../controllers/inventoryController.js";
import { getSingleInventory, getAllInventories } from "../controllers/inventoryController.js";


const router = express.Router();

router.get("/", getAllInventories);

router.get("/:id", getSingleInventory);

export default router;
