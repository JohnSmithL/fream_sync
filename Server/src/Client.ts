import WebSocket = require('ws');
import GameMessageBase, { GameMessageType, GameMessageC2S_GameStart, GameMessageC2S_Operation } from './GameMessageBase';
import GameManager from './GameManager';
import LockStepGame from './LockStepGame';

export default class Client {

    ws: WebSocket;
    uid: number = 0;
    game: LockStepGame = null;


    constructor(socket: WebSocket) {
        this.ws = socket;

        socket.on('message', this.onMessage.bind(this));
        socket.on('close', this.onClose.bind(this));

    }


    onMessage(data: WebSocket.Data) {
        let msg = JSON.parse(data as string) as GameMessageBase;

        if (msg.type == GameMessageType.C2S_GameStart) {
            GameManager.getInstance().gameStart();
        } else if (msg.type == GameMessageType.C2S_Operation) {
            // console.log("this.game",this.game);
            // GameManager.getInstance().allGames[0].onReceive(this,msg as GameMessageC2S_Operation)
            this.game.onReceive(this,msg as GameMessageC2S_Operation)
        }
    }

    onClose() {
        GameManager.getInstance().onClientClose(this);
    }

    send(msg: GameMessageBase) {
        let str = JSON.stringify(msg);
        this.ws.send(str);
    }



}


