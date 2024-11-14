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
const stream_1 = require("stream");
const cloudinary = require('cloudinary').v2;
const prisma = new client_1.PrismaClient();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
const bufferToStream = (buffer) => {
    const stream = new stream_1.Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
};
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            // Convert buffer to readable stream
            const uploadStream = cloudinary.uploader.upload_stream({ folder: 'abbas/product' }, (error, imageUp) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.error("Error during Cloudinary upload:", error);
                    return res.status(500).json({
                        message: "Error while uploading",
                        error: error.message
                    });
                }
                const upload = yield prisma.products.create({
                    data: {
                        title: req.body.title,
                        description: req.body.description,
                        imageUrl: imageUp.secure_url
                    }
                });
                res.json({
                    message: "Product Uploaded",
                    data: {
                        title: req.body.title,
                        description: req.body.description,
                        imageUrl: imageUp.secure_url
                    },
                    status: 200
                });
            }));
            // Convert the file buffer to a readable stream and pipe it to the upload stream
            bufferToStream(req.file.buffer).pipe(uploadStream);
        }
        else {
            res.status(403).json({
                message: "Image does not exist",
                status: 403
            });
        }
    }
    catch (error) {
        console.error("Error while handling the request:", error);
        res.status(500).json({
            message: "Error while processing the request",
            error: error.message
        });
    }
});
exports.default = createProduct;
