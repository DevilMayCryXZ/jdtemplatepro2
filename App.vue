<script>
	import { mapMutations } from 'vuex'
	export default {
		globalData: {
			addressitem: uni.getStorageSync('addressitem') || "太原",
			addresscode: uni.getStorageSync('addresscode') || "1401"
		},
		onLaunch: function() {
			// console.log('App Launch')
			// uni.getStorage({
			// 	key: 'userInfo',
			// 	success:(res) => {
			// 		this.login(res.data);
			// 		// 如果还需要重新校验或是想要刷新token的有效时间 就再联网请求一次
			// 		// uni.request({
			// 		// 	url: `${this.$serverUrl}/auth.php`,
			// 		// 	header: {
			// 		// 		"Content-Type": "application/x-www-form-urlencoded",
			// 		// 		"Token":res.data.token
			// 		// 	},
			// 		// 	data: {
			// 		// 		"username":res.data.user_name
			// 		// 	},
			// 		// 	method: "POST",
			// 		// 	success: (e) => {
			// 		// 		if (e.statusCode === 200 && e.data.code === 0) {
			// 		// 			this.login(e.data);
			// 		// 		}
			// 		// 	}
			// 		// })
			// 	},
			// 	fail() {
			// 		uni.navigateTo({
			// 			url: '/pages/login/login'
			// 		})
			// 	}
			// });
			
			let userInfo = uni.getStorageInfoSync('userInfo') || '';
			if (userInfo) {
				// 更新状态
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.login(res.data)
					}
				})
			}
			
		},
		onShow: function() {
			// console.log('App Show')
			// console.log("进入APP");
			// if (uni.getStorageSync("hasLogin")) {
			// 	this.$store.dispatch("login", uni.getStorageSync("userInfo"))
			// }
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods: {  
			...mapMutations(['login'])  // 对全局方法 login 进行监控
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
</style>
