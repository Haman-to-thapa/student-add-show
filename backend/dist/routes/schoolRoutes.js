"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const schoolController_1 = require("../controller/schoolController");
const router = (0, express_1.Router)();
// Multer config
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../../uploads/schoolImages"),
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// Routes
router.post("/", upload.single("image"), schoolController_1.addSchool);
router.get("/", schoolController_1.getSchools);
exports.default = router;
