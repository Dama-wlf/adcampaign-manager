import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/app.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.listen(PORT, () => {
    connectDB();
    console.log(`Le serveur est demarré dans http://localhost:${PORT}`)

})