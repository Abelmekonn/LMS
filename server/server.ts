require("dotenv").config();
import { app } from "./app";
import { initSocketServer } from "./socketServer";
import connectDb from "./utils/db";
import { v2 as cloudinary } from "cloudinary";
import http from "http";

const server = http.createServer(app);

// connect cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})

initSocketServer(server);

app.listen(process.env.PORT, ()=>{
    console.log(`server is connected to port ${process.env.PORT}`)
    connectDb()
})