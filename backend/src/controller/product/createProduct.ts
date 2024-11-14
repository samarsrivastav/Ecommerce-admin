import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Readable } from "stream";
import multer from "multer";
const cloudinary = require('cloudinary').v2;

const prisma = new PrismaClient();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Extend the Request interface to handle the 'files' property properly
interface FileRequest extends Request {
    files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };  // Updated to handle both single and array of files
}

// Convert Buffer to Readable Stream
const bufferToStream = (buffer: Buffer): Readable => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
};

const createProduct = async (req: FileRequest, res: Response): Promise<void> => {
    try {
        // Ensure we are checking for the required image (first image is mandatory)
        if (req.files && Array.isArray(req.files)) {
            if (req.files.length === 0) {
                res.status(400).json({
                    message: "At least one image is required",
                    status: 400
                });
            }

            const imageUrls: string[] = [];

            // Upload each image to Cloudinary using a promise-based approach
            const uploadPromises = req.files.map((file) =>
                new Promise<string>((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: 'abbas/product' },
                        (error: any, imageUp: { secure_url: string }) => {
                            if (error) {
                                reject(error); // Reject if error occurs during upload
                            } else {
                                resolve(imageUp.secure_url); // Resolve with the image URL
                            }
                        }
                    );
                    // Convert the file buffer to a readable stream and pipe it to the upload stream
                    bufferToStream(file.buffer).pipe(uploadStream);
                })
            );

            // Wait for all image uploads to complete
            const uploadedUrls = await Promise.all(uploadPromises);

            // Create the product in the database
            await prisma.products.create({
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
        } else {
            res.status(400).json({
                message: "At least one image is required",
                status: 400
            });
        }
    } catch (error: any) {
        console.error("Error while handling the request:", error);
        res.status(500).json({
            message: "Error while processing the request",
            error: error.message
        });
    }
};

export default createProduct;
