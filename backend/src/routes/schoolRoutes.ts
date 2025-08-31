import { Router } from "express";
import multer from "multer";
import path from "path";
import { addSchool, getSchools } from "../controller/schoolController";

const router = Router();

// Multer config
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads/schoolImages"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), addSchool);
router.get("/", getSchools);

export default router;
