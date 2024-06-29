import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT =  process.env.PORT || 5000;

import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env",
})
app.use(cors())
app.use(bodyParser.json())


connectDB()
.then(()=>{
    app.get("/",(req,res)=>{
        res.send("Server is running ")
    })
    
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    }) 
})
.catch((error)=>{
    console.log("MONGO DB connection failed !!!", err);
})
