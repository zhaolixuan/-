<template>
	<view class="content">
		<div class="content_view">
			<view class="titleName">
				<image src="../../static/images/company2x.png" class="company"></image>
				{{companyName}}
			</view>
			<div class="match">
				<div class="left">
					<p class="p">
						依据企业信息,为您匹配 <span class="span">{{count}}</span>个政策
					</p>
				</div>
				<!-- <div class="right">
					<view class="uni-left">
						筛选
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</div> -->
			</div>
			
			
			<div class="content_list">
				<ul>
					<li v-for="(item,index) in policyList" :key="index"  @click="getPolicyDetail(item.policyId)">
						<h5 class="h5">{{item.title}}</h5>
						<p class="space">
							<span class="time">{{item.issueTime}}</span>
							<span class="word">{{item.policyProvince}}</span>
						</p>
						<p v-if="item.policyMatchCount && item.policyMatchCount != 0" class="pass">匹配通过<span>{{item.policyMatchCount}}</span>条款:</p>
						<template v-if="item.policyDoc && item.policyDoc.length">
							
							<div  v-for="(items,ind) in item.policyDoc" :key="ind" class="list_name">
								<span class="circle"></span>
								<p class="p">
									{{items.content}}
								</p>
							</div> 
						</template>
					</li>
				</ul>
				<no-data :nodataImg="nodataImg" :nodataText="nodataText" v-if="count == 0"></no-data>
				<uni-load-more :loadingType="1" :status="loadstatus" v-else></uni-load-more>
				
			</div>
		</div>
	</view>
</template>
<script>
	import api from "@/api/policy";
	import {config} from "@/api/config";
	import noData from "@/components/no_data.vue"
	export default {
		data() {
			return {
				
				loadstatus: 'more',
				nodataImg: '',
				nodataText: '暂无匹配政策',
				index: 0,
				page:1,
				pageSize:10,
				array: ['是', '否'],
				companyName:'',
				count:0,
				policyList:[],
				condition:'',
			}
		},
		components: {
			noData
		},
		onLoad(option) {
			if(option.search){
				this.condition = JSON.parse(option.search);
				this.companyName = this.condition.companyName;
				this.getList();
				this.nodataImg = config.staticUrl + '/small/order_no_img.png';
			}
		},
		onReachBottom: function() {
			var that = this;
			setTimeout(function() {
				that.getList();
			}, 1000);
		},
		methods: {
			getList(){		
				let query = {
					...this.condition,
					page:this.page,
					pageSize:this.pageSize,
				}
				if (this.loadstatus == 'noMore') {
					return false;
				}
				this.loadstatus = 'loading';
				api.setpolicyGetCompanyV2(query).then((res) => {
					this.policyList = this.policyList.concat(res.data.policyEsResultList)
					this.count = res.data.count
					
					if (res.data.total == 0 || Math.ceil(Number(res.data.total) / this.rows) <= this.page) {
						this.loadstatus = 'noMore';
					} else {
						this.page++;
						this.loadstatus = 'loading';
					}
				
				})
				
			},
			getPolicyDetail(id){
				wx.navigateTo({
					url: '/pages/policy/detail?id=' + id
				})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
		}
	}
</script>

<style scoped lang="scss">
	.content_view {
		padding: 0 30upx;
		box-sizing: border-box;
		background: #F3F6FB;
		.titleName {
			height: 90upx;
			background: #FFFFFF;
			padding: 15upx 0upx;
			display: flex;
			align-items: center;
			font-size: 32upx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #323232;
			margin-bottom: 20upx;
			background: #FFFFFF;
			box-shadow: 0px 5px 15px 0px rgba(7, 26, 122, 0.06);
			border-radius: 5px;

			.company {
				height: 60upx;
				width: 60upx;
				margin: 0 30upx;
			}
		}

		.match {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 20upx 0;
			.left {
				flex: 1;
				font-size: 24upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;

				.p {
					.span {
						color: #2D55EE;
						padding: 0 4upx;
						box-sizing: border-box;
					}
				}
			}

			.right {
				width: 150upx;
				font-size: 24upx;
				display: flex;
				justify-content: space-between;
				font-family: MicrosoftYaHei;
				color: #2F2F2F;
				
				.uni-left {
					margin-right: 21upx;
				}
				.uni-list-cell-db{
					position: relative;
					&::after {
						content: "";
						position: absolute;
						left: -40upx;
						top: 5px;
						width: 0px;
						height: 0px;
						border-left: 16upx solid transparent;
						border-top: 16upx solid #B4B4BE;
						border-right: 16upx solid transparent;
					}
				}
			}
		}
		.content_list{
			overflow-y: scroll;
			ul{
				li{
					background: #FFFFFF;
					border-radius: 6upx;
					padding: 24upx 34upx;
					box-sizing: border-box;
					margin-bottom: 20upx;
					.h5{
						font-size: 32upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #2F2F2F;
						line-height: 48upx;
						margin-bottom: 22upx;
					}
					.space{
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 25upx;
						.time{
							font-size: 24upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #797D97;
						}
						.word{
							background: #E6F2FF;
							border-radius: 2px;
							padding: 4upx;
							box-sizing: border-box;
							font-size: 24upx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #509CE8;
						}
					}
					.pass{
						font-size: 22upx;
						margin-bottom: 10upx;
						span{
							color: #509CE8;
						}
					}
					.list_name{
						font-size: 24upx;
						font-family: MicrosoftYaHei;
						margin-bottom: 20upx;
						display: flex;
						justify-content: space-between;
						
						.circle{
							display: inline-block;
							width: 4px;
							height: 4px;
							background: #5E6694;
							border-radius: 50%;
							margin-top: 14upx;
							margin-right: 10upx;
						}
						.p{
							flex: 1;
							color: #5E6694;
							line-height: 32upx;
							    text-align: justify;
							    overflow: hidden;
							    word-break: break-all;
							    display: -webkit-box;
							    -webkit-line-clamp: 2;
							    -webkit-box-orient: vertical;
						}
					}
					
				}
			}
		}
	}
</style>
