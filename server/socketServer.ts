import {  Server as SocketIoServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
    const io = new SocketIoServer(server);
    io.on("connection", (socket) => {
        console.log("socket connected");
        
        socket.on("notification", (data) => {
            io.emit("notification", data);
        });

        socket.on("disconnect", () => {
            console.log("socket disconnected");
        });
    });
}