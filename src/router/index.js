import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Index from '@/components/Index.vue'
import Component1 from '@/components/Component1'
import Component2 from '@/components/Component2'
import Component3 from '@/components/Component3'
import Component3_1 from '@/components/Component3-1'
import Component3_2 from '@/components/Component3-2'
import Component3_3 from '@/components/Component3-3'
import Component3_3_1 from '@/components/Component3-3-1'
import Component3_3_2 from '@/components/Component3-3-2'
import Component3_3_3 from '@/components/Component3-3-3'
import Component3_3_4 from '@/components/Component3-3-4'
import Component3_4 from '@/components/Component3-4'
import Component3_4_1 from '@/components/Component3-4-1'
import Component3_4_2 from '@/components/Component3-4-2'
import Component4 from '@/components/Component4'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  //ngnix配置
  // base:'/vue-admin/',
  routes: [{
    
      path: '/login',
      name: '登录',
      component: Login,
    },
    {
      path: '/',
      name: '后台管理系统',
      component: HelloWorld,
      children: [{
          path: '/',
          name: '首页',
          component: Index
        },
        {
          path: '/1',
          name: '个人管理',
          component: Component1,

        },
        {
          path: '/2',
          name: '用户管理',
          component: Component2,
        },
        {
          name: '内容管理',
          path: ':id', //无值
          component: Component3,
          children: [{
              path: '/3-1',
              name: '课程信息',
              component: Component3_1,
            },
            {
              path: '/3-2',
              name: '课程学习',
              component: Component3_2,
            },
            {
              path: ':id',
              name: '资源管理',
              component: Component3_3,
              children:[
                {
                  path: '/3-3-1',
                  name: '导学资源',
                  component: Component3_3_1,
                },
                {
                  path: '/3-3-2',
                  name: '学习资源',
                  component: Component3_3_2,
                },
                {
                  path: '/3-3-3',
                  name: '复习资源',
                  component: Component3_3_3,
                },
                {
                  path: '/3-3-4',
                  name: '课程FAQ',
                  component: Component3_3_4,
                },
              ]
            },
            {
              name: '作业管理',
              path: ':id',
              component: Component3_4,
              children:[
                {
                  path: '/3-4-1',
                  name: '自我测试',
                  component: Component3_4_1,                  
                },
                {
                  path: '/3-4-2',
                  name: '模拟试卷',
                  component: Component3_4_2,                  
                },
              ]
            },
          ]
        },
        {
          path: '/4',
          name: '系统管理',
          component: Component4,

        },
      ],
    },


  ]
})
