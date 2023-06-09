
import mockjs from 'mockjs'

const tokens = {
  admin: `admin-token-${mockjs.Random.guid()}-${new Date().getTime()}`,
  editor: `editor-token-${mockjs.Random.guid()}-${new Date().getTime()}`,
  test: `test-token-${mockjs.Random.guid()}-${new Date().getTime()}`,
}
const username2role = {
  admin: ['Admin'],
  editor: ['Editor'],
  test: ['Admin', 'Editor'],
}
const role2permission = {
  Admin: ['read:system', 'write:system', 'delete:system'],
  Editor: ['read:system', 'write:system'],
  Test: ['read:system'],
}

export default [
  {
    url: '/publicKey',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          mockServer: true,
          publicKey:
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlid6DUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXM8yTt5Na1jAYSiQ/wIDAQAB',
        },
      }
    },
  },
  {
    url: '/login',
    type: 'post',
    response(config) {
      const { username } = config.body
      const token = tokens[username]
      if (!token)
        return {
          code: 500,
          msg: '帐户或密码不正确',
        }
      return {
        code: 200,
        msg: 'success',
        data: { token },
      }
    },
  },
  {
    url: '/socialLogin',
    type: 'post',
    response(config) {
      const { code } = config.body
      if (!code)
        return {
          code: 500,
          msg: '未成功获取Token',
        }

      return {
        code: 200,
        msg: 'success',
        data: { token: tokens['admin'] },
      }
    },
  },
  {
    url: '/register',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟注册成功',
        data: { token: tokens['editor'] },
      }
    },
  },
  {
    url: '/userInfo',
    type: 'get',
    response(config) {
      const authorization =
        config.headers.authorization || config.headers.Authorization
      if (!authorization.startsWith('Bearer '))
        return {
          code: 401,
          msg: '令牌无效',
        }
      const _authorization = authorization.replace('Bearer ', '')
      const isTrue = _authorization.includes('-token-')
      const username = isTrue ? _authorization.split('-token-')[0] : 'admin'
      const roles = username2role[username] || []
      const permissions = [
        ...new Set(roles.flatMap((role) => role2permission[role])),
      ]

      return {
        code: 200,
        msg: 'success',
        data: {
          username,
          roles,
          permissions,
          avatar: 'https://s1.ax1x.com/2023/03/21/ppU8Txg.jpg',
        },
      }
    },
  },
  {
    url: '/logout',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]
