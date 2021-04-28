<template>
	<view class="personalData">
		<view class="personal-header common-item">
			<text>头像</text>
			<view class="user-head">
				<image :src="infoData.src"></image>
			</view>
		</view>
		<view class="common-item">
			<text>用户名</text>
			<input placeholder="请输入用户名" v-model="infoData.username" />
		</view>
		<view class="common-item">
			<text>昵称</text>
			<input placeholder="请输入昵称" v-model="infoData.nickname" />
		</view>
		<view class="common-item" @click="changePsw">
			<text>密码</text>
			<text class="right">修改密码</text>
		</view>
		<view class="common-item" @click="selBirthday">
			<text>生日</text>
			<view class="birthdayWrap">
				<input class="birthday" disabled v-model="infoData.birthday" />
				<w-picker 
					:visible.sync="visible"
					mode="date" 
					startYear="1970" 
					:endYear="endYear"
					:current="true"
					fields="day"
					:value="infoData.birthday"
					@confirm="onConfirm($event,'date')"
					@cancel="onCancel"
					:disabled-after="true"
					ref="date" 
				    >
				</w-picker>
				<FontAwesome class="icon" size="40" stackIndex="1" fw type="fas fa-calendar-alt"></FontAwesome>
			</view>
		</view>
		<view class="common-item" @click="selSex">
			<text>性别</text>
				<picker
				class="sexWrap"
				mode="selector"
				:range="selectorList"
				range-key="sitem"
				:value="infoData.sex"
				@change="selSex">
				<view class="uni-input">{{ selectorList[infoData.sex].sitem }}</view>
			</picker>
		</view>
		<view class="common-item" @click="shippingAddress">
			<text>收货地址</text>
		</view>
		<view class="btn-wrap" @click="saveInfo">保存</view>
	</view>
</template>

<script>
	import FontAwesome from '@/components/Am-FontAwesome/index.vue'
	import wPicker from "@/components/w-picker/w-picker.vue";
	import KXDateTime from "@/components/kx-datetime/kx-datetime.vue"
	export default {
		components: {
			FontAwesome,
			wPicker,
			KXDateTime
		},
		data() {
			return {
				visible: false,
				endYear: new Date().getFullYear(),
				selectorList: [
					{
						"sitem": "保密",
						value: 0
					},
					{
						"sitem": "男",
						value: 1
					},
					{
						"sitem": "女",
						value: 2
					}
				],
				infoData: {
					src: "/static/user/man.png",
					username: "这是用户名",
					nickname: "这是昵称",
					sex: "0",
					birthday: "2019-03-31",
				}
			}
		},
		methods: {
			changePsw () {
				
			},
			selBirthday () {
				this.$refs.date.show();
			},
			onConfirm (e, type) {
				this.infoData.birthday = e.value;
			},
			selSex: function(e) {
				this.infoData.sex = e.target.value;
			},
			shippingAddress () {
			
			},
			saveInfo () {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.personalData {
		background-color: #fff;
		.common-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 88rpx;
			padding: 0 34rpx;
			font-size: 12px;
			input {
				text-align: right;
				font-size: 12px;
				flex: 2;
				height: 88rpx;
			}
			.sexWrap {
				flex: 2;
				text-align: right;
			}
			text {
				flex: 1;
				&.right {
					text-align: right;
				}
			}
			border-bottom: 1px solid #d1d1d1;
			&:last-child {
				border-bottom: none;
			}
			&.personal-header {
				padding-top: 10px;
				padding-bottom: 5px;
				border-bottom: none;
				.user-head {
					width: 170rpx;
					height: 170rpx;
					image {
						max-width: unset;
						min-width: unset;
						width: 100%;
						height: 100%;
						border-radius: 85rpx;
					}
				}
			}
			.icon-box {
				position: relative;
				width: 36rpx;
				height: 40rpx;
				.icon {
					height: 100%;
					line-height: 40rpx;
					color: #929292;
				}
			}
			.birthdayWrap {
				flex: 2;
				display: flex;
				position: relative;
				justify-content: right;
				.birthday {
					flex: 1;
					text-align: right;
					padding-right: 5px;
				}
				.icon {
					width: 36rpx;
					height: 40rpx;
					position: relative;
				}
			}
		}
		.btn-wrap {
			position: fixed;
			bottom: 0;
			width: 100%;
			line-height: 90rpx;
			border-top: 1px solid #eaeaea;
			background-color: $theme-color;
			color: #fff;
			text-align: center;
		}
	}
</style>
