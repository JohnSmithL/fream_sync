import { Direction } from "./config";


export default class GameMessageBase{
    type:GameMessageType;
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

export class GameMessageS2C_GameStart extends GameMessageBase{
    type = GameMessageType.S2C_GameStart;
    uids:number[];
}

export class GameMessageS2C_Uid extends GameMessageBase{
    type = GameMessageType.S2C_Uid;
    uid:number;
}

export class GameMessageC2S_Operation extends GameMessageBase{
    type = GameMessageType.C2S_Operation;
    uid:number;
    body:GameMessageOperationBody;
}

export class GameMessageOperationBody{
    dir:Direction;
}

export class GameMessageS2C_Operations extends GameMessageBase{
    type = GameMessageType.S2C_Operations;

    operations:GameMessageC2S_Operation[];
}