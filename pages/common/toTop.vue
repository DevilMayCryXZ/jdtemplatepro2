<template>
	<view class="totop">
		<view class="btnTop" v-if="btnFlag" @click="backTop()">
			<img src="/static/top.png" alt="" />
		</view>
	</view>
</template>

<script>
	export default {
		name: "totop",
		data() {
			return {
				btnFlag: false
			};
		},

		// 利用VUE写一个在控制台打印当前的scrollTop。首先，在 mounted 钩子中给window添加一个滚动滚动监听事件
		mounted() {
			window.addEventListener("scroll", this.scrollToTop);
		},
		destroyed() {
			window.removeEventListener("scroll", this.scrollToTop);
		},

		methods: {
			// 点击图片回到顶部方法，加计时器是为了过渡顺滑
			backTop() {
				let that = this;
				let timer = setInterval(() => {
					let ispeed = Math.floor(-that.scrollTop / 5);
					document.documentElement.scrollTop = document.body.scrollTop =
						that.scrollTop + ispeed;
					if (that.scrollTop === 0) {
						clearInterval(timer);
					}
				}, 16);
			},

			// 监听回到顶部按钮距浏览器顶部的距离，滚动的距离如果大于浏览器高度时，设置 btnFlag 为true,否则就是false
			scrollToTop() {
				let that = this;
				let scrollTop =
					window.pageYOffset ||
					document.documentElement.scrollTop ||
					document.body.scrollTop;
				that.scrollTop = scrollTop;
				//为了计算距离顶部的高度，当高度大于50显示回顶部图标，小于50则隐藏
				if (that.scrollTop > 100) {
					that.btnFlag = true;
				} else {
					that.btnFlag = false;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.totop {
		position: fixed;
		right: 40rpx;
		bottom: 120rpx;
		width: 80rpx;
		height: 80rpx;
		cursor: pointer;
		z-index: 10;
		img {
			display: block;
			width: 100%;
			height: 100%;
			// border: 1px solid #ccc;
			// border-radius: 40rpx;
		}
	}
</style>
