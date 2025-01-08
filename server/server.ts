import { Server as SocketIoServer } from "socket.io";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { initSocketServer } from "./socketServer";
import connectDb from "./utils/db";
import { v2 as cloudinary } from "cloudinary";

// Create the HTTP server
const server = http.createServer(app);

// Initialize Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});

// Initialize the Socket.IO server
initSocketServer(server);

// Start the server and connect to the database
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDb();
});
