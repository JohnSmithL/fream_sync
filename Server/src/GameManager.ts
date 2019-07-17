import Client from "./Client";
import { GameMessageS2C_Uid } from "./GameMessageBase";
import LockStepGame from "./LockStepGame";


export default class GameManager {
    private static _instance: GameManager;

    static getInstance(): GameManager {
        if (!GameManager._instance) {
            GameManager._instance = new GameManager;
        }
        return GameManager._instance;
    }



    allClients: Client[] = [];
    matchingClients: Client[] = [];
    uidIdx: number = 100;
    allGames: LockStepGame[] = [];

    addClient(client: Client) {
        this.allClients.push(client);
        this.matchingClients.push(client);
        client.uid = this.uidIdx;
        this.uidIdx++;

        let msg = new GameMessageS2C_Uid();
        msg.uid = client.uid;
        client.send(msg);
    }

    gameStart() {
        let game = new LockStepGame(this.matchingClients);
        this.allGames.push(game);
        // console.log("allGames",this.allGames);
        this.matchingClients = [];
    }

    onClientClose(client: Client) {
        let idx = this.allClients.indexOf(client);
        if (idx == -1) {
            this.allClients.splice(idx, 1);
        }

        idx = this.matchingClients.indexOf(client);
        if (idx == -1) {
            this.matchingClients.splice(idx, 1);
        }
    }
}