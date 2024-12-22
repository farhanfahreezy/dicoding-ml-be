import { Request, Response } from "express";
import { getAllData } from "../utils/firestore";

export const getAllPrediction = async (req: Request, res: Response) => {
  try {
    const data = await getAllData();
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "error" });
  }
};
