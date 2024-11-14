import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Readable } from "stream";
const cloudinary = require('cloudinary').v2;

const prisma = new PrismaClient();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Extend the Request interface to include the 'file' property
interface FileRequest extends Request {
    file?: Express.Multer.File;
}

const bufferToStream = (buffer: Buffer): Readable => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
};

const createProduct = async (req: FileRequest, res: Response): Promise<void> => {
    try {
        if (req.file) {
            // Convert buffer to readable stream
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'abbas/product' },
                async (error: any, imageUp: { secure_url: string }) => {
                    if (error) {
                        console.error("Error during Cloudinary upload:", error);
                        return res.status(500).json({
                            message: "Error while uploading",
                            error: error.message
                        });
                    }
                    const upload = await prisma.products.create({
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
                }
            );

            // Convert the file buffer to a readable stream and pipe it to the upload stream
            bufferToStream(req.file.buffer).pipe(uploadStream);
        } else {
            res.status(403).json({
                message: "Image does not exist",
                status: 403
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
