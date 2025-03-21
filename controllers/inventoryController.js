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

const addInventory = async (req, res) => {
  const formData = req.body;
  const sql = `INSERT INTO inventories SET ?`;

  try {
    const [results] = await connection.query(sql, [formData]);
    console.log(results);

    res
      .status(201)
      .json({ msg: "New inventory created with ID ${results.insertId}" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export { getSingleInventory, getAllInventories, addInventory };
