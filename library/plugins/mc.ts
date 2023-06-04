import config from "@/config";
import { ElLoading, ElMessage, ElMessageBox, ElNotification } from "element-plus";
import mitt from "mitt";
import _ from "lodash";
import { globalPropertiesType } from "/#/library";

const { loadingText, messageDuration } = config;
export let gp: globalPropertiesType;

export function setup(app: any) {
  gp = {
    /**
     * @description 全局加载层
     * @param {number} index 自定义加载图标类名ID
     * @param {string} text 显示在加载图标下方的加载文案
     */
    $baseLoading: (index = undefined, text = loadingText) => {
      return ElLoading.service({
        lock: true,
        text,
        spinner: index ? "mc-loading-type" + index : index,
        background: "hsla(0,0%,100%,.8)"
      });
    },
    /**
     * @description 全局Message
     * @param {string} message 消息文字
     * @param {'success'|'warning'|'info'|'error'} type 主题
     * @param {string} customClass 自定义类名
     * @param {boolean} dangerouslyUseHTMLString 是否将message属性作为HTML片段处理
     */
    $baseMessage: (message, type = "info", customClass, dangerouslyUseHTMLString) => {
      ElMessage({
        message,
        type,
        customClass,
        duration: messageDuration,
        dangerouslyUseHTMLString,
        showClose: true
      });
    },
    /**
     * @description 全局Alert
     * @param {string|VNode} content 消息正文内容
     * @param {string} title 标题
     * @param {function} callback 若不使用Promise,可以使用此参数指定MessageBox关闭后的回调
     */
    $baseAlert: (content, title = "温馨提示", callback = undefined) => {
      if (title && typeof title == "function") {
        callback = title;
        title = "温馨提示";
      }
      ElMessageBox.alert(content, title, {
        confirmButtonText: "确定",
        dangerouslyUseHTMLString: true, // 此处可能引起跨站攻击，建议配置为false
        callback: () => {
          if (callback) callback();
        }
        // eslint-disable-next-line prettier/prettier
      }).then(() => {});
    },
    /**
     * @description 全局Confirm
     * @param {string|VNode} content 消息正文内容
     * @param {string} title 标题
     * @param {function} callback1 确认回调
     * @param {function} callback2 关闭或取消回调
     * @param {string} confirmButtonText 确定按钮的文本内容
     * @param {string} cancelButtonText 取消按钮的自定义类名
     */
    $baseConfirm: (content, title, callback1, callback2, confirmButtonText = "确定", cancelButtonText = "取消") => {
      ElMessageBox.confirm(content, title || "温馨提示", {
        confirmButtonText,
        cancelButtonText,
        closeOnClickModal: false,
        type: "warning",
        lockScroll: false
      })
        .then(() => {
          if (callback1) {
            callback1();
          }
        })
        .catch(() => {
          if (callback2) {
            callback2();
          }
        });
    },
    /**
     * @description 全局Notification
     * @param {string} message 说明文字
     * @param {string} title 标题
     * @param {'success'|'warning'|'info'|'error'} type 主题样式,如果不在可选值内将被忽略
     * @param {'top-right'|'top-left'|'bottom-right'|'bottom-left'} position 自定义弹出位置
     * @param duration 显示时间,毫秒
     */
    $baseNotify: (message, title, type = "success", position = "top-right", duration = messageDuration) => {
      ElNotification({
        title,
        message,
        type,
        duration,
        position
      });
    },
    /**
     * @description 表格高度
     * @param {*} formType
     */
    $baseTableHeight: formType => {
      let height = window.innerHeight;
      const paddingHeight = 190;
      const formHeight = 60;

      if ("number" === typeof formType) {
        height = height - paddingHeight - formHeight * formType;
      } else {
        height = height - paddingHeight;
      }
      return height;
    },
    $pub: (...args: any[]) => {
      _emitter.emit(_.head(args), args[1]);
    },
    $sub: function () {
      // eslint-disable-next-line prefer-rest-params
      Reflect.apply(_emitter.on, _emitter, _.toArray(arguments));
      // Reflect.apply(func, thisArg, args) 该函数的功能是调用func函数，传递一个args实参列表，该参数是一个类数组对象；thisArg表示调用时的this对象。
    },
    $unsub: function () {
      // eslint-disable-next-line prefer-rest-params
      Reflect.apply(_emitter.off, _emitter, _.toArray(arguments));
    }
  };

  const _emitter = mitt();
  Object.keys(gp).forEach(key => {
    app.provide(key, gp[key as keyof typeof gp]);
    // 允许vue3下继续使用vue2中的this调用mc方法
    app.config.globalProperties[key] = gp[key as keyof typeof gp];
  });
  // 加载useHead
  //TODO不懂先注释
  // if (process.env['NODE_ENV'] !== `${'development'}`) {
  //   const key = 'mc-icons'
  //   if (!__APP_INFO__['dependencies'][key]) {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     app.config.globalProperties = null
  //   }
  // }
}
