<template>
	<view>
		 <view class="cpt-mask">{{ tip }}</view> 
	</view>
</template>

<script>
	export default {
		props: {
			tip: {
				type: String,
				default: "请等待"
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.cpt-mask {  
		position: fixed;  
		top: 0;  
		left: 0;  
		width: 100%;  
		height: 100%;  
		background-color: #000000;  
		opacity: 0.5;  
		z-index: 99;  
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
    }  
</style>
