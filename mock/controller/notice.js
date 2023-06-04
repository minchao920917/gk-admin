/*
 * @Author: 闵超 499790879@qq.com
 * @Date: 2023-01-10 11:32:39
 * @LastEditors: Do not edit
 * @Description:
 */
const notices = [
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
    notice:
      'github开源地址：<a target="_blank" href="https://github.com/minchao920917/mc-admin">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/0/15640_100.gif',
    notice:
      'Admin Pro：<a target="_blank" href="https://vue-admin-plus.com/admin-pro">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/9/15919_100.gif',
    notice:
      'Admin Plus：<a target="_blank" href="https://vue-admin-plus.com/admin-plus">点我</a>',
  },
]
const messages = [
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
    notice:
      'github开源地址：<a target="_blank" href="https://github.com/minchao920917/mc-admin">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/0/15640_100.gif',
    notice:
      'Admin Pro：<a target="_blank" href="https://vue-admin-plus.com/admin-pro">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/9/15919_100.gif',
    notice:
      'Admin Plus：<a target="_blank" href="https://vue-admin-plus.com/admin-plus">点我</a>',
  },
]
const List = [
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
    notice:
      'github开源地址：<a target="_blank" href="https://github.com/minchao920917/mc-admin">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/0/15640_100.gif',
    notice:
      'Admin Pro：<a target="_blank" href="https://vue-admin-plus.com/admin-pro">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/9/15919_100.gif',
    notice:
      'Admin Plus：<a target="_blank" href="https://vue-admin-plus.com/admin-plus">点我</a>',
  },
]

export default [
  {
    url: '/notice/getList',
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: {
          notices: notices,
          messages: messages,
          list: List,
        },
      }
    },
  },
]
