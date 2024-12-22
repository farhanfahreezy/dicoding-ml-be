import { Request, Response } from "express";
import { storeData } from "../utils/firestore";
import sharp from "sharp";
import { inference, loadModel } from "../utils/model";

export const predict = async (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    console.log("image", image);
    const metadata = await sharp(image).metadata();

    if (!image || !metadata) {
      res.status(400).json({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi",
      });
    }

    if (metadata.size! >= 1000000) {
      res.status(413).json({
        status: "fail",
        message: "Payload content length greater than maximum allowed: 1000000",
      });
    }

    const model = await loadModel();

    const { result, suggestion } = await inference(model, image);

    const date = new Date();
    const id = await storeData({ result, suggestion, date });
    res.status(200).json({
      status: "success",
      message: "Model is predicted successfully",
      data: {
        id: id,
        result: result,
        suggestion: suggestion,
        createdAt: date,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "error" });
  }
};
