<template>
	<transition name="mask-bg-fade">
		<view class="no_data">		
			<image  mode="scaleToFill" :src="nodataImg"  class="imgData"></image>
			<p>{{nodataText}}</p>
			<p v-if='nodataText1'>{{nodataText1}}</p>
		</view>	
	</transition>
</template>

<script>

	export default {
		props:{
			nodataImg:{
				type:String,
			},
			nodataText:{
				type:String,
				default: "暂无数据",
			},
			nodataText1:{
				type:String,
				default: "",
			}
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.no_data{
		text-align: center;
		background-color: #fff;
		.imgData{
			width: 440upx;
			height:440upx;
			margin-top: 15%;
		}
		p{
			color:#82828C;
			font-size:32upx;
		}

	}
</style>


