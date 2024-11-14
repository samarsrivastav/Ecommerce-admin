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
// Convert Buffer to Readable Stream
const bufferToStream = (buffer) => {
    const stream = new stream_1.Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
};
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure we are checking for the required image (first image is mandatory)
        if (req.files && Array.isArray(req.files)) {
            if (req.files.length === 0) {
                res.status(400).json({
                    message: "At least one image is required",
                    status: 400
                });
            }
            const imageUrls = [];
            // Upload each image to Cloudinary using a promise-based approach
            const uploadPromises = req.files.map((file) => new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({ folder: 'abbas/product' }, (error, imageUp) => {
                    if (error) {
                        reject(error); // Reject if error occurs during upload
                    }
                    else {
                        resolve(imageUp.secure_url); // Resolve with the image URL
                    }
                });
                // Convert the file buffer to a readable stream and pipe it to the upload stream
                bufferToStream(file.buffer).pipe(uploadStream);
            }));
            // Wait for all image uploads to complete
            const uploadedUrls = yield Promise.all(uploadPromises);
            // Create the product in the database
            yield prisma.products.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    imageUrl: uploadedUrls[0], // First image required
                    imageUrl2: uploadedUrls[1] || null, // Optional second image
                    imageUrl3: uploadedUrls[2] || null, // Optional third image
                }
            });
            // Send the response once product is successfully created
            res.json({
                message: "Product Uploaded",
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    imageUrls: uploadedUrls,
                },
                status: 200
            });
        }
        else {
            res.status(400).json({
                message: "At least one image is required",
                status: 400
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
