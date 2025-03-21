import connection from "../utils/mysql.js";

const getAllWarehouses = async (_req, res) => {
  const sql = "SELECT * FROM warehouses";

  try {
    const [results] = await connection.query(sql);

    if (!results.length) {
      res.status(404).json({ msg: "No warehouses in DB" });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json(error);
  }
};

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

const deleteWarehouse = async (req, res) => {
  const warehouseId = req.params.id;

  const sql = `SELECT * FROM warehouses WHERE warehouses.id = ?`;

  try {
    const [results] = await connection.query(sql, [warehouseId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ msg: `No record with ID${warehouseId} found` });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateWarehouse = async (req, res) => {
  const warehouseId = req.params.id;

  if (!req.body.contact_phone && !req.body.contact_email) {
    return res
      .status(400)
      .send({ message: "Please include a phone number and email address" });
  }

  const sql = `UPDATE warehouses SET ? WHERE warehouses.id = ?`;

  try {
    const [results] = await connection.query(sql, [req.body, warehouseId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ msg: `No record with ID${warehouseId} found` });
    }

    res.json({ message: `Warehouse ${warehouseId} has been updated` });
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getAllWarehouses,
  getWarehouseDetails,
  getWarehouseInventories,
  deleteWarehouse,
  updateWarehouse,
};
