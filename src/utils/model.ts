import {
  GraphModel,
  loadGraphModel,
  node,
  Tensor,
} from "@tensorflow/tfjs-node";

export async function loadModel() {
  return loadGraphModel(process.env.MODEL_URL!);
}

export async function inference(model: GraphModel, image: any) {
  try {
    const decodedImage = node.decodeJpeg(image, 3);

    const tensor = decodedImage
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);

    if (!(prediction instanceof Tensor)) {
      throw new Error("Prediction is not a valid tensor");
    }

    const score = await prediction.data();
    console.log(Number(score) * 100);

    const result = Number(score) * 100 > 50 ? "Cancer" : "Non-cancer";

    let suggestion;

    if (result === "Cancer") {
      suggestion = "Segera periksa ke dokter!";
    }

    if (result === "Non-cancer") {
      suggestion = "Penyakit kanker tidak terdeteksi.";
    }

    return { result, suggestion };
  } catch (error) {
    throw new Error("Terjadi kesalahan dalam melakukan prediksi");
  }
}
