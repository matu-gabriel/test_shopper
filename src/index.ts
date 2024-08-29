import express from "express";
import "dotenv/config";
import connectDB from "./database";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(router);

connectDB().then(() => {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
});
