"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketServer = void 0;
const socket_io_1 = require("socket.io");
const initSocketServer = (server) => {
    const io = new socket_io_1.Server(server);
    io.on("connection", (socket) => {
        console.log("socket connected");
        socket.on("notification", (data) => {
            io.emit("notification", data);
        });
        socket.on("disconnect", () => {
            console.log("socket disconnected");
        });
    });
};
exports.initSocketServer = initSocketServer;
