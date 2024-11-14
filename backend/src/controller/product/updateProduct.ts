import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Readable } from "stream";
const cloudinary = require("cloudinary").v2;

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

interface FileRequest extends Request {
  files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
}

const bufferToStream = (buffer: Buffer): Readable => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

// Define the mapping between field names in the request and database columns
const imageFieldMapping: { [key: string]: "imageUrl" | "imageUrl2" | "imageUrl3" } = {
  image1: "imageUrl",
  image2: "imageUrl2",
  image3: "imageUrl3",
};

const updateProduct = async (req: FileRequest, res: Response): Promise<void> => {
  try {
    const dataBody: { title?: string; description?: string; imageUrl?: string; imageUrl2?: string; imageUrl3?: string } = {};

    if (req.files && typeof req.files === "object") {
      const uploadPromises: Promise<void>[] = [];

      // Loop through each specified file and upload to the mapped field
      for (const [key, files] of Object.entries(req.files)) {
        if (imageFieldMapping[key] && Array.isArray(files) && files[0]) {
          const fieldName = imageFieldMapping[key];
          const file = files[0];

          const uploadPromise = new Promise<void>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "abbas/product" },
              (error: any, result: { secure_url: string }) => {
                if (error) {
                  console.error("Cloudinary upload error:", error);
                  reject(new Error("Cloudinary upload failed"));
                } else {
                  dataBody[fieldName] = result.secure_url;
                  resolve();
                }
              }
            );
            bufferToStream(file.buffer).pipe(uploadStream);
          });

          uploadPromises.push(uploadPromise);
        }
      }

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
    }

    // Update other optional fields
    if (req.body.title) {
      dataBody.title = req.body.title;
    }
    if (req.body.description) {
      dataBody.description = req.body.description;
    }

    // Update the product in the database with the populated dataBody
    const result = await prisma.products.update({
      where: { id: Number(req.params.id) },
      data: dataBody,
    });

    res.json({
      status: 200,
      message: "Product updated successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Error updating product:", error);
    res.status(500).json({
      status: 500,
      message: "Error while updating product",
      error: error.message,
    });
  }
};

export default updateProduct;
