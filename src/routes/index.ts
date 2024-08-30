import { Request, Response, Router } from "express";
import packageJson from "../../package.json";
import { sendReading } from "../controller/UploadDataController";
import { getReadings } from "../controller/UploadDataController";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  const { name, version } = packageJson;
  res.send({ name, version });
});

router.post("/upload", sendReading);
router.get("/:customer_code/list", getReadings);
