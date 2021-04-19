// 页面基类
import * as Util from "../Util.js";
const Global = Util.Global;

export default class BaseView {

  // 页面内组件数组，如 Button、MsgBox
  components = [];

  constructor() {
    // 使用每个页面自己的 onUpdate 函数进行渲染
    AnimateUtil.callback = this.onUpdate.bind(this);

    // 初始化页面背景
    Util.ctx.fillStyle = 'white';
    Util.ctx.fillRect(0, 0, Util.width, Util.height);

    wx.hideLoading();
    this.onInit();
  }

  // 页面的生命周期
  // onInit: 进入页面前调用
  // onUpdate: 渲染层页面更新时调用
  // onDestroy: 离开页面后调用
  // 子类可以实现这三个方法
  onInit() { }
  onUpdate() { }
  onDestroy() { }

  // 跳转到其他页面
  open(ViewClass) {
    this.onDestroy();

    // 清除页面组件
    this.components.forEach(component => component.onDestroy());
    this.components = [];

    // 跳转
    setTimeout(() => new ViewClass());
  }

  // 添加组件
  addComponent(component) {
    this.components.push(component);
    component.render();
  }

  // 显示 toast
  toast(title) {
    wx.showToast({
      title,
      icon: 'none',
    });
  }

  // 显示 loading
  loading(title) {
    wx.showLoading({
      title,
    });
  }

  // 显示 Dialog
  dialog(content, confirm) {
    wx.showModal({
      title: '提示',
      content,
      success(res) {
        if (res.confirm) {
          confirm && confirm();
        }
      }
    })
  }
}

// 页面定时渲染
const AnimateUtil = {
  callback: () => { },
  run: () => {
    AnimateUtil.callback && AnimateUtil.callback();
    requestAnimationFrame(AnimateUtil.run);
  }
}

AnimateUtil.run();