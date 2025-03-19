import connection from "../utils/mysql.js";

const getAllInventories = async (_req, res) => {
  const sql = "SELECT * from inventories";

  try {
    const [results] = await connection.query(sql);

    if (!results.length) {
      res.status(404).json({ msg: "Error fethcing Inventories" });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAllInventories };
