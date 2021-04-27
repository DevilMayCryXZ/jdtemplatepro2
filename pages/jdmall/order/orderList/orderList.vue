<template>
	<view>
		<getOrderToolbars :tabList="tabList" v-if="flag" @myEve="getMyOrder"></getOrderToolbars>
		<getMyOrder :orderList="orderList" v-if="flagOrder"></getMyOrder>
		<view class="isOver" v-show="flagDataAll">--- 我是有底线的 ---</view>
		<view class="isOver" v-show="flagDataNull">--- 未查询到相关数据 ---</view>
		<toTop></toTop>
	</view>
</template>

<script>
	import getOrderToolbars from "@/pages/jdmall/common/getOrderToolbars/getOrderToolbars.vue";
	import getMyOrder from "@/pages/jdmall/common/getMyOrder/getMyOrder.vue";
	import toTop from "@/pages/common/toTop.vue";
	export default {
		data() {
			return {
				flag: false,
				tabList: [],
				flagOrder: false,
				orderList: [],
				orderJson: {
					pageIndex: 1,
					pageSize: 10,
					total: 0,
					status: 99
				},
				flagDataAll: false,
				flagDataNull: false
			}
		},
		components: {
			getOrderToolbars,
			getMyOrder,
			toTop
		},
		mounted() {
			this.getOrderToolbars();
		},
		onLoad(options) {
			if (options.status) {
				this.orderJson.status = options.status
			}
		},
		methods: {
			/**
			 * 获取顶部状态栏
			 */
			async getOrderToolbars() {
				if (!this.isTabList) {
					const result = await this.$jdGlo.myRequest({
						url: this.$httpPath_jdmall + "/order/getOrderToolbars",
						method: "POST"
					}, (res, options) =>{
						if (res.statusCode == 200) {
							var resultData = res.data;
							if (resultData.length > 0) {
								this.flag = true;
								this.tabList = resultData;
								this.getMyOrder();
							}
						}
					})
				}
			},
			/**
			 * 获取订单列表
			 * @param {Object} opt
			 */
			getMyOrder(opt, callback) {
				let status = opt ? opt.code : "";
				if (status && status != this.orderJson.status) {
					this.orderJson.status = status;
					this.orderList = [];
				}
				uni.request({
					url: this.$httpPath_jdmall + "/order/myorder",
					method: "POST",
					data: this.orderJson,
					success: (res) => {
						if (res.data.status == 200) {
							this.flagOrder = true;
							this.orderJson.total = res.total;
							this.orderList = [...this.orderList, ...res.data.data];
							if (this.orderList.length <= this.orderJson.total) {
								this.flagDataAll = true;
								this.flagDataNull = false;
							}
						} else if (res.data.status == 404) {
							this.flagDataAll = false;
							this.flagDataNull = true;
						}
						callback && callback();
					}
				})
			}

		},
		onReachBottom() {
			if (this.orderList.length <= this.orderJson.total) {
				return false;
			}
			console.log("触底");
			this.orderJson.pageIndex++;
			this.getMyOrder();
		},
		onPullDownRefresh() {
			console.log("下拉刷新");
			this.pageIndex = 1;
			this.orderList = [];
			this.flagDataAll = false;
			this.flagDataNull = false;
			setTimeout(() => {
				this.getMyOrder("", () => {
					uni.stopPullDownRefresh();
				});
			}, 1000);
		}
	}
</script>

<style scoped lang="scss"></style>
