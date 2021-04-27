<template>
	<view>
		<uni-list v-for="(item, index) in contactPersonList" :key="index">
		    <uni-list-item :title=item.name showArrow link="navigateTo" @click="personMess(item)" ></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contactPersonList: []
			}
		},
		onLoad() {
			this.getContactPersonList();
		},
		methods: {
			async getContactPersonList(){
				const result = await this.$jdGlo.myRequest({
					url: this.$httpPath + "/cus/getContactPersonList",
					method: "POST",
					data: {
						pageIndex: 1,
						pageSize: 3
					}
				}, (res, options) => {
					debugger
					this.contactPersonList = res.data;
				}, (res, options) =>{
					debugger
				})
			},
			personMess(item){
				debugger
			}
		}
	}
</script>

<style>

</style>
