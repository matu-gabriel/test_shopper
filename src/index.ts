import express, { Request, Response } from "express";
import packageJson from "../package.json";
import "dotenv/config";
import connectDB from "./database";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  const { name, version, author } = packageJson;
  res.send({ name, version, author });
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
});
