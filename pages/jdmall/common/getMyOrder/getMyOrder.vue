<template>
	<view class="myorder-box">
		<view class="myorder-item" v-for="(item, orderIndex) in orderList" :key="orderIndex">
			<!-- 默认 -->
			<view v-if="!item.goodstype || !item.orderstyle || item.orderstyle === 'goodsType_default'" class="">
				<view class="myorder-item-shop">
					<image class="myorder-item-shop-logo" :src="item.logo" mode=""></image>
					<view class="myorder-item-shop-name">
						{{item.sellername}}
					</view>
				</view>
				<view class="myorder-item-messBox" @click="orderDetail(item)">
					<view class="myorder-item-mess" v-for="(goods, goodsIndex) in item.goods" :key="goodsIndex">
						<image class="myorder-item-mess-img" :src="goods.picture" mode=""></image>
						<view class="myorder-item-mess-info">
							<view class="myorder-item-mess-info-name">
								{{goods.name}}
							</view>
							<view class="myorder-item-mess-info-name-s">
								{{goods.name}}
							</view>
						</view>
						<view class="myorder-item-mess-price">
							<view class="myorder-item-mess-price-b">
								￥<text>{{goods.price}}</text>
							</view>
							<view class="myorder-item-mess-price-s">
								×<text>{{goods.num}}</text>
							</view>
						</view>
					</view>
				</view>
				<!--  -->
			</view>
			<!-- 商品类 -->
			<view v-else-if="orderstyle === 'goodsType_goods'" class="">
				<view class="myorder-item-shop">
					<image class="myorder-item-shop-logo" :src="item.goodstype_icon" mode=""></image>
					<view class="myorder-item-shop-name" v-for="(goods, goodsIndex) in item.goods" :key="goodsIndex">
						{{goods.name}}
					</view>
				</view>
				<view class="myorder-item-messBox" @click="orderDetail(item)">
					<view class="myorder-item-mess" v-for="(goods, goodsIndex) in item.goods" :key="goodsIndex">
						<image class="myorder-item-mess-img" :src="goods.picture" mode=""></image>
						<view class="myorder-item-mess-info">
							<view v-for="(comments, commentsIndex) in goods.comments" :key="commentsIndex" class="">
								<view v-if="comments.name === 'title'" class="myorder-item-mess-info-name">
									{{comments.value}}
								</view>
								<view v-else-if="comments.name != 'img'" class="myorder-item-mess-info-name-s">
									{{comments.name}}
									<text>{{comments.value}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 商家类 -->
			<view v-else-if="orderstyle === 'goodsType_shop'" class="">
				<view class="myorder-item-shop">
					<image v-if="item.logo" class="myorder-item-shop-logo" :src="item.logo" mode=""></image>
					<image v-if="item.goodstype_icon" class="myorder-item-shop-logo" :src="item.goodstype_icon" mode=""></image>
					<view class="myorder-item-shop-name">
						{{item.sellername}}
					</view>
				</view>
				<view class="myorder-item-messBox" @click="orderDetail(item)">
					<view v-if="details" class="myorder-item-mess">
						<image class="myorder-item-mess-img" :src="item.img" mode=""></image>
						<view class="myorder-item-mess-info">
							<view v-for="(details, detailsIndex) in goods.details" :key="detailsIndex" class="">
								<view v-if="details.name === 'title'" class="myorder-item-mess-info-name">
									{{details.value}}
								</view>
								<view v-else-if="details.name != 'img'" class="myorder-item-mess-info-name-s">
									{{details.name}}
									<text>{{details.value}}</text>
								</view>
							</view>
						</view>
					</view>
					<view v-else-if="item.goods" class="myorder-item-mess" v-for="(goods, goodsIndex) in item.goods" :key="goodsIndex">
						<image class="myorder-item-mess-img" :src="goods.picture" mode=""></image>
						<view class="myorder-item-mess-info">
							<view v-for="(comments, commentsIndex) in goods.comments" :key="commentsIndex" class="">
								<view v-if="comments.name === 'title'" class="myorder-item-mess-info-name">
									{{comments.value}}
								</view>
								<view v-else-if="comments.name != 'img'" class="myorder-item-mess-info-name-s">
									{{comments.name}}
									<text>{{comments.value}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 合计 -->
			<view class="myorder-item-total">
				数量<text>×</text>{{item.totalnum}},<text class="supline"></text>合计<text>￥</text>{{item.totalprice}}
			</view>
			<!-- 操作按钮 -->
			<view class="myorder-item-btnBox">
				<view v-if="item.status == 10">
					<view class="myorder-item-btn myorder-item-btnText">已退款</view>
				</view>
				<view v-if="item.status == 11">
					<view class="myorder-item-btn myorder-item-btnText">退货申请已提交</view>
				</view>
				<view v-if="item.status == 12">
					<view class="myorder-item-btn myorder-item-btnText">卖家同意退货(等待货物回退)</view>
				</view>
				<view v-if="item.status == 20">
					<view class="myorder-item-btn myorder-item-btn-refund" @click="orderRefundApply(item)">申请退款</view>
				</view>
				<view v-if="item.status == 22">
					<view class="myorder-item-btn myorder-item-btn-cancel" @click="orderCancel(item)">取消订单</view>
					<view class="myorder-item-btn myorder-item-btnB myorder-item-btn-pay">立即付款</view>
				</view>
				<view v-if="item.status == 30">
					<view class="myorder-item-btn myorder-item-btn-LookWl">查看物流</view>
					<view class="myorder-item-btn myorder-item-btnB myorder-item-btn-receive" @click="orderAffirmDone(item)">确认收货</view>
				</view>
				<view v-if="item.status == 31">
					<view class="myorder-item-btn myorder-item-btnText">仓库处理中...</view>
				</view>
				<view v-if="item.status == 40">
					<view class="myorder-item-btn myorder-item-btn-openfp" @click="orderInvoice(item)">申请开票</view>
					<view class="myorder-item-btn myorder-item-btnB myorder-item-btn-evaluate">立即评价</view>
				</view>
				<view v-if="item.status == 41">
					<view class="myorder-item-btn myorder-item-btn-del" @click="orderDelete(item, orderIndex)">删除订单</view>
				</view>
				<view v-if="item.status == 50">
					<view class="myorder-item-btn myorder-item-btn-openfp" @click="orderInvoice(item)">申请开票</view>
					<view class="myorder-item-btn myorder-item-btnB myorder-item-btn-evaluateAdd">追加评价</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			orderList: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			// 订单详情
			orderDetail(item) {
				let url = item.orderdetail;
				if (url) {
					uni.navigateTo({
						url: this.$iframeView + url,
					})
				}
			},
			// 立即付款
			orderPayFun() {

			},
			// 申请退款
			orderRefundApply(orderData) {
				uni.showModal({
					title: "提示",
					content: "是否【申请退款】？",
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							})
							uni.request({
								method: "POST",
								url: this.$httpPath_jdmall + "/order/refundApply",
								data: orderData,
								success: (res) => {
									uni.hideLoading();
									if (res.data) {
										orderData.status = 11;
										uni.showToast({
											title: res.data.msg,
											icon: "success",
											mask: true,
											duration: 2000
										});
									}
								},
								fail: (res) => {
									uni.hideLoading();
									uni.showToast({
										title: res.data.msg,
										icon: "success",
										mask: true,
										duration: 2000
									});
								}
							})
						}
					}
				})
			},
			// 取消订单
			orderCancel(orderData) {
				uni.showModal({
					title: "提示",
					content: "是否【取消订单】？",
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							})
							uni.request({
								method: "POST",
								url: this.$httpPath_jdmall + "/order/orderCancel",
								data: orderData,
								success: (res) => {
									uni.hideLoading();
									if (res.data) {
										orderData.status = 41;
										uni.showToast({
											title: res.data.msg,
											icon: "success",
											mask: true,
											duration: 2000
										});
									}
								},
								fail: (res) => {
									uni.hideLoading();
									uni.showToast({
										title: res.data.msg,
										icon: "success",
										mask: true,
										duration: 2000
									});
								}
							})
						}
					}
				})
			},
			// 删除订单
			orderDelete(orderData, orderIndex) {
				uni.showModal({
					title: "提示",
					content: "是否【删除订单】？不可恢复",
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							})
							uni.request({
								method: "POST",
								url: this.$httpPath_jdmall + "/order/orderDelete",
								data: orderData,
								success: (res) => {
									uni.hideLoading();
									if (res.data) {
										this.orderList.splice(orderIndex, 1);
										uni.showToast({
											title: res.data.msg,
											icon: "success",
											mask: true,
											duration: 2000
										});
									}
								},
								fail: (res) => {
									uni.hideLoading();
									uni.showToast({
										title: res.data.msg,
										icon: "success",
										mask: true,
										duration: 2000
									});
								}
							})
						}
					}
				})
			},
			// 确认收货
			orderAffirmDone(orderData) {
				uni.showModal({
					title: "提示",
					content: "请确保已收到商品后，在进行【确认收货】",
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								mask: true
							})
							uni.request({
								method: "POST",
								url: this.$httpPath_jdmall + "/order/affirmDone",
								data: orderData,
								success: (res) => {
									uni.hideLoading();
									if (res.data) {
										orderData.status = 40;
										uni.showToast({
											title: res.data.msg,
											icon: "success",
											mask: true,
											duration: 2000
										});
									}
								},
								fail: (res) => {
									uni.hideLoading();
									uni.showToast({
										title: res.data.msg,
										icon: "success",
										mask: true,
										duration: 2000
									});
								}
							})
						}
					}
				})
			},
			// 申请开票
			orderInvoice(orderData) {
				let invoice = orderData.invoice;
				let invoiceUrl = orderData.invoiceUrl;
				if (!invoice || invoice == 10) {
					if (invoiceUrl) {
						uni.navigateTo({
							url: this.$iframeView + invoiceUrl,
						})
					}
				} else {
					let msg = "该订单已开票";
					if (invoice == 20) {
						msg = "已申请，待开票";
					} else if (invoice == 30) {
						msg = "已开票";
					}
					uni.showToast({
						title: msg,
						icon: "none",
						mask: true,
						duration: 2000
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.myorder-box {
		padding: 10px;
		padding-top: 54px;
		background-color: $base-bg-color;
	}

	.myorder-item {
		padding: 0 10px;
		margin-bottom: 10px;
		background-color: $uni-bg-color;
		border-radius: 10px;
	}

	// 商家信息
	.myorder-item-shop {
		display: flex;

		.myorder-item-shop-logo {
			width: 24px;
			height: 24px;
			margin: 8px 12px;
			margin-left: 0;
			background-color: $base-bg-color;
		}

		.myorder-item-shop-name {
			flex: 1;
			line-height: 40px;
			font-weight: bold;

			display: -webkit-box;
			/* autoprefixer: off */
			-webkit-box-orient: vertical;
			/* autoprefixer: on */
			-webkit-line-clamp: 1;
			overflow: hidden;
		}
	}

	// 商品信息
	.myorder-item-messBox {
		padding-bottom: 10px;

		.myorder-item-mess {
			display: flex;
			padding-top: 10px;

			.myorder-item-mess-img {
				width: 50px;
				height: 50px;
				margin-right: 10px;
				background-color: $base-bg-color;
			}

			.myorder-item-mess-info {
				flex: 1;
				padding-right: 10px;

				.myorder-item-mess-info-name {
					margin-bottom: 5px;

					display: -webkit-box;
					/* autoprefixer: off */
					-webkit-box-orient: vertical;
					/* autoprefixer: on */
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.myorder-item-mess-info-name-s {
					font-size: 12px;
					color: $uni-text-color-placeholder;

					text {
						margin-left: 5px;
					}
				}
			}

			.myorder-item-mess-price {
				min-width: 50px;
				font-size: 12px;
				text-align: right;

				.myorder-item-mess-price-b {

					text {
						margin-left: 1px;
						font-size: 16px;
					}
				}

				.myorder-item-mess-price-s {
					color: $uni-text-color-placeholder;
				}
			}
		}
	}

	// 合计
	.myorder-item-total {
		line-height: 40px;
		font-size: 14px;
		text-align: right;

		text {
			margin-left: 3px;
			font-size: 12px;
		}

		text.supline {
			margin: 0 5px;
		}
	}

	// 操作按钮
	.myorder-item-btnBox {
		text-align: right;

		.myorder-item-btn {
			display: inline-block;
			margin: 10px 0;
			margin-left: 8px;
			padding: 4px 8px;
			border: 1px solid $uni-border-color;
			border-radius: 15px;
			color: $text-color-gray65;
			font-size: 14px;
		}

		.myorder-item-btnText {
			border: 0;
			color: $uni-text-color-placeholder;
		}

		.myorder-item-btnB {
			border-color: $text-color-cz;
			color: $text-color-cz;
		}
	}
</style>
