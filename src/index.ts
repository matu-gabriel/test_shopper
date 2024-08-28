import express, { Request, Response } from "express";
import packageJson from "../package.json";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  const { name, version, author } = packageJson;
  res.send({ name, version, author });
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
