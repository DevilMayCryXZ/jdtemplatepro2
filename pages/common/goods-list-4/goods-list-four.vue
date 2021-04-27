<template>
	<view class="list-group" style="background-color: #fff;">
		<goods-list title="景区推荐" :goodsList="goodsScenic" goodsType="scenic" @myEve="gotoDetail"></goods-list>
		<goods-list title="美食推荐" :goodsList="goodsFood" goodsType="food" @myEve="gotoDetail"></goods-list>
		<goods-list title="酒店推荐" :goodsList="goodsHotel" goodsType="hotel" @myEve="gotoDetail"></goods-list>
	</view>
</template>

<script>
	import goodsList from './list-item.vue'
	export default {
		components: {
			"goods-list": goodsList
		},
		data() {
			return {
				goodsScenic: [],
				goodsFood: [],
				goodsHotel: []
			}
		},
		methods: {
			gotoDetail (opt) {
				var goodsType = opt.goodsType;
				var item = opt.item;
				if (goodsType == "scenic"){
					uni.navigateTo({
						// url: "../../scenicarea/scenicAreaDetail/scenicAreaDetail?goodsid=" + item.id
						url: "/pages/scenicarea/scenicAreaDetail/scenicAreaDetail?goodsid=" + item.id
					})
				}else if (goodsType == "food"){
					// uni.navigateTo({
					// 	url: "goodid?" + id
					// })
				}else if (goodsType == "hotel"){
					uni.navigateTo({
						// url: "../../hotelList/hoteldetails/hoteldetails?orgId=" + item.id
						url: "/pages/hotelList/hoteldetails/hoteldetails?orgId=" + item.id
					})
				}
			},
			getGoodsScenic () {
				uni.request({
					url: this.$httpPath + "/restapi/recommend/scenicRecommend",
					method: "post",
					data: {
						"pageSize": 4
					},
					success: (res) => {
						if (res.data.status !== 200) {
							return uni.showToast({
								icon: "none",
								title: res.data.message
							})
						}
						
						for (let i = 0; i < res.data.data.length; i++) {
							res.data.data[i].pic = this.$httpPath + res.data.data[i].pic;
						}
						this.goodsScenic = res.data.data;
					},
					fail: (err) => {
						uni.showToast({
							icon: "none",
							title: "请返回后重试"
						})
					}
				})
			},
			getGoodsFood () {
				uni.request({
					url: this.$httpPath + "/restapi/recommend/restaurantRecommend",
					method: "post",
					data: {
						"pageSize": 4
					},
					success: (res) => {
						if (res.data.status !== 200) {
							return uni.showToast({
								icon: "none",
								title: res.data.message
							})
						}
						for (let i = 0; i < res.data.data.length; i++) {
							res.data.data[i].pic = this.$httpPath + res.data.data[i].pic;
						}
						this.goodsFood = res.data.data;
					},
					fail: (err) => {
						uni.showToast({
							icon: "none",
							title: "请返回后重试"
						})
					}
				})
			},
			getGoodsHotel () {
				uni.request({
					url: this.$httpPath + "/restapi/recommend/hotelRecommend",
					method: "post",
					data: {
						"pageSize": 4
					},
					success: (res) => {
						if (res.data.status !== 200) {
							return uni.showToast({
								icon: "none",
								title: res.data.message
							})
						}
						for (let i = 0; i < res.data.data.length; i++) {
							res.data.data[i].pic = this.$httpPath + res.data.data[i].pic;
						}
						this.goodsHotel = res.data.data;
					},
					fail: (err) => {
						uni.showToast({
							icon: "none",
							title: "请返回后重试"
						})
					}
				})
			}
		},
		mounted() {
			this.getGoodsScenic();
			this.getGoodsFood();
			this.getGoodsHotel();
		}
	}
</script>

<style lang="scss">
	
</style>
