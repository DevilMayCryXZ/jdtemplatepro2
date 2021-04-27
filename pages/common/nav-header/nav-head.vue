<!-- 
	tip: 父子之间传递
	<navheader title="购票首页" @myeven="testfn"></navheader> 
	testfn (opt) {  
		console.log(opt)
	}
	
	tip：任意页面传递
	<navheader title="购票首页" @myeven="testfn"></navheader>
	mounted() {
		this.$refs.navheader.$on("myeven", this.testfn)
	}
-->
<template>
	<view>
		<uni-nav-bar
			class="view_header" 
			left-icon="back" 
			:fixed='true' 
			background-color='#3176de' 
			color="#fff"
			:title="title"
			@clickLeft="goback" >
			<view v-show="hasaddress" slot="left" @click="selAdd" class="addressName">
				{{ addressitem }}
			</view>
		</uni-nav-bar>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	// import PubSub from 'pubsub-js'
	export default {
		components: {
			uniNavBar
		},
		props: {
			title: {
				type: String,
				default: ""
			},
			hasaddress: {
				type: Boolean,
				default: true
			}
		},
		mounted() {
			// PubSub.unsubscribe("reload");
			// PubSub.subscribe("reload",(msg, arg)=>{
			// 	console.log(arg)
			// 	this.upData(arg)
			// });
		},
		data() {
			return {
				addressitem: getApp().globalData.addressitem,
				addresscode: getApp().globalData.addresscode
			}
		},
		methods: {
			upData (arg) {
				getApp().globalData.addressitem = arg.name;
				getApp().globalData.addresscode = arg.id;
				uni.setStorageSync('addressitem', arg.name);
				uni.setStorageSync('addresscode', arg.id);
				this.addressitem = arg.name;
				this.addresscode = arg.id;
			},
			goback () {
				// #ifdef H5  
				let canBack = true  
				const pages = getCurrentPages()  
				// 有可返回的页面则直接返回，uni.navigateBack默认返回失败之后会自动刷新页面 ，无法继续返回  
				if (pages.length > 1) {  
					uni.navigateBack(1)  
					return;  
				}  
				// vue router 可以返回uni.navigateBack失败的页面 但是会重新加载  
				let a = this.$router.go(-1)  
				// router.go失败之后则重定向到首页  
				if (a == undefined) {  
					uni.switchTab({  
						url: "/pages/index/index"  
					})  
				}  
				return;  
				// #endif  
				uni.navigateBack(1);
			},
			selAdd () {
				uni.navigateTo({
					url: "/pages/common/nav-header/cityList/cityList" 
				})
			},
			getnavigator() {
				// navigator.geolocation.getCurrentPosition(o=>{
				// 	var lat = o.coords.latitude;
				// 	var lon = o.coords.longitude;
				// 	alert("维度：" + lat + "，经度：" + lon);
				// })
				// return
				var option = {
					enableHighAcuracy: true,
					maximumAge: 0,
					timeout: 30000
				}
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(this.showPosition, this.showError, option);
				}
			},
			showPosition(position) {
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;
				alert("维度：" + lat + "，经度：" + lon);
			},
			showError(error) {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						alert("已拒绝地理位置定位服务")
						break;
					case error.POSITION_UNAVAILAVLE:
						alert("无法获取当前位置")
						break;
					case error.TIMEOUT:
						alert("超时")
						break;
					default:
						break;
				}
			}
			,
			userFn (val) {
				console.log("进行回调")
				this.$emit("myeven", {addresscode: val})
			}
		},
		watch: {
			addresscode (val, oval) {
				if (val != oval) this.userFn(val);
			}
		}
	}
</script>

<style scoped>
	.addressName {
		width: 120rpx !important;
		font-size: 28rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
