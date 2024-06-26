import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

const routeModuleList: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/index',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'i-simple-icons:atlassian',
    },
    children: [
      {
        path: 'index',
        name: 'DashboardPage',
        meta: {
          keepAlive: false,
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
      {
        path: 'chongzhi',
        name: 'chongzhiPage',
        meta: {
          keepAlive: false,
          title: '充值',
          hiddenHeader: true,
        },
        component: () => import('@/views/dashboard/chongzhi.vue'),
      },
      {
        path: 'xiaofei',
        name: 'xiaofeiPage',
        meta: {
          keepAlive: false,
          title: '消费',
          hiddenHeader: true,
        },
        component: () => import('@/views/dashboard/xiaofei.vue'),
      },
      {
        path: 'consume',
        name: 'consumePage',
        meta: {
          keepAlive: false,
          title: '消费记录',
          hiddenHeader: true,
        },
        component: () => import('@/views/dashboard/consume.vue'),
      },
      {
        path: 'recharge',
        name: 'rechargePage',
        meta: {
          keepAlive: false,
          title: '充值记录',
          hiddenHeader: true,
        },
        component: () => import('@/views/dashboard/recharge.vue'),
      },
      {
        path: 'dictConf',
        name: 'dictConfPage',
        meta: {
          keepAlive: false,
          title: '系统配置',
          hiddenHeader: true,
        },
        component: () => import('@/views/dictConf/index.vue'),
      },
      {
        path: 'dictItem',
        name: 'dictItemPage',
        meta: {
          keepAlive: false,
          title: '详情配置',
          hiddenHeader: true,
        },
        component: () => import('@/views/dictConf/dictItem.vue'),
      },
    ],
  },
  // {
  //   path: '/message',
  //   name: 'Message',
  //   redirect: '/message/index',
  //   component: Layout,
  //   meta: {
  //     title: '统计',
  //     icon: 'i-simple-icons:soundcharts',
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'MessagePage',
  //       meta: {
  //         keepAlive: false,
  //       },
  //       component: () => import('@/views/message/index.vue'),
  //     },
  //   ],
  // },
  {
    path: '/example',
    name: 'Example',
    redirect: '/example/index',
    component: Layout,
    meta: {
      title: '会员',
      icon: 'i-material-symbols:award-star',
    },
    children: [
      {
        path: 'index',
        name: 'memberList',
        meta: {
          keepAlive: false,
        },
        component: () => import('@/views/example/index.vue'),
      },
      {
        path: '/member/add',
        name: 'addMember',
        meta: {
          title: '添加会员',
          keepAlive: false,
          hiddenHeader: true,
        },
        component: () => import('@/views/example/member/add.vue'),
      },
      {
        path: '/member/edit',
        name: 'editMember',
        meta: {
          title: '编辑会员信息',
          keepAlive: false,
          hiddenHeader: true,
        },
        component: () => import('@/views/example/member/add.vue'),
      },
      {
        path: '/member/detail',
        name: 'detailMember',
        meta: {
          title: '会员详细信息',
          keepAlive: false,
          hiddenHeader: true,
        },
        component: () => import('@/views/example/member/detail.vue'),
      },
    ],
  },
  {
    path: '/my',
    name: 'My',
    redirect: '/my/index',
    component: Layout,
    meta: {
      title: '我的',
      icon: 'i-simple-icons:docsify',
    },
    children: [
      {
        path: 'index',
        name: 'MyPage',
        meta: {
          keepAlive: false,
          hiddenHeader: true,
        },
        component: () => import('@/views/my/index.vue'),
      },
      {
        path: '/editUserInfo',
        name: 'EditUserInfo',
        meta: {
          title: '编辑个人信息',
          innerPage: true,
          hiddenHeader: true,
        },
        component: () => import('@/views/my/EditUserInfo.vue'),
      },
      // my innerPage

      {
        path: '/editNickname',
        name: 'EditNickname',
        meta: {
          title: '修改昵称(该页面已缓存)',
          innerPage: true,
          hiddenHeader: true,
          keepAlive: true,
        },
        component: () => import('@/views/my/EditNickname.vue'),
      },
      {
        path: '/editSign',
        name: 'EditSign',
        meta: {
          title: '修改签名',
          hiddenHeader: true,
          innerPage: true,
        },
        component: () => import('@/views/my/EditSign.vue'),
      },
      {
        path: '/accountSetting',
        name: 'AccountSetting',
        meta: {
          title: '账号与安全',
          hiddenHeader: true,
          innerPage: true,
        },
        component: () => import('@/views/my/AccountSetting.vue'),
      },
      {
        path: '/changePassword',
        name: 'ChangePassword',
        meta: {
          title: '修改登录密码',
          innerPage: true,
          hiddenHeader: true,
        },
        component: () => import('@/views/my/ChangePassword.vue'),
      },
      {
        path: '/themeSetting',
        name: 'ThemeSetting',
        meta: {
          title: '主题设置',
          innerPage: true,
          hiddenHeader: true,
        },
        component: () => import('@/views/my/ThemeSetting.vue'),
      },
    ],
  },
]

export default routeModuleList
