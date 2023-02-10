<template>
	<view class="content">
		<view v-if="isShow">
			<web-view :src="linkUrl" />
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				linkUrl: '',
				isShow:false,
			}
		},
		onLoad:function(option){
			console.log(option)
		}
		onShow() {
			if (!uni.getStorageSync('loginName')) {
				uni.reLaunch({
					url: '/pages/login/index'
				});
			}else{
				this.isShow = true;
				this.linkUrl = 'https://zsmp-h5.xjoycity.com/index.html#/zsmp?account='+ uni.getStorageSync('loginName')
				console.log(this.linkUrl)
			}
		},
		created() {

		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style>

</style>
