import connection from "../utils/mysql.js";

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

export { getAllInventories };
