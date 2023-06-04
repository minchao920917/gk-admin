

import Mock from 'mockjs'
const List = []
const count = 1000
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      uuid: '@uuid',
      id: '@id',
      title: '@title(1, 2)',
      description: '@csentence',
      content: '@csentence(8,100)',
      'status|1': ['published', 'draft', 'deleted'],
      author: '@cname',
      datetime: '@datetime',
      pageViews: '@integer(300, 5000)',
      img: `https://picsum.photos/1920/1080?random=${Mock.Random.guid()}`,
      switch: '@boolean',
      percent: '@integer(80,99)',
      'rate|1': [1, 2, 3, 4, 5],
      'type|1': [0, 1],
      percentage: '@integer(0,100)',
      UserCount: '@cname',
      MaterialCount: '@integer(0,100)',
      OrderCount: '@integer(0,100)',
    })
  )
}

export default [
  {
    url: '/table/getList',
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
  {
    url: '/table/doEdit',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/table/doDelete',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
]
