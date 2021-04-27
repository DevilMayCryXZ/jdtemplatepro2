<template>
	<view class="content">
		<view class="header">
			<image src="/static/personalHome/login/logo.png"></image>
		</view>
		<view class="list" v-if="step == 1">
			<view class="tishi">若您忘记了密码，可在此重新设置新密码。</view>
			<view class="list-call">
				<image class="img" src="/static/personalHome/login/1.png"></image>
				<input class="sl-input" type="number" v-model="phone" maxlength="11" placeholder="请输入手机号" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/personalHome/login/3.png"></image>
				<input class="sl-input" type="number" v-model="code" maxlength="4" placeholder="验证码" />
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
		</view>
		<view class="list" v-if="step != 1">
			<view class="list-call">
				<image class="img" src="/static/personalHome/login/2.png"></image>
				<input class="sl-input" type="text" v-model="password" maxlength="32" placeholder="请输入新密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/personalHome/login/op.png':'/static/personalHome/login/cl.png'" @tap="display"></image>
			</view>
		</view>
		<view class="button-login" hover-class="button-hover" @tap="bindLogin()">
			<text>下一步</text>
		</view>

	</view>
</template>

<script>
	var _this, js;
	export default {
		data() {
			return {
				step: 1,
				phone: '',
				second: 0,
				code: "",
				password: ''
			}
		},
		onLoad() {
			_this = this;
		},
		computed: {
			yanzhengma() {
				if (this.second == 0) {
					return '获取验证码';
				} else {
					if (this.second < 10) {
						return '重新获取0' + this.second;
					} else {
						return '重新获取' + this.second;
					}
				}
			}
		},
		onUnload() {
			this.clear()
		},
		methods: {
			display() {
				this.showPassword = !this.showPassword
			},
			clear() {
				clearInterval(js)
				js = null
				this.second = 0
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
				_this.second = 60;
				js = setInterval(function() {
					_this.second--;
					if (_this.second == 0) {
						_this.clear()
					}
				}, 1000)
				uni.request({
					url: 'http://***/getcode.html', //仅为示例，并非真实接口地址。
					data: {
						phone: this.phone,
						type: 'forget'
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						if (res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							_this.second = 0;
						} else {
							uni.showToast({
								title: res.data.msg
							});
							_this.second = 60;
							js = setInterval(function() {
								_this.second--;
								if (_this.second == 0) {
									_this.clear()
								}
							}, 1000)
						}
					},
					fail() {
						this.clear()
					}
				});
			},
			bindLogin() {
				if (this.phone.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return;
				}
				if (this.code.length != 4) {
					uni.showToast({
						icon: 'none',
						title: '验证码不正确'
					});
					return;
				}
				uni.request({
					url: 'http://***/forget.html',
					data: {
						phone: this.phone,
						password: this.password,
						code: this.code
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						if (res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: res.data.msg
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

	.tishi {
		color: #999999;
		font-size: 28rpx;
		line-height: 50rpx;
		margin-bottom: 50rpx;
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
		width: 400rpx;
		height: 80rpx;
		background-color: #3bbaaa;
		border-radius: 50rpx;
		line-height: 80rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 80rpx;
		border-radius: 30rpx;
		font-size: 12px;
	}

	.button-hover {
		background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
	}

	.yzm {
		color: #FF7D13;
		font-size: 24rpx;
		line-height: 64rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: auto;
		height: 64rpx;
		border-radius: 50rpx;
	}

	.yzms {
		color: #999999 !important;
		border: 1rpx solid #999999;
	}
</style>
