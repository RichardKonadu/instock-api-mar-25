import connection from "../utils/mysql.js";
import { validateWarehouseForm } from "../utils/helpers.js";

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

const addWarehouse = async (req, res) => {
  const formData = req.body;
  const sql = `INSERT INTO warehouses SET ?`;

  const validationResult = validateWarehouseForm(formData);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error });
  }

  try {
    const [results] = await connection.query(sql, [formData]);

    res
      .status(201)
      .json({ msg: `Created warehouse with ID ${results.insertId}` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteWarehouse = async (req, res) => {
  const warehouseId = req.params.id;

  const sql = `DELETE FROM warehouses WHERE warehouses.id = ?`;

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

  const { created_at, updated_at, ...updatedData } = req.body;

  const currentDateTime = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  updatedData.updated_at = currentDateTime;

  const sql = `UPDATE warehouses SET ? WHERE warehouses.id = ?`;

  try {
    const [results] = await connection.query(sql, [updatedData, warehouseId]);

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ msg: `No record with ID ${warehouseId} found` });
    }

    res.json({ message: `Warehouse ${warehouseId} has been updated` });
  } catch (error) {
    console.error("Database error", error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllWarehouses,
  getWarehouseDetails,
  getWarehouseInventories,
  addWarehouse,
  deleteWarehouse,
  updateWarehouse,
};
