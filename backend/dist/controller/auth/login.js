"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || " ";
const prisma = new client_1.PrismaClient();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = yield prisma.auth.findFirst({
            where: {
                username: username,
                password: password
            }
        });
        if (!user) {
            return res.json({
                status: 403,
                message: "Login Failed!!"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            username,
            id: 1
        }, JWT_SECRET);
        res.cookie("token", token);
        res.json({
            token: token,
            status: 200,
            message: "Logged in succesfully"
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            status: 403,
            message: "Login Failed!!"
        });
    }
});
exports.default = login;
