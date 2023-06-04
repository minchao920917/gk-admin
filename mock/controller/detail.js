

import Mock from 'mockjs'
const reviews = []
const count = 40
for (let i = 0; i < count; i++) {
  reviews.push(
    Mock.mock({
      uuid: '@uuid',
      id: '@id',
      author: '@cname',
      date: '@datetime',
      comment: '@csentence(1,100)',
      img: `https://picsum.photos/1920/1080?random=${Mock.Random.guid()}`,
    })
  )
}

const detail = Mock.mock({
      uuid: '@uuid',
      id: '@id',
      title: '@title(1, 2)',
      description: '@csentence(110,1500)',
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
      price: '@integer(0,200)',
      parameters: {
          '颜色': 'White/Black/Laser Orange',
          '型号': 'CU0676-101',
          '生产日期': '@datetime',
          '保质期截止': '@datetime',
          '生产批次':'@integer(80,99)',
          '生产人':'@cname',
      },
      reviews,
    })


export default [
  {
    url: '/detail/getDetail',
    type: 'get',
    response(config) {

      return {
        code: 200,
        msg: 'success',
        data: { detail },
      }
    },
  },
]
