import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '',
            redirect: '/welcome'
        },
        {
            path: '/welcome',
            name: 'welcome',
            meta: {
                title: '欢迎使用',
            },
            component: () => import('../views/welcome/WelcomePage.vue')
        },
        {
            path: '/main',
            name: 'main',
            meta: {
                title: '轨迹预测方法研究原型系统V1.0',
            },
            component: () => import('@/views/main/index.vue')
        }
    ]
})

export default router;