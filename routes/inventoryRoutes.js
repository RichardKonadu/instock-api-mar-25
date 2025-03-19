import express from "express";
import { getAllInventories } from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getAllInventories);

export default router;
