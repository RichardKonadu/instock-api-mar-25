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

export { getAllWarehouses };
