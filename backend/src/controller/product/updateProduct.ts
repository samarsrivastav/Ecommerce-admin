import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

interface FileRequest extends Request {
  file?: Express.Multer.File;
}

const bufferToStream = (buffer: Buffer): Readable => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

const updateProduct = async (req: FileRequest, res: Response): Promise<void> => {
  try {
    const dataBody: { title?: string; description?: string; imageUrl?: string } = {};

    if (req.file?.buffer) {
      await new Promise<void>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "abbas/product" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(new Error("Cloudinary upload failed"));
            }
            dataBody.imageUrl = result?.secure_url || "";
            resolve();
          }
        );
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

    const result = await prisma.products.update({
      where: {
        id: Number(req.params.id),
      },
      data: dataBody,
    });

    res.json({
      status: 200,
      data: result,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(403).json({
      status: 403,
      message: "Error while updating product",
    });
  }
};

export default updateProduct;
