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

const updateAbout = async (req: FileRequest, res: Response): Promise<void> => {
  try {
    const dataBody: { phone?: string; email?: string; logo?: string ;companyName?:string;companyAdress?:string} = {};

    if (req.file?.buffer) {
      await new Promise<void>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "abbas/about" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(new Error("Cloudinary upload failed"));
            }
            dataBody.logo = result?.secure_url || "";
            resolve();
          }
        );
        //@ts-ignore
        bufferToStream(req.file.buffer).pipe(uploadStream);
      });
    }

    if (req.body.phone) {
      console.log(req.body.phone);
      dataBody.phone = req.body.phone;
    }
    if (req.body.email) {
      dataBody.email = req.body.email;
    }
    if (req.body.companyAdress) {
      dataBody.companyAdress = req.body.companyAdress;
    }
    if (req.body.companyName) {
      dataBody.companyName = req.body.companyName;
    }

    const result = await prisma.about.update({
      where: {
        id: 1,
      },
      data: dataBody,
    });

    res.json({
      status: 200,
      data: result,
    });
  } catch (error) {
    console.error("Error updating about section:", error);
    res.status(403).json({
      status: 403,
      message: "Error while updating about section",
    });
  }
};

export default updateAbout;
