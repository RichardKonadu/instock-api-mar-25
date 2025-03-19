import express from "express";
import connection from "../utils/mysql.js";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Warehouse routes...");
});

router.get("/:id", async (req, res) => {
  const warehouseId = req.params.id;

  const sql = `SELECT * from warehouses where warehouses.id = ?`;

  try {
    const [results] = await connection.query(sql, [warehouseId]);

    if (!results.length) {
      res.status(404).json({ msg: `No record with ID ${warehouseId} exists` });
      return;
    }
    res.json(results[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
