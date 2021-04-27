<template>
	<view class="goodsList">
		<h3>{{ title }}</h3>
		<view class="item-group">
			<view class="goods-item" v-for="(item, idx) in goodsList" :key="idx" @click="gotoDetail(item)">
				<image :src="item.pic"></image>
				<view class="goods-info">
					<view class="tit">{{ item.name }}</view>
					<view class="prices-typename">
						<text class="prices">￥{{ item.prices }}</text>
						<text class="typename">{{ item.typename }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {  
			title: {
				type: String,
				default: ""
			},
			goodsType: {
				type: String,
				default: ""
			},
			goodsList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			gotoDetail (item) {
				this.$emit("myEve", {item: item, goodsType: this.goodsType});
			}
		}
	}
</script>

<style lang="scss">
	.goodsList {
		padding-top: 10px;
		h3 {
			text-align: center;
			font-size: 34rpx;
			line-height: 80rpx;
			color: #333;
			font-weight: normal;
		}
		.item-group {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			.goods-item {
				flex: 0 0 50%;
				box-sizing: border-box;
				&:nth-child(even) {
					padding: 22rpx 40rpx 22rpx 20rpx;
				}
				&:nth-child(odd) {
					padding: 22rpx 20rpx 22rpx 40rpx;
				}
				image {
					max-width: unset;
					min-width: unset;
					width: 100%;
					height: 216rpx;
					border-radius: 11rpx;
					box-sizing: border-box;
				}
				.goods-info {
					.tit {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						font-size: 32rpx;
						color: #333;
						margin: 12rpx 0;
					}
					.prices-typename {
						display: flex;
						justify-content: space-between;
						.prices {
							font-size: 12px;
							color: #dc2626;
						}
						.typename {
							font-size: 24rpx;
							color: #666;
							padding-left: 36rpx;
							background: url('~@/static/homepage/brands.png') no-repeat left top;
							background-size: 34rpx;
						}
					}
				}
			}
		}
	}
</style>
