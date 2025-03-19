import connection from "../utils/mysql.js";

const getWarehouseDetails = async (req, res) => {
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
};

const getWarehouseInventories = async (req, res) => {
  const warehouseId = req.params.id;

  const sql = `SELECT * FROM inventories WHERE warehouse_id = ?;`;

  try {
    const [results] = await connection.query(sql, [warehouseId]);

    if (!results.length) {
      res.status(404).json({
        msg: `No inventories with Warehouse ID: ${warehouseId} exists`,
      });
      return;
    }
    res.json(results);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getWarehouseDetails, getWarehouseInventories };
