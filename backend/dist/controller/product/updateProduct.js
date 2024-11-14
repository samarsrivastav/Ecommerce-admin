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
const cloudinary = require("cloudinary").v2;
const prisma = new client_1.PrismaClient();
cloudinary.config({
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
// Define the mapping between field names in the request and database columns
const imageFieldMapping = {
    image1: "imageUrl",
    image2: "imageUrl2",
    image3: "imageUrl3",
};
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataBody = {};
        if (req.files && typeof req.files === "object") {
            const uploadPromises = [];
            // Loop through each specified file and upload to the mapped field
            for (const [key, files] of Object.entries(req.files)) {
                if (imageFieldMapping[key] && Array.isArray(files) && files[0]) {
                    const fieldName = imageFieldMapping[key];
                    const file = files[0];
                    const uploadPromise = new Promise((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream({ folder: "abbas/product" }, (error, result) => {
                            if (error) {
                                console.error("Cloudinary upload error:", error);
                                reject(new Error("Cloudinary upload failed"));
                            }
                            else {
                                dataBody[fieldName] = result.secure_url;
                                resolve();
                            }
                        });
                        bufferToStream(file.buffer).pipe(uploadStream);
                    });
                    uploadPromises.push(uploadPromise);
                }
            }
            // Wait for all uploads to complete
            yield Promise.all(uploadPromises);
        }
        // Update other optional fields
        if (req.body.title) {
            dataBody.title = req.body.title;
        }
        if (req.body.description) {
            dataBody.description = req.body.description;
        }
        // Update the product in the database with the populated dataBody
        const result = yield prisma.products.update({
            where: { id: Number(req.params.id) },
            data: dataBody,
        });
        res.json({
            status: 200,
            message: "Product updated successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            status: 500,
            message: "Error while updating product",
            error: error.message,
        });
    }
});
exports.default = updateProduct;
