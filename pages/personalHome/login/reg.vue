<template>
	<view class="content">
		<view class="header">
			<image src="/static/personalHome/login/logo.png"></image>
		</view>

		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/personalHome/login/1.png"></image>
				<input class="sl-input" v-model="name" type="text" maxlength="16" placeholder="请输入登录代码 4-16个字符" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/personalHome/login/2.png"></image>
				<input class="sl-input" v-model="password" type="text" maxlength="32" placeholder="请输入登录密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/personalHome/login/op.png':'/static/personalHome/login/cl.png'" @tap="display"></image>
			</view>
			<view class="list-call">
				<image class="img" src="/static/personalHome/login/2.png"></image>
				<input class="sl-input" v-model="password2" type="text" maxlength="32" placeholder="请再次输入登录密码" :password="!showPassword2" />
				<image class="img" :src="showPassword2?'/static/personalHome/login/op.png':'/static/personalHome/login/cl.png'" @tap="display2"></image>
			</view>
			<view class="list-call">
				<image class="img" src="/static/personalHome/login/1.png"></image>
				<input class="sl-input" v-model="phone" type="number" maxlength="11" placeholder="手机号" />
			</view>

			<view class="list-call">
				<image class="img" src="/static/shilu-login/3.png"></image>
				<input class="sl-input" v-model="code" type="number" maxlength="6" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>

		</view>

		<view class="button-login" hover-class="button-hover" @tap="bindLogin">
			<text>立即注册</text>
		</view>
		<view class="toLogin">已有账号,<text @click="toLogin">立即登录</text>
		</view>
		<view class="agreement" v-if="!agreement">
			<image @tap="agreementSuccess" :src="agreement==true?'/static/personalHome/login/ty1.png':'/static/personalHome/login/ty0.png'"></image>
			<text @tap="agreementSuccess"> 同意</text>
			<navigator url="agreement?id=1" open-type="navigate">《软件用户协议》</navigator>
		</view>
	</view>
</template>

<script>
	var _this, js;
	export default {
		onLoad() {
			_this = this;

		},
		onUnload() {
			clearInterval(js)
			this.second = 0;
		},
		data() {
			return {
				agreement: true,
				name: '',
				phone: '',
				password: '',
				password2: '',
				code: '',
				showPassword: false,
				showPassword2: false,
				second: 0
			};
		},
		computed: {
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
			toLogin() {
				uni.navigateTo({
					url: "/pages/personalHome/login/login"
				})
			},
			clear() {
				clearInterval(js)
				js = null
				this.second = 0
			},
			display() {
				this.showPassword = !this.showPassword
			},
			display2() {
				this.showPassword2 = !this.showPassword2
			},
			agreementSuccess() {
				this.agreement = !this.agreement;
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
			bindLogin() {
				// if (this.agreement == false) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请先阅读《软件用户协议》'
				// 	});
				// 	return;
				// }
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码不正确'
					});
					return;
				}
				if (this.password != this.password2) {
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致'
					});
					return;
				}
				if (this.code.length != 6) {
					uni.showToast({
						icon: 'none',
						title: '验证码不正确'
					});
					return;
				}
				uni.request({
					url: this.$httpPathExt, //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {
						action: "sys.UserController",
						data: [{
							mobile: this.phone,
							verifyCode: this.code
						}],
						method: "checkSendSms",
						tid: 10,
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
							this.sendReg();
						}
					}
				})
			},
			sendReg() {
				uni.request({
					url: this.$httpPathExt, //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {
						action: "sys.UserController",
						data: [{
							name: this.name,
							mobile: this.phone,
							password: this.password
						}],
						method: "registerUser",
						tid: 11,
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
							setTimeout(function(){
								uni.navigateTo({
									url: "/pages/personalHome/login/login"
								})
							}, 2000)
						} else {
							uni.showToast({
								title: msg
							});
							setTimeout(function() {
								uni.navigateBack();
							}, 1500)
						}
					}
				});
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

		.img {
			width: 40rpx;
			height: 40rpx;
		}

		.sl-input {
			flex: 1;
			text-align: left;
			font-size: 12px;
			margin-left: 16rpx;
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

	.button-login {
		color: #FFFFFF;
		font-size: 12px;
		width: 674rpx;
		height: 92rpx;
		line-height: 92rpx;
		background-color: $theme-color;
		border-radius: 50rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 30rpx;
	}

	.toLogin {
		font-size: 12rpx;
		text-align: center;
		margin-top: 40rpx;

		text {
			color: $theme-color;
		}
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
	}

	.agreement {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		margin-top: 80rpx;
		color: #FFA800;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.agreement image {
		width: 40rpx;
		height: 40rpx;
	}
</style>
