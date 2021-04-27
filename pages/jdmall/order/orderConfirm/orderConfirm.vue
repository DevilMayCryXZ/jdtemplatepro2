<template>
	<view>
		<view class="address-box">
			<image class="address-logo" src="/static/location.png" mode=""></image>
			<view class="address-mess">
				<view class="address-mess-name">
					{{addressJson.name}}
					<text>{{addressJson.tel}}</text>
				</view>
				<view class="address-mess-address">
					{{addressJson.address}}
				</view>
			</view>
			<view class="address-btn">
				切换
			</view>
		</view>
		<view class="mycart-footer">
			<view class="mycart-footer-mess">
				合计
				<text>
					￥
					<span>{{cartTotalPrice}}</span>
				</text>
			</view>
			<view class="mycart-footer-submit" @click="orderConfirmSubmit()">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartIds: "",
				cartTotalPrice: 0,
				addressJson: {
					name: "张三",
					tel: "12312341234",
					address: "山西省太原市小店区"
				}
			}
		},
		onLoad(opt) {
			this.cartIds = opt.cartIds;
			this.cartTotalPrice = opt.cartTotalPrice;
			this.cartAffirmOrder();
		},
		methods: {
			//获取订单数据
			cartAffirmOrder() {
				uni.request({
					method: "POST",
					url: this.$httpPath_jdmall + "/order/cartAffirmOrder",
					data: {
						cartIds: this.cartIds
					},
					success: (res) => {}
				})
			},
			//提交订单
			orderConfirmSubmit(){
				
			}
		}
	}
</script>

<style lang="scss">
	.address-box {
		display: flex;
		padding: 10px;
		margin-bottom: 30px;
		background-color: $uni-bg-color;

		.address-logo {
			width: 24px;
			height: 24px;
			margin: 12px 0;
		}

		.address-mess {
			flex: 1;
			padding: 0 10px;

			.address-mess-name {
				font-size: 18px;
				font-weight: 500;

				text {
					margin-left: 10px;
					font-size: 14px;
					font-weight: normal;
					color: $uni-text-color-grey;
				}
			}

			.address-mess-address {
				margin-top: 5px;
				font-size: 14px;
			}
		}

		.address-btn {
			position: relative;
			width: 50px;
			line-height: 24px;
			margin: 12px 0;
			text-align: center;
			border-left: 1px solid $uni-text-color-grey;
			font-size: 14px;
			color: $uni-text-color-grey;
		}
	}

	// 底部栏
	.mycart-footer {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 44px;
		background: $uni-bg-color;

		.mycart-footer-mess {
			flex: 1;
			line-height: 44px;
			padding: 0 10px;

			font-size: 14px;

			text {
				margin-left: 5px;
				font-size: 12px;
				color: $text-color-cz;

				span {
					font-size: 18px;
				}
			}
		}

		.mycart-footer-submit {
			width: 100px;
			line-height: 44px;
			text-align: center;

			background: -webkit-linear-gradient(left, #ffc900, #ff9902);
			background: -o-linear-gradient(right, #ffc900, #ff9902);
			background: -moz-linear-gradient(right, #ffc900, #ff9902);
			background: linear-gradient(to right, #ffc900, #ff9902);
			color: #fff;
		}
	}
</style>
