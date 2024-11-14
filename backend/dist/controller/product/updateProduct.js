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
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
const prisma = new client_1.PrismaClient();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const bufferToStream = (buffer) => {
    const stream = new stream_1.Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
};
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const dataBody = {};
        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer) {
            yield new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder: "abbas/product" }, (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        return reject(new Error("Cloudinary upload failed"));
                    }
                    dataBody.imageUrl = (result === null || result === void 0 ? void 0 : result.secure_url) || "";
                    resolve();
                });
                //@ts-ignore
                bufferToStream(req.file.buffer).pipe(uploadStream);
            });
        }
        if (req.body.title) {
            dataBody.title = req.body.title;
        }
        if (req.body.description) {
            dataBody.description = req.body.description;
        }
        const result = yield prisma.products.update({
            where: {
                id: Number(req.params.id),
            },
            data: dataBody,
        });
        res.json({
            status: 200,
            data: result,
        });
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(403).json({
            status: 403,
            message: "Error while updating product",
        });
    }
});
exports.default = updateProduct;
