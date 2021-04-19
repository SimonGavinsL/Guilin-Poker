import * as Util from "../Util.js";
import BaseComponent from "./BaseComponent.js";

export default class Button extends BaseComponent {
  x;
  y;
  text;

  constructor(x, y, text) {
    super();

    this.x = x;
    this.y = y;
    this.text = text;
  }

  // 绘制
  render() {
    // 清除原图像
    Util.ctx.lineWidth = 2;
    Util.ctx.fillStyle = "white";

    const x1 = this.area[0] - Util.ctx.lineWidth / 2;
    const y1 = this.area[1] - Util.ctx.lineWidth / 2;
    const x2 = this.area[2] + this.area[0] + Util.ctx.lineWidth / 2;
    const y2 = this.area[3] + this.area[1] + Util.ctx.lineWidth / 2;
    Util.ctx.fillRect(x1, y1, x2, y2);

    // 绘制图形
    Util.ctx.strokeStyle = "black";
    Util.ctx.fillStyle = "black";
    Util.ctx.font = "20px Arial";

    const padding = 5;
    const width = Util.ctx.measureText(this.text).width + padding * 2;
    const height = 20 + padding * 2;

    Util.ctx.strokeRect(this.x, this.y, width, height);
    Util.ctx.fillText(this.text, this.x + padding, this.y + height - padding - 3);

    // 记录按钮区域
    this.setArea(this.x, this.y, width, height);
  }

  // 设置文本内容
  setText(text) {
    this.text = text;
    this.render();
  }
}