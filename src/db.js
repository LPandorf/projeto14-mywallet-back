import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
let db;

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  const result = await mongoClient.connect();
} catch (error) {
  console.log(error);
}

db = mongoClient.db('mywallet');

export default db;