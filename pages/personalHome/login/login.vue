<template>
	<view class="content">
		<view class="header">
			<image src="/static/personalHome/login/logo.png"></image>
		</view>

		<view class="list" v-if="type">
			<view class="list-call">
				<image class="img" src="/static/personalHome/login/1.png"></image>
				<input class="sl-input" v-model="yhm" maxlength="11" placeholder="请输入用户名" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/personalHome/login/2.png"></image>
				<input class="sl-input" v-model="password" type="text" maxlength="20" placeholder="请输入密码"
					password="true" />
			</view>
		</view>
		<view class="list" v-if="!type">
			<view class="list-call">
				<label>+86</label>
				<input class="sl-input" v-model="phone" type="number" maxlength="11" placeholder="请输入手机号" />
			</view>
			<view class="list-call">
				<input class="sl-input" v-model="phoneYzm" type="text" maxlength="32" placeholder="请输入验证码"
					password="true" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
		</view>


		<view class="button-login" hover-class="button-hover" @tap="bindLogin()">
			<text>登录</text>
		</view>
		<!-- <view class="loginTypeSwitch" @click="loginTypeSwitch">{{ loginType }}</view> -->
		<view class="agreenment">
			<navigator url="/pages/personalHome/login/reg" open-type="navigate">注册账户</navigator>
			<navigator url="/pages/personalHome/login/forget" open-type="navigate">忘记密码?</navigator>
		</view>
	</view>
</template>

<script>
	var _this, js;
	import {
		mapMutations
	} from 'vuex'
	import axios from 'axios'
	import qs from 'qs'
	export default {
		data() {
			return {
				type: true,
				yhm: '',
				password: '',
				second: 0,
				phone: '',
				phoneYzm: ''
			};
		},
		onLoad() {
			_this = this;
		},
		onUnload() {
			clearInterval(js)
			this.second = 0;
		},
		computed: {
			loginType() {
				if (this.type) {
					return "更换为手机验证码登录";
				} else {
					return "更换为账号密码登录";
				}
			},
			yanzhengma() {
				if (this.second <= 0) {
					return '获取验证码';
				} else {
					if (this.second < 10) {
						return '重新获取(0' + this.second + ")";
					} else {
						return '重新获取(' + this.second + ")";
					}
				}
			}
		},
		onUnload() {
			this.clear()
		},
		methods: {
			...mapMutations(['login']),
			bindLogin() {
				let that = this;
				let data = {
					modern: 1,
					deviceType: "Phone",
					login: "",
					password: "",
					userLogin: "",
					year: "",
					injdh5frame: 1
				};
				if (this.type) {
					data.userLogin = "account";
					data.login = this.yhm;
					data.password = this.password;
					if (!data.login || data.login < 6) {
						uni.showToast({
							icon: 'none',
							title: '用户名不正确'
						});
						return;
					}
					// if (data.password.length < 6 || data.password.length > 20) {
					// 	uni.showToast({
					// 		icon: 'none',
					// 		title: '密码不正确'
					// 	});
					// 	return;
					// }
				} else {
					data.userLogin = "mobile";
					data.login = this.phone;
					data.password = this.phoneYzm;
					if (data.login != 11) {
						uni.showToast({
							icon: 'none',
							title: '手机号不正确'
						});
						return;
					}
					if (data.password.length != 6) {
						uni.showToast({
							icon: 'none',
							title: '验证码不正确'
						});
						return;
					}
				}

				axios.defaults.baseURL = location.origin;
				axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
				const options = {
					method: 'POST',
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					crossDomain: true,
					withCredentials: false, // default  表示跨域请求时是否需要使用凭证
					data: qs.stringify(data),
					url: 'api/login'
				};
				axios(options)
					.then(function(response) {
						uni.setStorageSync("username", data.login);
						uni.setStorageSync("password", data.password);
						that.$jdGlo.getToken({
							isLogin: true
						});
						that.login(response);
						uni.navigateBack();
						uni.navigateTo({
							url: "/pages/personalHome/personalHome"
						})
						console.log(response);
					})
					.catch(function(error) {
						// debugger
						console.log(error);
					});
			},
			loginTypeSwitch() {
				this.type = !this.type;
			},
			getcode() {
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.second > 0) {
					return;
				}
				this.second = 60;
				//请求业务
				js = setInterval(function() {
					if (_this.second == 0) {
						_this.clear()
					}
					_this.second--;
				}, 1000)
				uni.request({
					url: this.$httpPathExt, //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {
						action: "sys.UserController",
						data: [{
							mobile: this.phone
						}],
						method: "sendSms",
						tid: 4,
						type: "rpc"
					},
					success: (res) => {
						var resJson = res.data[0].result;
						var msg = resJson.msg;
						if (resJson.status != 200) {
							uni.showToast({
								title: msg,
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: msg
							});
							js = setInterval(function() {
								_this.second--;
								if (_this.second == 0) {
									_this.clear()
								}
							}, 1000)
						}
					},
					fail() {
						this.second == 0
					}
				});
			},
			clear() {
				clearInterval(js)
				js = null
				this.second = 0
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #fff;
	}

	.content {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		height: 100%;
	}

	.header {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		color: #333333;
		border-bottom: 0.5px solid #e2e2e2;

		label {
			font-size: 12px;
		}

		.yzm {
			color: green;
			font-size: 24rpx;
			line-height: 64rpx;
			padding-left: 10rpx;
			padding-right: 10rpx;
			width: auto;
			height: 64rpx;
			border-radius: 50rpx;
		}

		.yzms {
			color: #999999;
		}
	}

	.list-call .img {
		width: 40rpx;
		height: 40rpx;
	}

	.list-call .sl-input {
		flex: 1;
		text-align: left;
		font-size: 12px;
		margin-left: 16rpx;
	}

	.button-login {
		color: #FFFFFF;
		font-size: 12px;
		width: 560rpx;
		height: 60rpx;
		background-color: $theme-color;
		border-radius: 50rpx;
		line-height: 60rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 60rpx;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
	}

	.loginTypeSwitch {
		text-align: center;
		font-size: 30rpx;
		margin: 30rpx 0 20rpx;
		color: $theme-color;
	}

	.agreenment {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		// margin-top: 80rpx;
		color: $theme-color;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
		padding: 20px 0;

		navigator {
			margin: 0 10px;
		}
	}
</style>
