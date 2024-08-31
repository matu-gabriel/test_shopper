import { Request, Response, Router } from "express";
import packageJson from "../../package.json";
import {
  confirmReading,
  sendReading,
} from "../controller/UploadDataController";
import { getReadings } from "../controller/UploadDataController";
// import multerConfig from "../config/multer";
import upload from "../config/multer";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  const { name, version } = packageJson;
  res.send({ name, version });
});

router.post("/upload", upload.single("image"), sendReading);
router.get("/:customer_code/list", getReadings);
router.patch("/confirm", confirmReading);
