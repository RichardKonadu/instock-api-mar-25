import express from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
