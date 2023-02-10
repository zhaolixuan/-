<template>
	<scroll-view>
		<view class="clues_list">
			<div class="list_header">
				<div class="inputBox">
					<input class="search_input" confirm-type="search" placeholder="输入企业名称查找"
						placeholder-style="font-size:12px;color:#B4B4BE;" v-model="searchName" @confirm="seachEvent" />
					<span @click="seachEvent">
						<text class="iconfont icon-sousuo"></text>
					</span>
				</div>
			</div>

			<ul class="list_conten">
				<li v-for="(item,index) in list" @click="getVisitDetail(item)">
					<div class="list_conten_left">
						<h4>{{item.enterpriseName}}</h4>
						<h5><span>{{item.projectName}}</span></h5>
						<p> <text class="iconfont icon-zhongbiao"></text> {{getNowFormatTime(item.seeTime)}}</p>
					</div>
				</li>
			</ul>
			<no-data :nodataImg="nodataImg" :nodataText="nodataText" v-if="list.length == 0"></no-data>
			<uni-load-more :loadingType="1" :status="loadstatus" v-else></uni-load-more>
		</view>
		<addRecordBtn v-if="role" name='拜访记录' @toAdd='toAdd'></addRecordBtn>
	</scroll-view>
</template>

<script>
	import {
		getNowFormatTime
	} from "@/utils/time.js";
	import api from "@/api/visit.js";
	import {
		config
	} from "@/api/config";
	import noData from "@/components/no_data.vue"
	import addRecordBtn from "@/components/addRecordBtn/index.vue";
	export default {
		data() {
			return {
				page: 1,
				rows: 10,
				loadstatus: 'more',
				nodataImg: '',
				nodataText: '暂无数据',

				userObj: '',
				list: new Array(),
				searchName: '',
				statusList: {},
				role: true
			}
		},
		components: {
			noData,
			addRecordBtn
		},
		onLoad() {
			this.role = ['管理员', '梧州招商小分队'].includes(uni.getStorageSync('roleName'))
			this.nodataText = this.role ? '暂无数据' : '暂无权限，请联系管理员'
			this.nodataImg = config.staticUrl + '/small/order_no_img.png';
			this.binding()
			this.getList();
		},
		onShow() {
			
			// this.loadstatus = 'more'
			// this.list = []
			// this.nodataImg = config.staticUrl + '/small/order_no_img.png';
			// this.getList();
		},

		onPullDownRefresh() {
			var that = this;
			this.page = 1
			setTimeout(function() {
				that.loadstatus = 'more'
				that.list = []
				that.getList();
			}, 500);
		},
		onReachBottom() {
			var that = this;
			setTimeout(function() {
				that.getList();
			}, 1000);
		},
		onShareAppMessage() {},
		methods: {
			binding(){
				let data = {
					accounts:uni.getStorageSync('userObj').userName,
				}
				api.getBinding(data)
				
			},
			init() {
				this.loadstatus = 'more'
				this.list = []
				this.page = 1
				this.nodataImg = config.staticUrl + '/small/order_no_img.png';
				this.getList();
			},
			getNowFormatTime(time) {
				if (!time) return ''
				return getNowFormatTime(new Date(time))
			},
			//搜索
			seachEvent() {
				this.list = [];
				this.page = 1;
				this.loadstatus = 'more';
				this.getList();
			},
			//获取线索列表
			getList() {
				if (!this.role) return
				let query = {

					rows: this.rows,
					page: this.page,
					enterpriseName: this.searchName,
				}

				if (this.loadstatus == 'noMore') {
					return false;
				}
				this.loadstatus = 'loading';
				api.getVisitList(query).then((res) => {
					if (res.map && res.map.success) {
						this.list = this.list.concat(res.rows)
						if (res.total == 0 || Math.ceil(Number(res.total) / this.rows) <= this.page) {
							this.loadstatus = 'noMore';
						} else {
							this.page++;
							this.loadstatus = 'loading';
						}
					} else {
						uni.showToast({
							title: res.message,
							icon: 'error',
							duration: 1000
						})
					}
					return


				}).catch((err) => {
					console.log(err)
					// uni.showToast({
					// 	title: "修改失败",
					// 	icon: 'error',
					// 	duration: 1000
					// })
				});
			},
			//查看线索详情
			getVisitDetail(item) {
				// uni.setStorageSync('businessDetail', JSON.stringify(item));
				wx.navigateTo({
					url: '/pages/visit/addRecord?id=' + item.id
				})
			},
			// 添加拜访记录按钮点击事件
			toAdd() {
				uni.navigateTo({
					url: '/pages/visit/addRecord'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clues_list {
		margin-bottom: var(--window-bottom);
		background: #F3F6FB;
	}

	.list_header {
		width: 100%;
		height: 124upx;
		padding: 0upx 30upx;
		box-sizing: border-box;
		background-color: #fff;
		overflow: hidden;

		.inputBox {
			width: 100%;
			background: #F1F1F1;
			border-radius: 10upx;
			height: 80upx;
			margin-top: 24upx;
			position: relative;

			input {
				width: 100%;
				height: 80upx;
				padding-left: 40upx;
				padding-right: 20upx;
				box-sizing: border-box;
			}

			span {
				position: absolute;
				top: 50%;
				right: 0upx;
				width: 90upx;
				height: 60upx;
				text-align: center;
				box-sizing: border-box;
				line-height: 60upx;
				transform: translateY(-50%);

				text {
					color: #B4B4BE;
					font-size: 35upx;
				}
			}

		}
	}

	.list_conten {
		width: 100%;
		padding: 0upx 30upx;
		box-sizing: border-box;
		background: #FFFFFF;
		position: relative;
		margin-top: 20upx;

		li {
			padding: 30upx 0upx;
			box-sizing: border-box;
			overflow: hidden;
			border-bottom: 1upx solid #E8E9ED;

			.list_conten_left {
				h4 {
					font-size: 32upx;
					font-weight: bold;
					color: #2F2F2F;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					box-sizing: border-box;
					padding-bottom: 20upx;

				}

				h5 {
					font-size: 26upx;
					color: #5E6694;
					overflow: hidden;
					line-height: 26upx;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding-bottom: 20upx;
					box-sizing: border-box;
					padding-left: 10upx;
				}

				p {
					padding-left: 5upx;
					font-size: 26upx;
					color: #5E6694;
					line-height: 26upx;
					box-sizing: border-box;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: flex;
					align-items: center;
				}

				.icon-zhongbiao {
					color: #797D97;
					font-size: 34upx;
					margin-right: 10upx;
				}
			}
		}
	}
</style>
