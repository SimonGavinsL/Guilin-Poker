// 帧同步游戏页面
import * as Util from "../Util.js";
import BaseView from "./BaseView.js";
import Component from "../component/index.js";
const Global = Util.Global;

export default class GameView extends BaseView {

    msgBox;

    constructor() {
        super();
    }

    onInit() {
        const button = new Component.Button(20, 20, "结束帧同步");
        button.onClick(() => this.stopFrameSync());

        const msgBox = new Component.MsgBox(20, 100, "");
        this.msgBox = msgBox;

        this.addComponent(button);
        this.addComponent(msgBox);


        if (Global.room.roomInfo.frameSyncState !== Global.ENUM.FrameSyncState.START) {
            // 调用 startFrameSync 接口
            this.startFrameSync();
        } else {
            Global.room.onUpdate = this.onRoomUpdate.bind(this);
        }

        // 修改玩家状态
        this.changeCustomPlayerStatus(0);
        // 设置广播回调
        Global.room.onRecvFrame = this.onRecvFrame.bind(this);
    }

    // 开始帧同步
    startFrameSync() {
        const func = () => Global.room.startFrameSync({}, event => {
            if (event.code !== Global.ErrCode.EC_OK) {
                return this.dialog("操作失败，是否重试？", () => func());
            }
            Global.room.onUpdate = this.onRoomUpdate.bind(this);
        });

        func();
    }

    // 停止帧同步
    stopFrameSync() {

        if (Global.room.frameSyncState === Global.ENUM.FrameSyncState.STOP) {
            return;
        }

        const func = () => Global.room.stopFrameSync({}, event => {
            if (event.code !== Global.ErrCode.EC_OK) {
                this.dialog("操作失败，是否重试？", () => func());
            }
        });

        func();
    }

    onRoomUpdate() {
        if (Global.room.roomInfo.frameSyncState === Global.ENUM.FrameSyncState.STOP &&
            !Global.room.roomInfo.playerList.find(player => player.customPlayerStatus === 1)) {
            return this.open(Global.RoomView);
        }
    }

    // 修改用户状态
    changeCustomPlayerStatus(customPlayerStatus) {
        const changeCustomPlayerStatusPara = { customPlayerStatus };

        const func = () => Global.room.changeCustomPlayerStatus(changeCustomPlayerStatusPara, event => {
            if (event.code !== Global.ErrCode.EC_OK) {
                this.dialog("操作失败，是否重试？", () => func());
            }
        });

        func();
    }

    // 玩家发送帧消息
    sendFrame() {
        const data = {
            name: Global.name,
            action: "random",
            number: Math.ceil(Math.random() * 100),
        }

        Global.room.sendFrame({ data });
    }

    frameId = 0;
    frameItems = [];

    onRecvFrame(event) {
        // 在这里处理帧广播

        const frameId = event.data.frame.id;

        // 每隔 15 帧发送一次帧消息
        if (frameId > this.frameId + 15) {
            this.frameId = frameId;
            this.sendFrame();
        }

        // 记录帧广播消息
        if (event.data.frame.items) {
            this.frameItems = this.frameItems.concat(event.data.frame.items);
        }
    }

    drawFrameItems() {
        // 只显示5行
        const max = 5;

        if (this.frameItems.length > max) this.frameItems = this.frameItems.slice(this.frameItems.length - max);

        let msg = "";
        this.frameItems.forEach(item => {
            msg += item.data.name + " : " + item.data.number + "\n";
        });

        this.msgBox.setText(msg);
    }

    onUpdate() {
        // 渲染层不断更新页面
        this.drawFrameItems();
    }

    onDestroy() {
        Global.room.onUpdate = null;
        Global.room.onFrame = null;
    }
}

Global.GameView = GameView;