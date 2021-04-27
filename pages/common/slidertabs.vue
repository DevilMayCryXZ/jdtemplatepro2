<!-- <vgt-tab :list="list" @onValueChange="onValueChange"></vgt-tab> -->
<template>
	<view class="scroll-wrap" :style="{zIndex: zIndex}">
		<scroll-view class="scroll-view_hold" scroll-x="true" scroll-with-animation="true"
			:scroll-left="position">
			<view v-for="(item, index) in list" :key="index"
				class="scroll-view-item" :class="choseInd === index ? 'active' : ''"
				:data-item="item.title" @click="onClickScrollItem(index, $event)">{{item.title}}</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				required: true,
				default: [],
			},
			zIndex: {
				type: [String, Number],
				default: 1000
			}
		},
		data() {
			return {
				scrollViewLeftArr: new Map(), // 存储scroll信息
				choseInd: 0, // 当前选中
				position: 0, // 滑动位置
				windowWidth: 0, // 页面高度
				isShowList: false, // 是否展示为列表形式
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					const {
						windowWidth
					} = res
					this.windowWidth = windowWidth
				}
			})
			// 获取列表每个dom的偏移量
			const query = uni.createSelectorQuery().in(this)
			query.selectAll('.scroll-view-item').boundingClientRect()
			query.exec((res) => {
				res[0].forEach(element => {
					const item = element.dataset.item
					const obj = {
						name: item,
						left: element.left,
					}
					this.scrollViewLeftArr.set(item, obj)
				})
			})

		},
		methods: {
			onClickScrollItem(index, event) {
				this.choseInd = index
				const {
					item
				} = event.currentTarget.dataset
				const {
					offsetLeft
				} = event.target
				this.position = offsetLeft - (this.windowWidth / 2 - 30)
				this.$emit('onValueChange', {
					currentInd: index,
					currentItem: item
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.scroll-wrap {
		position: relative;
		width: 100%;
		.scroll-view_hold {
			position: relative;
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			background: #fff;
			&::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
			}
			.scroll-view-item {
				min-width: 120rpx;
				padding: 16rpx;
				display: inline-block;
				text-align: center;
				line-height: 60rpx;
				font-size: 25rpx;
				border-radius: 32rpx;
				margin: 0 0 0 20rpx;
				&:last-child {
					margin-right: 20rpx;
				}
				&.active {
					color: $theme-color;
					font-weight: bold;
					font-size: 32rpx;
					position: relative;
					&::after {
						position: absolute;
						content: "";
						width: 50%;
						left: 25%;
						height: 2px;
						background-color: $theme-color;
						bottom: 0;
					}
				}
			}
		}
	}
</style>
