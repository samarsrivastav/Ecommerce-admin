"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
const product_1 = __importDefault(require("./product"));
const about_1 = __importDefault(require("./about"));
const contact_1 = __importDefault(require("./contact"));
const auth_1 = __importDefault(require("./auth"));
routes.use('/products', product_1.default);
routes.use('/about', about_1.default);
routes.use('/contact', contact_1.default);
routes.use('/auth', auth_1.default);
exports.default = routes;
