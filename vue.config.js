const TransformPages = require('uni-read-pages')
const {
	webpack
} = new TransformPages()
// 代理参数
const port = 8080;
const baseURL = "http://192.168.0.219:8720/jdnet_cus";
var appContext = "jdnet_cus";
var exg = "/Path=\/" + appContext + "/";
var aaa = new RegExp("\\/Path=\/" + appContext + "\\/");

module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath', 'meta']
					});
					return JSON.stringify(tfPages.routes)
				}, true)
			})
		]
	},
	devServer: {
		port,
		// open: true,
		overlay: {
			warnings: false,
			errors: true
		},
		// 配置代理 （以接口 https://www.easy-mock.com/mock/5ce2a7854c85c12abefbae0b/api 说明）
		proxy: {
			// 订单中心
			"/jdmall": {
				// target: process.env.VUE_APP_URL,
				target: "http://192.168.0.148:8480/rest",
				changeOrigin: true, // 是否改变域名
				// ws: true,
				pathRewrite: {
					'^/jdmall': '' //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替 
					//比如我要调用'http://40.00.100.133:3002/user/login'，直接写‘/api/user/login'即可
				},
				// logLevel: "debug",
				onProxyRes: function(proxyRes, req, res) {

				}
			},
			// 个人中心
			"/api": {
				// target: process.env.VUE_APP_URL,
				target: baseURL,
				changeOrigin: true, // 是否改变域名
				// ws: true,
				pathRewrite: {
					'^/api': '' //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替 
					//比如我要调用'http://40.00.100.133:3002/user/login'，直接写‘/api/user/login'即可
				},
				// logLevel: "debug",
				onProxyRes: function(proxyRes, req, res) {
					const cookies = proxyRes.headers['set-cookie']
					if (cookies) {
						const newCookies = cookies.map(cookie => {
							return cookie.replace(/Path=\/jdnet_cus/, 'Path=/') // 正则替换当前项目名称
						})
						delete proxyRes.headers['set-cookie']
						proxyRes.headers['set-cookie'] = newCookies
					}
				}
			}
		}
		// 下边这个， 如果你是本地自己mock 的话用after这个属性，线上环境一定要干掉
		// after: require("./mock/mock-server.js")
	}
}
