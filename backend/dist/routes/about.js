"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAbout_1 = __importDefault(require("../controller/about/getAbout"));
const updateAbout_1 = __importDefault(require("../controller/about/updateAbout"));
const multer_1 = __importDefault(require("multer"));
const routes = express_1.default.Router();
// Multer storage configuration
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
routes.put('/update', upload.single('file'), updateAbout_1.default);
routes.get('/get', getAbout_1.default);
exports.default = routes;
