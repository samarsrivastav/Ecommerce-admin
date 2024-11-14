"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getContact_1 = __importDefault(require("../controller/contact/getContact"));
const addContact_1 = __importDefault(require("../controller/contact/addContact"));
const routes = express_1.default.Router();
routes.post('/add', addContact_1.default);
routes.get('/get', getContact_1.default);
exports.default = routes;
