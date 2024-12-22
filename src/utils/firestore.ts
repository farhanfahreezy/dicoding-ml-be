import { Firestore } from "@google-cloud/firestore";

const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.SERVICE_ACCOUNT_PATH,
  databaseId: process.env.DATABASE_ID,
});

export async function storeData(data: any) {
  const predictionsCollection = db.collection("predictions");
  const docRef = await predictionsCollection.add(data);
  return docRef.id;
}

export async function getAllData() {
  const predictionCollection = db.collection("predictions");
  const snapshot = await predictionCollection.get();

  if (snapshot.empty) {
    console.log("No data found in predictions collection.");
    return [];
  }

  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}
