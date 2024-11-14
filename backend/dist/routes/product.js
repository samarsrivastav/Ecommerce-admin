"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const createProduct_1 = __importDefault(require("../controller/product/createProduct"));
const deleteProduct_1 = __importDefault(require("../controller/product/deleteProduct"));
const getProduct_1 = __importDefault(require("../controller/product/getProduct"));
const updateProduct_1 = __importDefault(require("../controller/product/updateProduct"));
const routes = express_1.default.Router();
// Multer storage configuration
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
routes.post('/create', upload.single('file'), createProduct_1.default);
routes.delete('/delete/:id', deleteProduct_1.default);
routes.get('/get', getProduct_1.default);
routes.put('/update/:id', upload.single('file'), updateProduct_1.default);
exports.default = routes;
