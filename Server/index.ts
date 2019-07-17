import WebSocket = require('ws');
import * as http from "http";
import Client from './src/Client';
import GameManager from './src/GameManager';
import LockStepGame from './src/LockStepGame';



console.log('serverStart' + Date.parse(new Date().toString()));

let ws = new WebSocket.Server({port:8080});

ws.on('connection',(socket:WebSocket,request:http.IncomingMessage)=>{
    let client = new Client(socket);
    GameManager.getInstance().addClient(client);
})


console.log("Server Start");