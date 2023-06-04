/*
 * @Author: 闵超 499790879@qq.com
 * @Date: 2023-01-10 11:32:39
 * @LastEditors: Do not edit
 * @Description:
 */
const List = [
  {
    uuid: '@uuid',
    icon: 'dashboard-2-line',
    title: 'Dashboard Pro',
    price: 'Admin Pro + Admin Plus 1299版本赠品',
    label: ['敬请期待', '人工智能', '科技风'],
    company: 'vdp',
    url: 'https://vue-admin-beautiful.com/dashboard-pro',
    description: 'Admin Pro + Admin Plus 1299版本赠品',
  },
  {
    uuid: '@uuid',
    svg:
      'https://fastly.jsdelivr.net/gh/' +
      'chuzh' +
      'ixin/image' +
      '/logo/vdb.svg',
    title: 'vue-datav-beautiful-pro',
    price: 'Admin Pro + Adm' + 'in Plus 1299版本赠品',
    label: ['数据大屏'],
    company: 'vdb',
    url: 'https://github.com/vue-' + 'datav-beautiful',
    description: '立志做' + '国内最好' + '的数据大屏应用',
  },
  {
    uuid: '@uuid',
    image:
      'https://fastly.jsdelivr.net/gh/' +
      'chuzh' +
      'ixin/image' +
      '/goods/uview.gif',
    title: 'uview',
    price: '免费',
    label: ['uniapp', '跨平台', '组件'],
    company: '言信网络',
    url: 'http://uviewui.com',
    description:
      '跨 7 端移动端框架，全面的组件和便' + '捷的工具会让您信手拈来，如鱼得水',
  },
  {
    uuid: '@uuid',
    title: 'form-generator',
    icon: 'newspaper-line',
    price: '免费',
    label: ['element-ui', '表单设计器'],
    company: 'form-generator',
    url: 'https://mrhj.gitee.io/form-generator',
    description: 'Element UI表单设' + '计及代码生成器',
  },
  {
    uuid: '@uuid',
    title: 'OPSLI',
    image:
      'https://fastly.jsdelivr.net/gh/' +
      'chuzh' +
      'ixin/image' +
      '/goods/OPSLI.png',
    price: '免费',
    label: ['spring-boot', 'mc-admin'],
    company: 'OPSLI',
    url: 'https://www.op' + 'sli.com',
    description: 'mc-admin开源' + '版结合spring boot的最佳实践',
  },
  {
    uuid: '@uuid',
    title: 'WangEditor',
    image: 'https://www.wangedi' + 'tor.com/image/logo.png',
    price: '免费',
    label: ['富文本编辑器'],
    company: 'WangEditor',
    url: 'https://www.wangeditor.com/v5/',
    description: '绝佳' + '的富文本' + '编辑器组件，感谢巨人',
  },
]

export default [
  {
    url: '/goods/getList',
    type: 'get',
    response(config) {
      const { title, pageNo = 1, pageSize = 20 } = config.query
      const mockList = List.filter(
        (item) => !(title && item.title.indexOf(title) < 0)
      )
      const list = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      )
      return {
        code: 200,
        msg: 'success',
        data: { list, ...{ total: mockList.length } },
      }
    },
  },
]
