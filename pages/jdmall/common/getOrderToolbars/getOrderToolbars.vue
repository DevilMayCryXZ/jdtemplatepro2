<template>
	<view class="tab-box-fixed">
		<view class="tab-box">
			<view class="tab-item" :class="active === index ? 'active' : ''" :id="'tab-item-' + index" v-for="(item,index) in tabList"
			 :key="index" v-on:click="tabClick($event, item)" :data-index="index">
				{{item.text}}
			</view>
			<view :style="[{ left: market_left, width: market_width + 'px' }]" class="market-underline"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				market_left: 0,
				market_width: 0,
				active: 0
			}
		},
		props: {
			tabList: {
				type: Array,
				default: () => ["全部", "待付款", "待发货", "待收货", "待评价", ]
			},
			currentActive: {
				type: Number,
				default: 0
			}
		},
		mounted() {
			uni.createSelectorQuery().in(this).select('#tab-item-' + this.currentActive).boundingClientRect().exec((res) => {
				this.market_left = res[0].left + 'px';
				this.market_width = res[0].width;
			});
		},
		methods: {
			tabClick(e, item) {
				let target = e.target;
				this.active = target.dataset.index;
				this.activeAction(target);
				this.$emit('myEve', item);
			},
			activeAction(target) {
				let index = Number(target.dataset.index);
				this.market_left = target.offsetLeft + 'px';
				uni.createSelectorQuery().in(this).select('#tab-item-' + index).boundingClientRect().exec((res) => {
					this.market_width = res[0].width;
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.tab-box-fixed{
		position: fixed;
		top: 44px;
		left: 0;
		width: 100%;
		z-index: 99;
	}
	.tab-box {
		display: flex;
		position: relative;
		width: 100%;
		height: 44px;
		background-color: white;
		font-size: 14px;
		color: #333;
		z-index: 10;
		align-items: center;
		justify-content: space-around;
	}

	.tab-item {
		flex: 1;
		height: 100%;
		line-height: 44px;
		text-align: center;
	}

	.tab-item.active {
		color: $theme-color;
	}

	.market-underline {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 3px;
		background-color: $theme-color;
		transition: 0.5s;
	}
</style>
