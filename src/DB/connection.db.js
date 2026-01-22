import { MongoClient } from "mongodb";
import { DB_URL } from "../../config/config.service.js";



const client = new MongoClient(DB_URL);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("DB connected successfully ✅");
  } catch (error) {
    console.log(`Fail to connect on DB ... ${error}`);
  }
};

export const db = client.db("Library")