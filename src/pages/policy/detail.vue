<template>
	<scroll-view>
		<view class="main">
			<view class='detail_header'>
				<h1 class='activeTitle'>{{policyObj.title}}</h1>
				<div class='moreInfo'>
					<text class='iconfont icon-shijian'></text>
					<span>{{policyObj.issueTime}}</span>
				</div>
				<div class='moreInfo' >
					<text class='iconfont icon-diqu'></text>
					<span>{{policyObj.policyProvince}}</span>
				</div>
				<div class='moreInfo'>
					<text class='iconfont icon-bumen' style="font-size:28upx"></text>
					<span>{{policyObj.department}}</span>
				</div>
				<div class='moreInfo'>
					<text class='iconfont icon-jibie' style="font-size:28upx"></text>
					<span>市级</span>
				</div>
			</view>
			<view class="facilities">
				<div class="public_title">
					<h2><i></i>政策内容</h2>
					
				</div>
				<p class="content" v-html='policyObj.policyText'></p>
			</view>
		</view>
		
	</scroll-view>
	
	<!-- <view class="content">
		<view class="title">
			<h6>{{policyObj.title}}</h6>
			<p class="keywords" v-if="policyObj.keywords">
				<span v-for="(item,index) in policyObj.keywords.split(',')"> {{item}}</span>
			</p>
		</view>
		<ul>
			<li>发文部门	  <span>{{policyObj.department}}</span></li>
			<li>发布日期	  <span>{{policyObj.issueTime}}</span></li>
			<li>政策级别	  <span>市级</span></li>
			<li>适用行业	  <span>{{policyObj.industrys}}</span></li>
		</ul>
		
		<view class="facilities">
			<div class="public_title">
				<h2>政策要点</h2>
			</div>
			<p class="main"> 暂无</p>
		</view>

		<view  class="facilities">
			<div class="public_title">
				<h2>政策内容</h2>
			</div>
			<view class="main" v-html="policyObj.policyText"></view>
		</view>
	</view> -->
</template>

<script>
	import api from "@/api/policy";
	export default {
		data() {
			return {
				id:'',
				policyObj:'',
			}
		},
		components: {
			
		},
		onLoad(option) {
			if(option.id){
				this.id = option.id
				this.getDetail();
			}
		},

		methods: {
			getDetail(){		
				api.policyDetail({id:this.id}).then((res) => {
					if(res.data){
						console.log(res.data)
						this.policyObj = res.data;
						console.log(this.policyObj)
					}
				
				})
				
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.main{
		    background: #f3f6fb;
	}
	.detail_header{
		background-color:white;
		padding:20upx 0;
		.activeTitle{
			padding:10upx 40upx;
			font-size:36upx;
			color:rgba(50,50,50,1);
		}
		.moreInfo{
			padding:10upx 40upx;
			color:rgba(121,125,151,1);
	
			text{
	
				font-size: 32upx;
				padding-right: 10upx;
				vertical-align: middle;
				display: inline-block;
				margin-top: -2upx;
			}
			span{
				font-size:24upx;
			}
		}
		.child2{
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			&>div{
				display: flex;
				align-items: baseline;
			}
			&>i{
				color:rgba(200, 200, 210, 1);
				padding-right: 0px;
			}
		}
		
	}
	.public_title{
		overflow: hidden;
		height: 120upx;
		position: relative;
		background-color: #fff;
		padding: 0 40upx;
		h2{
			font-weight: 700;
			color: #333;
			line-height: 60px;	
			font-size: 38upx;
		}
		i{
			width: 4px;
			height: 16px;
			background: #4982FF;
			display: inline-block;
			margin-right: 8px;
		}
	}
	
	
	.facilities{
		margin-top: 20upx;
		background-color: #fff;
		.content{
			padding: 0 40upx;
			font-size: 28upx;
			line-height: 40upx;
			padding-bottom: 20upx;
			-webkit-touch-callout: text;
			-webkit-user-select: text;
			-moz-user-select: text;
			-ms-user-select: text;
			user-select: text;
		}
	}

</style>
