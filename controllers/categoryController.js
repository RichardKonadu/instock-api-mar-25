import connection from "../utils/mysql.js";

const getCategories = async (_req, res) => {
  const sql = `SELECT DISTINCT category FROM inventories;`;
  let resultsArray = [];

  try {
    const [results] = await connection.query(sql);

    if (!results.length) {
      res.status(404).json({ msg: "No categories in DB" });
      return;
    }

    results.forEach((result) => {
      resultsArray.push(result.category);
    });

    res.json(resultsArray);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getCategories };
