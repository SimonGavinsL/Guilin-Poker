// 导入 MGOBE.js
import "./MGOBE.js";
// 获取 Room、Listener 对象
const {
  Room,
  Listener,
  ErrCode,
  ENUM
} = MGOBE;

import * as Util from "./Util.js";
const Global = Util.Global;

// 导入页面
import "./view/MainView.js";
import "./view/RoomView.js";
import "./view/GameView.js";

import Credentials from "./Credentials.js";
const credentials = new Credentials();

const gameInfo = {
  // 随机生成 玩家 ID
  openId: Util.mockOpenId(),
  // 替换 为控制台上的“游戏ID”
  gameId: credentials.gameId,
  // 替换 为控制台上的“密钥”
  secretKey: credentials.secretKey,
};

const config = {
  // 替换 为控制台上的“域名”
  url: credentials.url,
  reconnectMaxTimes: 5,
  reconnectInterval: 1000,
  resendInterval: 1000,
  resendTimeout: 10000,
  autoRequestFrame: true,
};

// 初始化 Listener
Listener.init(gameInfo, config, event => {
  if (event.code === ErrCode.EC_OK) {

    console.log("初始化成功");

    // 接收广播
    Listener.add(room);

    // 启动页为 MainView
    new Global.MainView();
  } else {
    console.error("初始化失败", event);
  }
});

// 实例化 Room 对象
const room = new Room();

// 保存常用对象的引用
Global.room = room;
Global.ErrCode = ErrCode;
Global.ENUM = ENUM;
Global.gameInfo = gameInfo;