import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
let client;
let db;

export async function getDb() {
  if (db) return db;

  if (!client) {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
    });
  }

  await client.connect();
  db = client.db("bhavsar_tiffin_db");
  return db;
}
