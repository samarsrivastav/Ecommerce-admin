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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id);
        const find = yield prisma.products.findFirst({
            where: {
                id: Number(req.params.id)
            }
        });
        if (!find) {
            res.json({
                status: 403,
                message: "Product Doesn't exist"
            });
        }
        const del = yield prisma.products.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json({
            message: "Product deleted",
            status: 200
        });
    }
    catch (_a) {
        res.json({
            message: "error while deleting",
            status: 403
        });
    }
});
exports.default = deleteProduct;
