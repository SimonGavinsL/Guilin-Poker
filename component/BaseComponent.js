// 组件基类
import * as Util from "../Util.js";

export default class BaseComponent {

  id;
  // 组件区域
  area = [0, 0, 0, 0];

  constructor() {
    // 为组件生成 ID
    this.id = Math.ceil(Math.random() * 10000) + "_" + Date.now();
  }

  // 子类实现具体绘制方法
  render() { }

  // 记录组件区域
  setArea(x, y, w, h) {
    this.area[0] = x;
    this.area[1] = y;
    this.area[2] = x + w;
    this.area[3] = y + h;
  }

  // 注册点击事件
  onClick(callback) {
    this.offClick();
    Util.onClick(this.id, this.area, callback);
  }

  // 取消点击事件
  offClick() {
    Util.offClick(this.id);
  }

  // 销毁
  onDestroy() {
    this.offClick();
  }
}