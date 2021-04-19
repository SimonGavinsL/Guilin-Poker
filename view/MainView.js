// 游戏主页
import * as Util from "../Util.js";
import BaseView from "./BaseView.js";
import Component from "../component/index.js";
const Global = Util.Global;

export default class MainView extends BaseView {
  constructor() {
    super();
  }

  onInit() {
    const button = new Component.Button(20, 20, "快速加房");
    // 绑定点击事件
    button.onClick(() => this.matchRoom());

    const msgBox = new Component.MsgBox(20, 100, "");

    this.addComponent(button);
    this.addComponent(msgBox);
  }

  matchRoom() {

    this.loading('匹配中...');

    const playerInfo = {
      name: Util.mockName(),
    };

    Global.name = playerInfo.name;

    const matchRoomPara = {
      playerInfo,
      maxPlayers: 2,
      roomType: "1",
    };

    // 调用房间匹配接口实现快速加房
    Global.room.matchRoom(matchRoomPara, event => {
      wx.hideLoading();
      if (event.code === Global.ErrCode.EC_OK) {
        // 接口调用成功，跳转到 RoomView
        return this.open(Global.RoomView);
      }

      return this.toast("匹配失败" + event.code + " " + event.msg);
    });
  }

  onUpdate() { }

  onDestroy() { }
}

Global.MainView = MainView;