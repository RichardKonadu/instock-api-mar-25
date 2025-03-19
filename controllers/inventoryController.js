import connection from "../utils/mysql.js";

const getSingleInventory = async (req, res) => {
  const inventoryId = req.params.id;

  const sql = `SELECT * FROM inventories WHERE inventories.id = ?`;

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

export { getSingleInventory };
