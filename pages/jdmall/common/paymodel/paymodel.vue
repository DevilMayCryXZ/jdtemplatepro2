<template>
	<view class="">
		<view class="paymodel">
			<view class="paymodel-time">
				支付剩余时间
				<text>30:50</text>
			</view>
			<view class="paymodel-money">
				￥
				<text>0.01</text>
			</view>
			<view class="paymodel-type-list">
				<view class="paymodel-type-item" v-for="(item, index) in paymodelist" :key="index" @click="paymodelTypeCheck(index)">
					<image class="paymodel-type-item-logo" :src="item.icon" mode=""></image>
					<view class="paymodel-type-item-name">{{item.pay_name}}</view>
					<view class="paymodel-type-item-checkBtn">
						<FontAwesome v-if="isCheckIdx != index" type="far fa-circle" size="40"></FontAwesome>
						<FontAwesome v-else type="far fa-check-circle" size="40"></FontAwesome>
					</view>
				</view>
			</view>
		</view>
		<view class="paymodel-btnBox">
			<view class="paymodel-btn">
				立即付款
			</view>
		</view>
	</view>
</template>

<script>
	import FontAwesome from '@/components/Am-FontAwesome/index.vue'
	export default {
		data() {
			return {
				isCheckIdx: 0,
				paymodelist: [{
						pay_name: "支付宝支付",
						icon: ""
					},
					{
						pay_name: "微信支付",
						icon: ""
					},
					{
						pay_name: "余额支付",
						icon: ""
					}
				]
			}
		},
		components: {
			FontAwesome
		},
		onLoad() {
			// this.getpaymodelist();
		},
		methods: {
			getpaymodelist() {
				uni.request({
					method: "POST",
					url: this.$httpPath_jdmall + "/../user/getpaymodelist",
					data: {},
					success: (res) => {
						debugger
					},
					fail: (res) => {

					}
				})
			},
			paymodelTypeCheck(index){
				this.isCheckIdx = index;
			}
		}
	}
</script>

<style lang="scss">
	.paymodel {
		padding: 50px 10px;
	}

	.paymodel-time {
		text-align: center;
		font-size: 14px;
		color: $uni-text-color-placeholder;

		text {
			margin-left: 3px;
		}
	}

	.paymodel-money {
		text-align: center;
		margin: 20px 0 50px;
		font-size: 24px;
		font-weight: bold;

		text {
			font-size: 50px;
		}
	}

	.paymodel-type-list {
		background-color: $uni-bg-color;
		border-radius: 10px;

		.paymodel-type-item {
			display: flex;
			padding: 0 10px;
			line-height: 50px;
			
			.paymodel-type-item-checkBtn{
				width: 30px;
				text-align: center;
				
				.far {
					color: $uni-text-color-grey;
				}
				
				.fa-check-circle {
					color: $theme-color;
				}
			}
			
			.paymodel-type-item-logo {
				width: 24px;
				height: 24px;
				margin: 13px 12px;
				margin-left: 0;
				background-color: $base-bg-color;
			}
			
			.paymodel-type-item-name {
				flex: 1;
				font-size: 14px;
			
				display: -webkit-box;
				/* autoprefixer: off */
				-webkit-box-orient: vertical;
				/* autoprefixer: on */
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}
	}
	
	.paymodel-btnBox{
		position: fixed;
		bottom: 50px;
		left: 0;
		width: 100%;
		height: 44px;
		line-height: 44px;
		padding: 0 40px;
		box-sizing: border-box;
		
		.paymodel-btn{
			width: 100%;
			background-color: $theme-color;
			border-radius: 10px;
			text-align: center;
			color: $base-bg-color;
		}
	}
</style>
