<template>
	<view>
		<view class="consume-item" v-for="(item, idx) in setArrShow" :key="idx" @click="settingFn(item.url)">
			{{ item.title }}
			<view class="icon-box">
				<FontAwesome class="setBtn" size="20" stackIndex="1" fw type="fas fa-angle-right"></FontAwesome>
			</view>
		</view>
		<view class="btn-wrap">
			<view @click="switchFn">切换账户</view>
			<view @click="exitFn">退出系统</view>
		</view>
	</view>
</template>

<script>
	import FontAwesome from '@/components/Am-FontAwesome/index.vue'
	export default {
		components: {
			FontAwesome
		},
		data() {
			return {
				setArr: [
					{
						title: "个人资料",
						code: "datum",
						url: "/pages/personalHome/accountSettings/personalData/personalData",
						show: false
					},
					{
						title: "账户安全",
						code: "safe",
						show: false
					},
					{
						title: "工作主页",
						code: "work",
						show: false
					},
					{
						title: "我的联系人",
						code: "contactPerson",
						url: "/pages/personalHome/contactPerson/contactPerson",
						show: true
					},
					{
						title: "意见反馈",
						code: "feedback",
						show: false
					},
					{
						title: "隐私政策",
						code: "privacy",
						show: false
					},
					{
						title: "关于我们",
						code: "us",
						show: false
					}
				]
			}
		},
		computed: {
			setArrShow () {
				return this.setArr.filter( item => {
					return item.show;
				})
			}
		},
		methods: {
			switchFn () {
				this.$store.dispatch("loginout")
				this.$router.push({
					path: "/pages/personalHome/login/login"
				})
				// this.loginout()
			},
			exitFn () {
				this.$store.dispatch("loginout")
				this.$router.push({
					path: "/pages/personalHome/login/login"
				})
			},
			settingFn (url){
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F5F5F5;
		.consume-item {
			display: flex;
			justify-content: space-between;
			line-height: 90rpx;
			background-color: #fff;
			border-bottom: 1px solid #eaeaea;
			padding: 0 22rpx;
			font-size: 12px;
			&:nth-child(4) {
				margin-top: 20px;
				border-top: 1px solid #eaeaea;
			}
			.icon-box {
				position: relative;
				flex: 1;
				display: flex;
				.setBtn {
					width: 40rpx;
					height: 40rpx;
					right: 0;
					left: unset;
					color: #666;
				}
			}
		}
		.btn-wrap {
			position: fixed;
			bottom: 0;
			width: 100%;
			line-height: 90rpx;
			display: flex;
			justify-content: center;
			border-top: 1px solid #eaeaea;
			background-color: #fff;
			view {
				flex: 1;
				text-align: center;
				&:first-child {
					border-right: 1px solid #eaeaea;
				}
			}
		}
	}
</style>

