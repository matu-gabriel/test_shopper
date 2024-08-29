import multer from "multer";
import { v4 } from "uuid";

import { resolve, extname } from "node:path";

const storage = multer.diskStorage({
  destination: resolve(__dirname, "..", "uploads"),
  filename: (request, file, callback) =>
    callback(null, v4() + extname(file.originalname)),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    const allowMime = ["image/jpeg", "image/pjpeg", "image/png"];
    if (allowMime.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type"));
    }
  },
});

export default upload;
