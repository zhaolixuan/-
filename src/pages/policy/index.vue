<template>
	<view class="content">
		<view>
			<div class="imgBox">
				<image src="../../static/images/policy_banner.png"></image>
			</div>
			<div class="inputBox">
				<div>
					<input class="search_input" confirm-type="search" placeholder="输入关键字" v-model="searchName"
						@confirm="seachEvent" />
					<span @click="seachEvent">
						<text class="iconfont icon-sousuo"></text>
					</span>
				</div>
			</div>

			<scroll-view v-if="pickerView" class="list" scroll-y>
				<block v-if="enterpriseArr.length != 0">
					<view v-for="(item,index) in enterpriseArr" :key="index" class="item" @click="changeCompany(item.value,'add')">
						<text>{{item.value}}</text>
					</view>
				</block>
				<block v-else>
					<text class="item">暂无数据</text>
				</block>
			</scroll-view>
			
			
			<image src="../../static/images/policy_none.png" class="none" v-if="searchList.length == 0"></image>
			<view class="searchlist" v-else>
				<h6>历史搜索</h6>	
				<ul>
					<li @click="changeCompany(item)" v-for="(item,index) in searchList" :key="index">
						{{item}}
						<i class="iconfont icon-youjiantou"></i>
					</li>
				</ul>

			</view>
			<image src="../../static/images/policy_none.png" class="none"></image>
		</view>
	</view>
</template>

<script>
	import api from "@/api/policy";
	export default {
		data() {
			return {
				searchName:'',
				pickerView: false,
				enterpriseArr: [], // 企业名称 模糊搜索后的 数据
				searchList:[]
			}
		},
		onShow() {		
			api.getHistoryList().then((res)=>{
				if(res.data && res.data.length > 0){
					this.searchList = res.data
				}
			})
		},
		onLoad() {
			
		},
		methods: {
			seachEvent:function(){
				this.pickerView = true;
				api.getNamevague({
					name: this.searchName,
					clientType: 'applet'
				}).then((res) => {
					if (res.success === true) {
						this.enterpriseArr = [];
						if (res.data !== undefined && res.data.length > 0) {
							res.data.forEach((item, index) => {
								this.enterpriseArr.push({
									value: item.originalName,
								});
							});
						}
					} else {
						this.enterpriseArr = [];
					}
				});
				// this.searchName = '';
			},
			changeCompany(name,type) {
				this.pickerView = false;
				this.searchName = '';
				if(type == 'add'){
					api.addHistoryData({querys:name}).then((res)=>{})
				}
				wx.navigateTo({
					url: '/pages/policy/policyInfo?name=' + name
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.imgBox {
		width: 100%;
		height: 200upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.inputBox {
		width: 100%;
		position: absolute;
		margin-top: -40upx;
		padding: 0upx 30upx;
		box-sizing: border-box;

		div {
			width: 100%;
			height: 80upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10upx 30upx 0px rgba(7, 26, 122, 0.06);
			border-radius: 10upx;
			margin: 0 auto;
			position: relative;

			span {
				position: absolute;
				top: 10upx;
				right: 0upx;
				width: 90upx;
				height: 60upx;
				text-align: center;
				border-left: 2upx solid #D8D8D8;
				box-sizing: border-box;
				line-height: 60upx;

				text {
					color: #B4B4BE;
					font-size: 40upx;
				}
			}
		}

		input {
			width: 100%;
			height: 80upx;
			padding-left: 30upx;
			padding-right: 92upx;
			box-sizing: border-box;
			font-size: 28upx;
		}
	}

	.list {
		position: fixed;
		z-index: 10;
		width: 100%;
		height: 100%;
		background-color: #fff;
		padding: 0 0upx 150upx 0upx;
		box-sizing: border-box;
		top: 245upx;
		font-size: 24upx;

		.item {
			padding-left: 40upx;
			height: 100upx;
			display: flex;
			border-bottom: 1upx solid #ccc;
			align-items: center;

			text {
				border-bottom: none
			}
		}

	}

	.none {
		width: 596upx;
		height: 444upx;
		margin: 0 auto;
		display: block;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -0%);
		z-index: -1;
	}

	.searchlist {
		padding: 0 40upx;
		margin-top: 54upx;

		h6 {

			font-size: 28upx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #2F2F2F;
			line-height: 36px;
		}

		li {
			height: 65upx;
			line-height: 65upx;
			border-bottom: 1px solid #ccc;
			color: #2F2F2F;
			font-size: 28upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 100%;
			padding-right: 60upx;
			box-sizing: border-box;
			position: relative;

			.iconfont {
				float: right;
				font-size: 28upx;
				color: #2F2F2F;
				position: absolute;
				right: 0;
				top: 0;
			}
		}
	}
</style>
