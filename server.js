import express from "express";
import cors from "cors";
import "dotenv/config";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import warehouseRoutes from "./routes/warehouseRoutes.js";

const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.get("/", (_req, res) => {
  res.send("App is running...");
});

app.use("/warehouses", warehouseRoutes);
app.use("/inventories", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
