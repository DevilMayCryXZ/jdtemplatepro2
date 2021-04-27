import {RouterMount,createRouter} from 'uni-simple-router';
import store from '@/store/index.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [
		...ROUTES,
		{
		  path: '*',
		  redirect:(to)=>{
			  return {path: "/pages/404/404"}
		  }
		}
	]
});

router.beforeEach((to, from, next) => {
	// debugger
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.hasLogin) {  // 通过vuex state获取当前的token是否存在
            console.log("是否登录：" + store.state.hasLogin)
			next();
        }
        else {
            next({
				path: '/pages/personalHome/login/login',
                query: {redirect: to.fullPath},  // 将跳转的路由path作为参数，登录成功后跳转到该路由
				NAVTYPE: 'push'
			})
        }
    }
    else {
        next();
    }
})
// 全局路由后置守卫
router.afterEach((to, from) => {
    // console.log('跳转结束');
})

export {
	router,
	RouterMount
}