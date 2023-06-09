/*
 * @Author: minchao920917 499790879@qq.com
 * @Date: 2023-06-04 10:22:14
 * @LastEditors: Do not edit
 * @Description:
 */
// ? 全局默认配置项
import cli from "./cli.config";
import setting from "./setting.config";
import theme from "./theme.config";
import network from "./net.config";

// 首页地址（默认）
export const HOME_URL: string = "/home/index";

// 登录页地址（默认）
export const LOGIN_URL: string = "/login";

// 引导页地址（默认）
export const GUIDE_URL: string = "/guide";

// 默认主题颜色
export const DEFAULT_PRIMARY: string = "#009688";

// 路由白名单地址（必须是本地存在的路由 staticRouter.ts 中）
export const ROUTER_WHITE_LIST: string[] = ["/500"];

// 高德地图 key
export const AMAP_MAP_KEY: string = "";

// 百度地图 key
export const BAIDU_MAP_KEY: string = "";
export default {
  ...cli,
  ...setting,
  ...theme,
  ...network
};
