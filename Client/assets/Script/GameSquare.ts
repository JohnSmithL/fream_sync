import { Direction } from "./config";
import { GameMessageS2C_Operations, GameMessageC2S_Operation } from "./GameMessageBase";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameSquare extends cc.Component {

    start() {

    }

    // update (dt) {}

    move(dir: Direction) {
        switch (dir) {
            case Direction.Up:
                this.node.y += 10;
                break;
            case Direction.Down:
                this.node.y -= 10;
                break;
            case Direction.Left:
                this.node.x -= 10;
                break;
            case Direction.Right:
                this.node.x += 10;
                break;
        }
    }

    dealOperation(op: GameMessageC2S_Operation) {
        if (op.body.dir == Direction.Left) {
            this.move(Direction.Left);
        } else if (op.body.dir == Direction.Up) {
            this.move(Direction.Up);
        } else if (op.body.dir == Direction.Right) {
            this.move(Direction.Right);
        } else if (op.body.dir == Direction.Down) {
            this.move(Direction.Down);
        }
    }
}
