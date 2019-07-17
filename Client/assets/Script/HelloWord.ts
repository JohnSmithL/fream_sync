import GameSquare from "./GameSquare";
import { Direction } from "./config";
import WSClient from "./WSClient";
import EventCenter from "./EventCenter";
import { GameMessageType, GameMessageS2C_Uid, GameMessageS2C_GameStart, GameMessageS2C_Operations, GameMessageC2S_Operation, GameMessageOperationBody, GameMessageC2S_GameStart } from "./GameMessageBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Prefab)
    prefabGameSquare: cc.Prefab = null;

    @property(cc.Label)
    lbUid:cc.Label = null;

    squares: Map<number, GameSquare> = new Map<number, GameSquare>();

    uid: number;

    pressingKeys: Map<number, boolean> = new Map<number, boolean>();

    isInGame:boolean = false;

    // selfGameSquare: GameSquare;

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // this.selfGameSquare = cc.instantiate(this.prefabGameSquare).getComponent(GameSquare);
        // this.selfGameSquare.node.parent = this.node;

        EventCenter.registEvent(GameMessageType.S2C_Uid.toString(),this.onGetUid,this);
        EventCenter.registEvent(GameMessageType.S2C_GameStart.toString(),this.onGetGameStart,this);
        EventCenter.registEvent(GameMessageType.S2C_Operations.toString(),this.onGetOperations,this);
    }

    onGetUid(msg:GameMessageS2C_Uid){
        this.uid = msg.uid;
        this.lbUid.string = this.uid.toString();
    }

    onGetGameStart(msg:GameMessageS2C_GameStart){
        for(let i = 0,length = msg.uids.length;i<length;i++){
            let uid = msg.uids[i];
            this.addPlayer(uid);
        }
        this.isInGame = true;
    }

    onGetOperations(msg:GameMessageS2C_Operations){
        for(let i = 0,length = msg.operations.length;i<length;i++){
            let op = msg.operations[i];
            let square = this.squares.get(op.uid);
            square.dealOperation(op);
        }
    }

    addPlayer(uid:number){
        let square = cc.instantiate(this.prefabGameSquare).getComponent(GameSquare);
        this.squares.set(uid,square);
        square.node.parent = this.node;
    }

    start() {
        WSClient.getInstance().connect();
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        this.pressingKeys.set(event.keyCode, true);
    }

    onKeyUp(event: cc.Event.EventKeyboard) {
        this.pressingKeys.set(event.keyCode, false);
    }

    update() {
        if(this.isInGame){
            this.sendOp();
        }
    }

    sendOp(){
        let msg = new GameMessageC2S_Operation();
        msg.uid = this.uid;
        msg.body = new GameMessageOperationBody();

        if(this.pressingKeys.get(cc.macro.KEY.a)){
            msg.body.dir = Direction.Left;
        }else if(this.pressingKeys.get(cc.macro.KEY.w)){
            msg.body.dir = Direction.Up;
        }else if(this.pressingKeys.get(cc.macro.KEY.d)){
            msg.body.dir = Direction.Right;
        }else if(this.pressingKeys.get(cc.macro.KEY.s)){
            msg.body.dir = Direction.Down;
        }else{
            msg.body.dir = Direction.Stop;
        }

        WSClient.getInstance().send(msg);
    }

    onClickGameStart(){
        WSClient.getInstance().send(new GameMessageC2S_GameStart)
    }
}
