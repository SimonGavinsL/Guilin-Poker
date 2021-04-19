// 模拟全局对象
export const Global = {
  MainView: null,
  RoomView: null,
  GameView: null,
  name: "",
};

// 生成测试 openId
export const mockOpenId = () => "openId_" + Math.ceil(Math.random() * 100) + (new Date()).getMilliseconds();

// 生成测试 userName
export const mockName = () => "user_" + Math.ceil(Math.random() * 100);

// 获得 canvas 上下文
export const canvas = wx.createCanvas();
export const ctx = canvas.getContext('2d');
export const width = canvas.width;
export const height = canvas.height;

// 点击事件回调函数数组
// Handler 结构： [id, [x1, y1, x2, y2], callback]
let clickHandlers = [];

// 开启点击事件监听
wx.onTouchStart(function (e) {
  const {
    clientX,
    clientY
  } = e.touches[0];

  clickHandlers.forEach((handler) => {

    const x1 = handler[1][0];
    const y1 = handler[1][1];
    const x2 = handler[1][2];
    const y2 = handler[1][3];

    if (clientX > x1 && clientX < x2 && clientY > y1 && clientY < y2) {
      handler[2] && handler[2]();
    }
  });
});

// 添加监听
export const onClick = (id, area, callback) => clickHandlers.push([id, area, callback]);

// 移除监听
export const offClick = (id) => clickHandlers = clickHandlers.filter(handler => handler[0] !== id);