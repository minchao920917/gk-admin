/*
 * @Author: 闵超 499790879@qq.com
 * @Date: 2023-04-17 22:00:55
 * @LastEditors: Do not edit
 * @Description:
 */
/**
 * @description 导出vue/cli配置，以下所有配置修改需要重启项目
 */
export default {
  // 正式项目可以选择自己配置成需要的接口地址，如"https://api.xxx.com"
  // 问号后边代表开发环境，冒号后边代表生产环境
  baseURL: process.env.NODE_ENV === "development" ? "" : "/mock-server",
  // 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/json;charset=UTF-8",
  // 最长请求时间
  requestTimeout: 10000,
  // 操作正常code，支持String、Array、int多种类型
  successCode: [200, 0, "200", "0"],
  // 数据状态的字段名称
  statusName: "code",
  // 状态信息的字段名称
  messageName: "msg"
};
