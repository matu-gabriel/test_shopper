import { Request, Response, Router } from "express";
import packageJson from "../../package.json";

export const router = Router();

router.get("/teste", (req: Request, res: Response) => {
  const { name, version } = packageJson;
  res.send({ name, version });
});
