import { validateInventoryForm } from "../utils/helpers.js";
import connection from "../utils/mysql.js";

const getSingleInventory = async (req, res) => {
  const inventoryId = req.params.id;

  const sql = `SELECT inventories.*, warehouses.warehouse_name 
    FROM inventories
    JOIN warehouses ON inventories.warehouse_id = warehouses.id
    WHERE inventories.id = ?;`;

  try {
    const [results] = await connection.query(sql, [inventoryId]);

    if (!results.length) {
      res.status(404).json({ msg: `No record with ID ${inventoryId} exists` });
      return;
    }
    res.json(results[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllInventories = async (_req, res) => {
  const sql = `
    SELECT
        i.id,
        w.warehouse_name,
        i.item_name,
        i.description,
        i.category,
        i.status,
        i.quantity
    FROM
        inventories i
    JOIN warehouses w ON i.warehouse_id = w.id;
  `;

  try {
    const [results] = await connection.query(sql);

    if (!results.length) {
      res.status(404).json({ msg: "Error fetching Inventories" });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateInventory = async (req, res) => {
  const inventoryId = req.params.id;

  if (!req.body.item_name && !req.body.description) {
    return res
      .status(400)
      .send({ message: "please include an item name and description" });
  }

  const sql = `UPDATE inventories SET ? WHERE inventories.id = ?`;

  try {
    const [results] = await connection.query(sql, [req.body, inventoryId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ msg: `No record with ID${inventoryId} found` });
    }

    res.json({ message: `Inventory  ${inventoryId} has been updated` });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addInventory = async (req, res) => {
  const formData = req.body;
  const sql = `INSERT INTO inventories SET ?`;

  const validationResult = validateInventoryForm(formData);

  if (!validationResult.success) {
    res.status(400).json({ error: validationResult.error });
    return;
  }
  try {
    const [results] = await connection.query(sql, [formData]);
    res
      .status(201)
      .json({ msg: ` Created inventory with ID ${results.insertId}` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteInventory = async (req, res) => {
  const inventoryId = req.params.id;

  const sql = `DELETE FROM inventories WHERE inventories.id = ?`;

  try {
    const [results] = await connection.query(sql, [inventoryId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ msg: `No record with ID${inventoryId} found` });
    }
    res.json({ message: `Inventory with ID ${inventoryId} has been updated` });

    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  getSingleInventory,
  getAllInventories,
  updateInventory,
  deleteInventory,
  addInventory,
};
