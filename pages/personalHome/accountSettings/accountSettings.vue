<template>
	<view>
		<uni-list>
		    <uni-list-item  title="我的联系人" showArrow link="navigateTo" @click="linkView(contactPerson.url)" ></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contactPerson:{
					url: "/pages/personalHome/contactPerson/contactPerson"
				}
			}
		},
		methods: {
			linkView(url){
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>

</style>
