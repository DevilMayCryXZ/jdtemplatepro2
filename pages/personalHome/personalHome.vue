<template>
	<view>
		<view class="pwesonal-hewd">
			<view class="set-wrap">
				<FontAwesome class="setBtn" size="40" stackIndex="1" fw type="fas fa-cog" @click="settingFn">
				</FontAwesome>
			</view>
			<view class="user-info">
				<view class="img-box">
					<image :src="src"></image>
				</view>
				<view class="user-name">{{ phone }}</view>
			</view>
			<view class="shortcut-bar">
				<view class="common card-bag" @click="gotoList('mycard')">
					<text>{{ cardnum }}</text>
					<text>卡包</text>
				</view>
				<view class="common news" @click="gotoList('news')">
					<text>{{ newsnum }}</text>
					<text>消息</text>
				</view>
				<view class="common collect" @click="gotoList('collect')">
					<text>{{ collectnum }}</text>
					<text>收藏</text>
				</view>
			</view>
		</view>
		<uni-grid :column="4" class='shortcutMenu button-grid' :showBorder='false' @change="linkOrder($event)">
			<uni-grid-item class='grid-item' v-for="(item, idx) in menuOrder" :key="idx" :index="idx">
				<image :src="item.src" mode=""></image>
				<text>{{ item.title }}</text>
			</uni-grid-item>
		</uni-grid>
		<view class="menu-title">我的消费</view>
		<uni-grid :column="4" class='shortcutMenu button-grid' :showBorder='false' @change="girdClick($event)">
			<uni-grid-item class='grid-item' v-for="(item, idx) in consumeArr" :key="idx" :index="idx">
				<image :src="item.img" mode=""></image>
				<text>{{ item.name }}</text>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	import FontAwesome from '@/components/Am-FontAwesome/index.vue'
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		components: {
			FontAwesome,
			uniGrid: uniGrid,
			uniGridItem: uniGridItem
		},
		data() {
			return {
				src: "/static/personalHome/personalHome/defaultSmallImage.jpg",
				phone: "15656",
				cardnum: 12,
				newsnum: 13,
				collectnum: 14,
				menuOrder: [{
					title: "全部订单",
					src: "/static/personalHome/personalHome/record.png",
					status: 99
				}, {
					title: "待付款",
					src: "/static/personalHome/personalHome/pay.png",
					status: 99
				}, {
					title: "待出行",
					src: "/static/personalHome/personalHome/receive-goods.png",
					status: 99
				}, {
					title: "待评价",
					src: "/static/personalHome/personalHome/evaluate.png",
					status: 99
				}],
				consumeArr: []
			}
		},
		onLoad() {
			this.getAppList();
		},
		methods: {
			getAppList() {
				uni.request({
					url: this.$httpPath + "/cus/getAppList",
					method: "POST",
					data: {},
					success: (res) => {
						let resData = res.data;
						if (resData.code == 200) {
							this.consumeArr = resData.data;
						}
					},
					fail: (err) => {

					}
				})
			},

			settingFn() {
				uni.navigateTo({
					url: "/pages/personalHome/accountSettings/accountSettings"
				})
			},
			gotoList(type) {
				if (type == "mycard") {
					uni.navigateTo({
						url: "/pages/myCard/myCard"
					})
				}
			},
			linkOrder(e) {
				let index = e.detail.index;
				let info = this.menuOrder[index];
				uni.navigateTo({
					url: "/pages/jdmall/order/orderList/orderList?status=" + info.status
				})
			},
			girdClick(e) {
				let index = e.detail.index;
				let info = this.consumeArr[index];
				uni.navigateTo({
					url: info.url
				})
			}
		}
	}
</script>

<style lang="scss">
	.pwesonal-hewd {
		background-color: $theme-color;

		.set-wrap {
			position: relative;
			height: 96rpx;
			display: flex;
			align-items: center;

			.setBtn {
				width: 50rpx;
				height: 50rpx;
				left: unset;
				right: 15px;
				color: #fff;
			}
		}

		.user-info {
			padding: 0 74rpx 28rpx;
			display: flex;
			align-items: center;

			.img-box {
				width: 120rpx;
				height: 120rpx;
				border-radius: 60rpx;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #fff;

				image {
					max-width: unset;
					min-width: unset;
					width: 104rpx;
					height: 104rpx;
				}
			}

			.user-name {
				color: #fff;
				font-size: 34rpx;
				padding-left: 20px;
			}
		}

		.shortcut-bar {
			display: flex;
			background-color: rgba(0, 0, 0, 0.1);
			height: 140rpx;
			color: #fff;

			.common {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
			}
		}
	}

	.menu-title {
		padding-left: 22rpx;
		font-size: 32rpx;
		line-height: 104rpx;
		border-bottom: 1px solid #E5E5E5;
	}

	.shortcutMenu {
		.grid-item {
			background-color: #fff;
			border-right: 1px solid #E5E5E5;
			border-bottom: 1px solid #E5E5E5;
			display: flex;
			justify-content: space-evenly;

			&:nth-child(4n) {
				border-right: none;
			}

			text {
				font-size: 12px;
				text-align: center;
			}

			image {
				margin: 40rpx auto 5px;
				max-width: unset;
				min-width: unset;
				width: 64rpx;
				height: 56rpx;
				align-self: center;
			}
		}
	}
</style>
