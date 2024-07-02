
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoute from "./route/book.route.js";
import cors from "cors";
import userRoute from "./route/user.route.js";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()

// middleware
app.use(cors());
app.use(express.json())

dotenv.config();

const port = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongodb
try {
    mongoose.connect(URI);
    console.log("connected to mongodb")
} catch (error) {
    console.log("error: ", error);
}


// defining route
app.use("/book", bookRoute);
app.use("/user", userRoute);


app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "Frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
