import express from "express";
import "dotenv/config";
import connectDB from "./database";
import { router } from "./routes";

connectDB().then(() => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(router);

  app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
});
