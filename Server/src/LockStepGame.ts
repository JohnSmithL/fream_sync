import Client from "./Client";
import { GamemessageS2C_GameStart, GameMessageC2S_Operation, GameMessageS2C_Operations } from "./GameMessageBase";


export default class LockStepGame {

    clients: Client[];

    tickInterval: number = 1 / 60 * 1000;

    msgs: Map<number, GameMessageC2S_Operation> = new Map<number, GameMessageC2S_Operation>();

    constructor(clients: Client[]) {
        this.clients = clients;

        let gameStart = new GamemessageS2C_GameStart();
        gameStart.uids = [];

        for (let i = 0, length = this.clients.length; i < length; i++) {
            let client = this.clients[i];
            client.game = this;
            // console.log("client.game",client.game)
            gameStart.uids.push(client.uid);
        }

        for (let i = 0, length = this.clients.length; i < length; i++) {
            let client = this.clients[i];
            client.send(gameStart);
        }

        setInterval(this.tick.bind(this), this.tickInterval);
    }

    tick() {
        let allOperations = new GameMessageS2C_Operations();
        allOperations.operations = [];
        this.msgs.forEach((value, key, map) => {
            allOperations.operations.push(value);
        });
        for (let i = 0, length = this.clients.length; i < length; i++) {
            let client = this.clients[i];
            client.send(allOperations);
        }
        this.msgs.clear();
    }

    onReceive(client: Client, msg: GameMessageC2S_Operation) {
        if (!this.msgs.has(client.uid)) {
            this.msgs.set(client.uid, msg);
        }
    }
}