export default {
	getToken(options, resolve, reject) {
		if (!options.isLogin || options.isLogin == "") {
			let access_token = uni.getStorageSync("access_token")
			if (!access_token) {
				uni.navigateTo({
					url: "/pages/personalHome/login/login.vue"
				})
				return;
			}
		}
		uni.request({
			url: getApp().$httpPath + "/auth/getToken",
			method: "POST",
			data: {
				username: uni.getStorageSync("username"),
				password: uni.getStorageSync("password")
			},
			success: (res) => {
				uni.setStorageSync("username", "");
				uni.setStorageSync("password", "");
				if (res.data.code == 200) {
					let resData = res.data.data;
					uni.setStorageSync("access_token", resData.access_token);
					uni.setStorageSync("refresh_token", resData.refresh_token);
					uni.setStorageSync("expiredTime", resData.expiredTime);
					if (!options.isLogin) {
						this.myRequest(options, resolve, reject);
					}
				}
			}
		})
	},
	myRequest(options, resolve, reject) {
		uni.request({
			url: options.url,
			method: options.method || "POST",
			data: options.data || {},
			header: {
				Authorization: uni.getStorageSync("access_token")
			},
			success: (res) => {
				let status = res.data.status;
				if(!status){
					status = res.statusCode;
				}
				if (status !== 200) {
					if (status == 401) {
						this.getToken(options, resolve, reject);
					} else {
						return uni.showToast({
							icon: "none",
							title: "获取数据失败"
						})
					}
				} else {
					resolve(res, options);
				}
			},
			fail: (err) => {
				uni.showToast({
					icon: "none",
					title: "请求接口失败"
				})
				reject(err, options);
			}
		})
	}
}
