"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const wss = new ws_1.default.Server({
    port: 8000
});
wss.on('connection', (socket) => {
    socket.on('message', (message) => {
        console.log('recieved: ', message.toString());
        const msg = 'hello client';
        console.log('sent: ', msg);
        socket.send(msg);
    });
    wss.on('custom event', (msg) => {
        console.log("msg recieved from client: ", msg);
    });
});
wss.on('message', (socket) => {
    console.log('message recieved');
});
