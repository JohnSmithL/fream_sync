import { Direction } from "./config";


export default class GameMessageBase{
    type: GameMessageType = 0;
}

export enum GameMessageType{
   C2S_GameStart,
   C2S_Operation,
   S2C_Uid,
   S2C_GameStart,
   S2C_Operations,
}

export class GameMessageC2S_GameStart extends GameMessageBase{
    type = GameMessageType.C2S_GameStart;
}

export class GamemessageS2C_GameStart extends GameMessageBase{
    type = GameMessageType.S2C_GameStart;
    uids:number[]=[];
}

export class GameMessageS2C_Uid extends GameMessageBase{
    type = GameMessageType.S2C_Uid;
    uid:number=0;
}

export class GameMessageC2S_Operation extends GameMessageBase{
    type = GameMessageType.C2S_Operation;
    uid:number=0;
    body:GameMessageOperationBody=new GameMessageOperationBody();
}

export class GameMessageOperationBody{
    dir:Direction=0;
}

export class GameMessageS2C_Operations extends GameMessageBase{
    type = GameMessageType.S2C_Operations;

    operations:GameMessageC2S_Operation[]=[];
}