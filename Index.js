import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

//conexão mongo
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;
mongoClient.connect().then(()=>{
    db=mongoClient.db();
});

app.listen(5000, ()=>console.log("Running"));