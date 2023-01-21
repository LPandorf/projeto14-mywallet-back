import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transaction from "./src/routes.js";
import sing from "./src/routes.js";

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

app.use(sing);
app.use(transaction);

app.listen(5000, ()=>console.log("Running"));