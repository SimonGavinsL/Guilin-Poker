// 房间页
import * as Util from "../Util.js";
import BaseView from "./BaseView.js";
import Component from "../component/index.js";
const Global = Util.Global;

export default class RoomView extends BaseView {

    button;
    msgBox;

    // 自定义玩家状态：“0和1表示玩家“未准备”、“已准备”
    customPlayerStatus;

    constructor() {
        super();
    }

    onInit() {
        const button1 = new Component.Button(20, 20, "准备");
        // 点击后切换状态
        button1.onClick(() => this.changeCustomPlayerStatus(this.customPlayerStatus === 1 ? 0 : 1));

        this.button = button1;

        const button2 = new Component.Button(150, 20, "退出房间");
        button2.onClick(() => this.leaveRoom());

        const msgBox = new Component.MsgBox(20, 100, "");
        this.msgBox = msgBox;

        this.addComponent(button1);
        this.addComponent(button2);
        this.addComponent(msgBox);

        this.onRoomUpdate();
        Global.room.onUpdate = this.onRoomUpdate.bind(this);
        // 设置广播回调
        Global.room.onJoinRoom = this.onJoinRoom.bind(this);
    }

    // 修改用户自定义状态
    changeCustomPlayerStatus(customPlayerStatus) {
        const changeCustomPlayerStatusPara = {
            customPlayerStatus
        };

        Global.room.changeCustomPlayerStatus(changeCustomPlayerStatusPara, event => {
            if (event.code !== Global.ErrCode.EC_OK) {
                return this.toast("操作失败" + event.code);
            }

            return this.customPlayerStatus = customPlayerStatus;
        });
    }

    onRoomUpdate() {
        // 更新 按钮
        const playerId = MGOBE.Player.id;
        const player = Global.room.roomInfo.playerList.find(player => player.id === playerId);

        if (player) {
            this.customPlayerStatus = player.customPlayerStatus;

            // 更新 按钮 文字
            if (player.customPlayerStatus === 0) {
                this.button.setText("准备");
            } else {
                this.button.setText("取消准备");
            }
        }

        // 更新 MsgBox
        let msg = "房间ID:\n" + Global.room.roomInfo.id + "\n玩家列表:\n";
        Global.room.roomInfo.playerList.forEach((player, i) => {
            msg += i + ":" + player.id + (player.customPlayerStatus === 1 ? " 已准备" : " 未准备") + "\n";
        });

        this.msgBox.setText(msg);

        if (Global.room.isInRoom() && !Global.room.roomInfo.playerList.find(player => player.customPlayerStatus !== 1)) {
            // 全部玩家准备好就跳转
            setTimeout(() => this.open(Global.GameView), 1000);
        }
    }

    // 加房广播
    onJoinRoom(event) {
        this.toast("新玩家加入");
    }

    // 退出房间
    leaveRoom() {
        Global.room.leaveRoom({}, event => {
            if (event.code !== Global.ErrCode.EC_OK && event.code !== Global.ErrCode.EC_ROOM_PLAYER_NOT_IN_ROOM) {
                return this.toast("操作失败" + event.code);
            }
            return this.open(Global.MainView);
        });
    }

    onUpdate() { }

    onDestroy() {
        Global.room.onUpdate = null;
        Global.room.onJoinRoom = null;
    }
}

Global.RoomView = RoomView;