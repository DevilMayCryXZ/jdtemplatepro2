<template>
	<view>
		<view class="mycart-box">
			<view class="mycart-item" v-for="(item, index) in mycartList" :key="index">
				<view class="mycart-item-seller">
					<view class="mycart-item-checkBtn mycart-item-seller-checkBtn" @click="cartIsCheckShop(item)">
						<FontAwesome v-if="checkShopArr.indexOf(item.sellerid) == -1" type="far fa-circle" size="40"></FontAwesome>
						<FontAwesome v-else type="far fa-check-circle" size="40"></FontAwesome>
					</view>
					<image class="mycart-item-seller-logo" :src="item.sellerUrl" mode=""></image>
					<view class="mycart-item-seller-name">
						{{item.sellerName}}
					</view>
				</view>
				<view class="mycart-item-messBox">
					<view class="mycart-item-mess" v-for="(cart, cartIndex) in item.cart" :key="cartIndex">
						<view class="mycart-item-checkBtn mycart-item-mess-checkBtn" @click="cartIsCheckCart(cart, item)">
							<FontAwesome v-if="checkCartArr.indexOf(cart.id) == -1" type="far fa-circle" size="40"></FontAwesome>
							<FontAwesome v-else type="far fa-check-circle" size="40"></FontAwesome>
						</view>
						<image class="mycart-item-mess-img" :src="cart.img" mode=""></image>
						<view class="mycart-item-mess-info">
							<view class="mycart-item-mess-info-name">
								{{cart.name}}
							</view>
							<view class="mycart-item-mess-info-name-s">
								{{cart.goodsattr}}
							</view>
							<view class="mycart-item-mess-info-priceNum">
								<view class="mycart-item-mess-info-price">
									￥<text>{{cart.unitPrice}}</text>
								</view>
								<view class="mycart-item-mess-info-num">
									<view class="mycart-item-mess-info-num-btn mycart-item-mess-info-num-btnMin" @click="cartcount('min', cart)">-</view>
									<input class="mycart-item-mess-info-num-inp" type="number" min="1" max="99" maxlength="2" :value="cart.count"
									 disabled />
									<view class="mycart-item-mess-info-num-btn mycart-item-mess-info-num-btnMax" @click="cartcount('max', cart)">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="isOver" v-show="flagDataAll">--- 我是有底线的 ---</view>
			<view class="isOver" v-show="flagDataNull">--- 未查询到相关数据 ---</view>
			<toTop></toTop>
		</view>
		<view class="mycart-footer">
			<view class="mycart-item-checkBtn mycart-footer-checkBtn" @click="cartIsCheckAll()">
				<FontAwesome v-if="!checkAllFlag" type="far fa-circle" size="40"></FontAwesome>
				<FontAwesome v-else type="far fa-check-circle" size="40"></FontAwesome>
				全选
			</view>
			<view class="mycart-footer-mess">
				合计
				<text>
					￥
					<span>{{cartTotalPrice}}</span>
				</text>
			</view>
			<view class="mycart-footer-submit" @click="mycartSubmit()">
				结算
			</view>
		</view>
	</view>
</template>

<script>
	import toTop from "@/pages/common/toTop.vue";
	import FontAwesome from '@/components/Am-FontAwesome/index.vue'
	export default {
		data() {
			return {
				checkAllFlag: false, //底部全选
				checkShopArr: [], //商家选中
				checkCartArr: [], //商品选中
				mycartList: [],
				mycartJson: {
					pageIndex: 1,
					pageSize: 10,
					total: 0
				},
				cartTotalNum: 0,
				cartTotalPrice: 0,
				flagDataAll: false,
				flagDataNull: false
			}
		},
		components: {
			toTop,
			FontAwesome
		},
		onLoad() {
			this.getMyCart();
		},
		methods: {
			/**
			 * 获取购物车列表
			 * @param {Object} opt
			 */
			getMyCart(opt, callback) {
				uni.request({
					method: "POST",
					url: this.$httpPath_jdmall + "/cart/mycart",
					data: this.mycartJson,
					success: (res) => {
						if (res.statusCode == 200) {
							// this.mycartJson.total = res.total;
							this.mycartList = [...this.mycartList, ...res.data];
							// if (this.mycartList.length <= this.mycartJson.total) {
							// 	this.flagDataAll = true;
							// 	this.flagDataNull = false;
							// }
						} else if (res.statusCode == 404) {
							this.flagDataAll = false;
							this.flagDataNull = true;
						}
						callback && callback();
					}
				})
			},
			/**
			 * 计算商品数量
			 * @param {Object} type 加/减
			 * @param {Object} cart
			 */
			cartcount(type, cart, e) {
				const num = cart.count;
				if (type == "min") {
					--cart.count <= 0 ? cart.count = 1 : cart.count
				} else if (type == "max") {
					// 缺商品总数量 -- 允许购买的最大数量
					++cart.count >= 99 ? cart.count = 99 : cart.count
				} else if (type == "blur") {
					let countVal = e.detail.value;
					if (countVal) {
						countVal <= 0 ? cart.count = 1 : cart.count = countVal
						countVal >= 99 ? cart.count = 99 : cart.count = countVal
					} else {
						e.detail.value = num;
					}
				}
				uni.request({
					method: "POST",
					url: this.$httpPath_jdmall + "/../common/update_goods_cartcount",
					data: {
						num: cart.count,
						"cartId": cart.id
					},
					header: {
						'Content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						let resData = res.data;
						if (!resData.success) {
							cart.count = num;
						}
						this.setTotalNumPrice();
					},
					fail: () => {
						cart.count = num;
					}
				})
			},
			/**
			 * 底部全选
			 */
			cartIsCheckAll() {
				if (this.checkAllFlag) {
					this.checkAllFlag = false;
					this.checkShopArr = [];
					this.checkCartArr = [];
				} else {
					this.checkAllFlag = true;
					for (let i = 0; i < this.mycartList.length; i++) {
						let sellerData = this.mycartList[i];
						let isCheckShopIdx = this.checkShopArr.indexOf(sellerData.sellerid);
						if (isCheckShopIdx == -1) {
							this.checkShopArr.push(sellerData.sellerid);
						}
						for (let j = 0; j < sellerData.cart.length; j++) {
							let cartData = sellerData.cart[j];
							let isCheckCartIdx = this.checkCartArr.indexOf(cartData.id);
							if (isCheckCartIdx == -1) {
								this.checkCartArr.push(cartData.id);
							}
						}
					}
				}

				this.setTotalNumPrice();
				console.log("this.checkShopArr===" + this.checkShopArr);
				console.log("this.checkCartArr===" + this.checkCartArr);
			},
			/**
			 * 商家选择
			 * @param {Object} shop
			 */
			cartIsCheckShop(shop) {
				let isCheckShopIdx = this.checkShopArr.indexOf(shop.sellerid);
				let isCheckShop = isCheckShopIdx == -1 ? false : true;
				if (isCheckShop) {
					this.checkShopArr.splice(isCheckShopIdx, 1);
					for (let j = 0; j < shop.cart.length; j++) {
						let cartData = shop.cart[j];
						let isCheckCartIdx = this.checkCartArr.indexOf(cartData.id);
						this.checkCartArr.splice(isCheckCartIdx, 1);
					}
				} else {
					this.checkShopArr.push(shop.sellerid);
					for (let j = 0; j < shop.cart.length; j++) {
						let cartData = shop.cart[j];
						let isCheckCartIdx = this.checkCartArr.indexOf(cartData.id);
						if (isCheckCartIdx == -1) {
							this.checkCartArr.push(cartData.id);
						}
					}
				}
				/** 底部全选是否选中 */
				if (this.checkShopArr.length == this.mycartList.length) {
					this.checkAllFlag = true;
				} else {
					this.checkAllFlag = false;
				}

				this.setTotalNumPrice();
				console.log("this.checkShopArr===" + this.checkShopArr);
				console.log("this.checkCartArr===" + this.checkCartArr);
			},
			/**
			 * 商品选择
			 * @param {Object} cart
			 * @param {Object} shop
			 */
			cartIsCheckCart(cart, shop) {
				let isCheckShopIdx = this.checkShopArr.indexOf(shop.sellerid);
				let isCheckCartIdx = this.checkCartArr.indexOf(cart.id);
				let isCheckCart = isCheckCartIdx == -1 ? false : true;
				if (isCheckCart) {
					this.checkCartArr.splice(isCheckCartIdx, 1);
					if (isCheckShopIdx != -1) {
						this.checkShopArr.splice(isCheckShopIdx, 1);
					}
				} else {
					this.checkCartArr.push(cart.id);
					let isCheckShopFlag = true;
					for (let j = 0; j < shop.cart.length; j++) {
						let cartData = shop.cart[j];
						let isCheckCartIdxFor = this.checkCartArr.indexOf(cartData.id);
						if (isCheckCartIdxFor == -1) {
							isCheckShopFlag = false;
						}
					}
					if (isCheckShopFlag) { //子级全部选中，父级选中
						this.checkShopArr.push(shop.sellerid);
					} else {
						if (isCheckShopIdx != -1) {
							this.checkShopArr.splice(isCheckShopIdx, 1);
						}
					}
				}

				this.setTotalNumPrice();
				console.log("this.checkShopArr===" + this.checkShopArr);
				console.log("this.checkCartArr===" + this.checkCartArr);
			},
			/**
			 * 计算总数及价格
			 */
			setTotalNumPrice() {
				if (this.checkCartArr.length > 0) {
					let totalNum = 0;
					let totalPrice = 0;
					for (let i = 0; i < this.checkCartArr.length; i++) {
						let cartid = this.checkCartArr[i];
						for (let j = 0; j < this.mycartList.length; j++) {
							var cartData = this.mycartList[j].cart;
							for (let q = 0; q < cartData.length; q++) {
								if (cartData[q].id == cartid) {
									let cartTotalPrice = cartData[q].count * cartData[q].unitPrice;
									totalPrice += cartTotalPrice;
									totalNum += cartData[q].count;
								}
							}
						}
					}
					this.cartTotalNum = totalNum;
					this.cartTotalPrice = totalPrice;
				}
			},
			/**
			 * 去结算
			 */
			mycartSubmit() {
				if (this.checkCartArr.length <= 0) {
					uni.showToast({
						title: "请选择商品",
						icon: "none",
						mask: true,
						duration: 2000
					})
				} else {
					let paramsStr = "?cartIds=" + this.checkCartArr.toString();
					paramsStr += "&&cartTotalPrice=" + this.cartTotalPrice;
					uni.navigateTo({
						url: "/pages/jdmall/order/orderConfirm/orderConfirm" + paramsStr
					})
				}
			}
		},
		onReachBottom() {
			// if (this.mycartList.length <= this.mycartJson.total) {
			// 	return false;
			// }
			return;
			console.log("触底");
			this.mycartJson.pageIndex++;
			this.getMyCart();
		},
		onPullDownRefresh() {
			console.log("下拉刷新");
			this.pageIndex = 1;
			this.mycartList = [];
			this.flagDataAll = false;
			this.flagDataNull = false;
			setTimeout(() => {
				this.getMyCart("", () => {
					uni.stopPullDownRefresh();
				});
			}, 1000);
		}
	}
</script>

<style lang="scss">
	.totop {
		bottom: 100px;
	}

	.mycart-box {
		padding: 10px;
		padding-bottom: 84px;
	}

	.mycart-item {
		padding: 0 10px;
		margin-bottom: 10px;
		background-color: $uni-bg-color;
		border-radius: 10px;
	}

	.mycart-item-checkBtn {
		width: 30px;

		.far {
			line-height: 40px;
			color: $uni-text-color-grey;
		}

		.fa-check-circle {
			color: $text-color-cz;
		}
	}

	.mycart-item-mess-checkBtn {

		.far {
			line-height: 90px;
		}
	}

	// 商家信息
	.mycart-item-seller {
		display: flex;

		.mycart-item-seller-logo {
			width: 24px;
			height: 24px;
			margin: 8px 12px;
			margin-left: 0;
			background-color: $base-bg-color;
		}

		.mycart-item-seller-name {
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
	.mycart-item-messBox {
		padding-bottom: 10px;

		.mycart-item-mess {
			display: flex;
			padding-top: 10px;

			.mycart-item-mess-img {
				width: 90px;
				height: 90px;
				margin-right: 10px;
				background-color: $base-bg-color;
			}

			.mycart-item-mess-info {
				flex: 1;
				padding-right: 10px;

				.mycart-item-mess-info-name {
					display: -webkit-box;
					/* autoprefixer: off */
					-webkit-box-orient: vertical;
					/* autoprefixer: on */
					-webkit-line-clamp: 1;
					overflow: hidden;
				}

				.mycart-item-mess-info-name-s {
					margin: 10px 0;
					padding: 3px 5px;
					font-size: 12px;
					color: $uni-text-color-placeholder;
					background-color: $uni-bg-color-grey;

					text {
						margin-left: 5px;
					}
				}

				.mycart-item-mess-info-priceNum {
					display: flex;

					.mycart-item-mess-info-price {
						flex: 1;
						font-size: 12px;
						font-weight: bold;
						color: $text-color-cz;

						text {
							font-size: 18px;
						}
					}

					.mycart-item-mess-info-num {
						display: flex;
						width: 100px;
						border: 1px solid $uni-border-color;
						border-radius: 5px;

						.mycart-item-mess-info-num-btn {
							flex: 1;
							color: $uni-text-color-grey;
							text-align: center;
						}

						.mycart-item-mess-info-num-inp {
							flex: 2;
							border-left: 1px solid $uni-border-color;
							border-right: 1px solid $uni-border-color;
							color: $uni-text-color-grey;
							text-align: center;
						}
					}
				}
			}
		}
	}

	// 底部栏
	.mycart-footer {
		display: flex;
		position: fixed;
		bottom: 50px;
		left: 0;
		width: 100%;
		height: 44px;
		background: $uni-bg-color;

		.mycart-footer-checkBtn {
			width: 70px;
			margin-left: 20px;

			.far {
				line-height: 44px;
				margin-right: 5px;
			}
		}

		.mycart-footer-mess {
			flex: 1;
			line-height: 44px;
			padding: 0 10px;
			text-align: right;

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
