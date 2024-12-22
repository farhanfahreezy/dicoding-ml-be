import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { predict } from "./controller/predict";
import { getAllPrediction } from "./controller/getAllPrediction";

const app: Express = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/predict", predict);

app.get("/predict/histories", getAllPrediction);

app.listen(process.env.PORT || 3000, () => console.log("Server Running"));
