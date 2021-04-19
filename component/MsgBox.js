import * as Util from "../Util.js";
import BaseComponent from "./BaseComponent.js";

export default class MsgBox extends BaseComponent {
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
    const width = Util.width - 2 * this.x;
    const height = 300;
    const padding = 5;

    // 清除原图形
    Util.ctx.strokeStyle = "black";
    Util.ctx.fillStyle = "white";

    Util.ctx.fillRect(this.x, this.y, width, height);
    Util.ctx.strokeRect(this.x, this.y, width, height);

    // 绘制图形
    Util.ctx.strokeStyle = "black";
    Util.ctx.fillStyle = "black";
    Util.ctx.font = "15px Arial";

    const texts = this.text.split("\n");

    texts.forEach((t, i) => Util.ctx.fillText(t, this.x + padding, this.y + padding + (i + 1) * (15 + padding), width - padding * 2));

    // 记录文本框区域
    this.setArea(this.x, this.y, width, height);
  }

  // 设置文本内容
  setText(text) {
    this.text = text;
    this.render();
  }
}