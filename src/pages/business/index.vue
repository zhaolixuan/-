<template>
	<scroll-view>
		<view class="pool_list">
			<view class="fixBox">
				<div class="inputBox">
					<div>
						<input class="search_input" confirm-type="search" placeholder="输入关键字"
							placeholder-style="font-size:12px;color:#B4B4BE;" v-model.trim="searchName"
							@confirm="seachEvent" />
						<span @click="seachEvent">
							<icon type="search" size="26" />
							<!-- <uni-icons type="search" size="30"></uni-icons> -->
							<!-- <text class="iconfont icon-sousuo"></text> -->
						</span>
					</div>
				</div>
				<div class="tab_list">
					<ul>
						<li>
							<picker :value="value1" :range="industryData" range-key="name"
								@change="bindPickerIndustryData">
								<view class="uni-input">{{industryData[value1].name}} <text
										class="iconfont icon-below-s"></text></view>
							</picker>
						</li>
						<li>
							<picker :value="value2" :range="statusData" range-key="name" @change="bindPickerstatusData">
								<view class="uni-input">{{statusData[value2].name}} <text
										class="iconfont icon-below-s"></text></view>
							</picker>
						</li>
						<li>
							<picker :value="value3" :range="timeData" range-key="name" @change="bindTimeData">
								<view class="uni-input">{{timeData[value3].name}} <text
										class="iconfont icon-below-s"></text></view>
							</picker>
						</li>
					</ul>
				</div>
			</view>
			<ul class="list_conten">
				<li v-for="(item,index) in list">
					<div class="list_conten_left">

						<h4 :title='item.name'>
							<p>{{item.name}}</p>
							<span>{{item.industrial}}</span>
						</h4>
						<p>
							<text class="iconfont icon-dingweixiao"></text>
							{{item.belong}}
						</p>
						<p>
							<text class="iconfont icon-dianhua"></text>
							{{item.phone}}
						</p>
					</div>
					<div class="list_conten_right">
						<span>{{item.status == '1'?'线索': item.status == '10'? '商机':  item.status == '20'? '项目':'落地'}}</span>
						<button class="mini-btn btn" @click="getClueDetail(item)" type="primary" size="mini">跟进</button>
					</div>
				</li>
			</ul>
			<no-data :nodataImg="nodataImg" :nodataText="nodataText" v-if="list.length == 0"></no-data>
			<uni-load-more :loadingType="1" :status="loadstatus" v-else></uni-load-more>
		</view>
		<addRecordBtn v-if="role" name='商机' @toAdd='toAdd'></addRecordBtn>
	</scroll-view>
</template>

<script>
	import api from "@/api/business";
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

				value1: 0,
				value2: 0,
				value3: 0,

				industryData: [{
					"name": "产业",
					"id": ""
				}],
				statusData: [{
					"name": "跟进状态",
					"value": ""
				}],
				timeData: [{
						value: '',
						name: '更新时间'
					},
					{
						value: '最近一周',
						name: '最近一周'
					},
					{
						value: '最近一个月',
						name: '最近一个月'
					},
					{
						value: '最近三个月',
						name: '最近三个月'
					},
					{
						value: '最近半年',
						name: '最近半年'
					},
					{
						value: '最近一年',
						name: '最近一年'
					},
					{
						value: '一年以上',
						name: '一年以上'
					},
				],

				industry: '',
				status: '',
				time: '',
				createdBegin: '',
				createdEnd: '',
				searchName: '',

				list: new Array(),
				role:false

			}
		},
		components: {
			addRecordBtn,
			noData,
		},
		created() {
			api.getIndustryClass().then((res) => {
				this.industryData = this.industryData.concat(res.data.content);
			})
			api.getBusinessStatus().then((res) => {
				this.statusData = this.statusData.concat(res.data.content);
			})
		},
		onLoad(option) {
			this.role = ['管理员','梧州招商工作人员'].includes(uni.getStorageSync('roleName')) 
			this.nodataText = this.role ? '暂无数据' : '暂无权限，请联系管理员'
			this.nodataImg = config.staticUrl + '/small/order_no_img.png';
			this.getList();
		},
		onShow() {
			
		},

		onPullDownRefresh() {

			var that = this;
			this.page = 1
			setTimeout(function() {
				that.loadstatus = 'more'
				that.list = []
				if (that.value1 || that.value2 || that.value3) {
					that.getQueryCondition()
				} else {
					that.getList();
				}
			}, 500);
		},
		onReachBottom: function() {
			var that = this;
			setTimeout(function() {
				that.getList();
			}, 1000);
		},
		methods: {
			init() {
				this.loadstatus = 'more'
				this.list = []
				this.page = 1
				this.nodataImg = config.staticUrl + '/small/order_no_img.png';
				this.getList();
			},
			newDataeven(data) {
				let time = "";
				if (data === undefined) {
					let now = new Date();
					let year = now.getFullYear(); //得到年份
					let month = now.getMonth(); //得到月份
					let date = now.getDate(); //得到日期
					month = month + 1;
					if (month < 10) month = "0" + month;
					if (date < 10) date = "0" + date;
					time = year + "-" + month + "-" + date;
				} else {
					let oldTime = new Date().getTime(); //得到毫秒数
					let newDate = new Date(oldTime - data * 24 * 60 * 60 * 1000);
					let year = newDate.getFullYear(); //得到年份
					let month = newDate.getMonth(); //得到月份
					let date = newDate.getDate(); //得到日期
					month = month + 1;
					if (month < 10) month = "0" + month;
					if (date < 10) date = "0" + date;
					time = year + "-" + month + "-" + date;
				}
				return time;
			},
			//搜索
			seachEvent: function() {
				this.list = [];
				this.page = 1;
				this.loadstatus = 'more';
				this.time
				this.industry = ''
				this.status = ''
				this.createdBegin = "";
				this.createdEnd = "";
				this.value1 = 0
				this.value2 = 0
				this.value3 = 0
				this.getList();
			},
			bindPickerIndustryData(e) {
				this.industry = this.industryData[e.target.value].id;
				this.value1 = e.target.value;
				this.list = [];
				this.page = 1;
				this.loadstatus = 'more';
				this.getQueryCondition();
			},
			bindPickerstatusData(e) {
				this.status = this.statusData[e.target.value].value;
				this.value2 = e.target.value;
				this.list = [];
				this.page = 1;
				this.loadstatus = 'more';
				this.getQueryCondition();
			},
			bindTimeData(e) {
				this.time = this.timeData[e.target.value].value;
				this.value3 = e.target.value;
				switch (this.time) {
					case "":
						this.createdBegin = "";
						this.createdEnd = "";
						break;
					case "最近一周":
						this.createdBegin = this.newDataeven(7);
						this.createdEnd = this.newDataeven();
						break;
					case "最近一个月":
						this.createdBegin = this.newDataeven(30);
						this.createdEnd = this.newDataeven();
						break;
					case "最近三个月":
						this.createdBegin = this.newDataeven(90);
						this.createdEnd = this.newDataeven();
						break;
					case "最近半年":
						this.createdBegin = this.newDataeven(183);
						this.createdEnd = this.newDataeven();
						break;
					case "最近一年":
						this.createdBegin = this.newDataeven(365);
						this.createdEnd = this.newDataeven();
						break;
					case "一年以上":
						this.createdBegin = "1979-01-01";
						this.createdEnd = this.newDataeven(365);
						break;
					default:
						break;
				}
				this.list = [];
				this.page = 1;
				this.loadstatus = 'more';
				this.getQueryCondition();
			},
			getQueryCondition() {
				if(!this.role) return
				this.searchName = ''
				let query = {
					createdBegin: this.createdBegin,
					createdEnd: this.createdEnd,
					industrial: this.industry,
					status: this.status,
					pageLimit: this.rows,
					pageNum: this.page,
				}
				if (this.loadstatus == 'noMore') {
					return false;
				}
				this.loadstatus = 'loading';
				api.getQueryCondition(query).then((res) => {
					this.list = this.list.concat(res.message)
					if (res.total == 0 || Math.ceil(Number(res.total) / this.rows) <= this.page) {
						this.loadstatus = 'noMore';
					} else {
						this.page++;
						this.loadstatus = 'loading';
					}

				})

			},
			getList() {
				if(!this.role) return
				let query = {
					pageLimit: this.rows,
					pageNum: this.page,
					searchKey: this.searchName,
				}

				if (this.loadstatus == 'noMore') {
					return false;
				}
				this.loadstatus = 'loading';
				api.getBusinessList(query).then((res) => {
					this.list = this.list.concat(res.message)
					if (res.total == 0 || Math.ceil(Number(res.total) / this.rows) <= this.page) {
						this.loadstatus = 'noMore';
					} else {
						this.page++;
						this.loadstatus = 'loading';
					}

				})
			},
			toAdd() {
				uni.navigateTo({
					url: '/pages/business/addRecord'
				})
			},
			//查看线索详情
			getClueDetail(item) {
				uni.setStorageSync('businessDetail', JSON.stringify(item));
				wx.navigateTo({
					url: '/pages/business/addRecord?id=' + item.id
				})
			},


		}
	}
</script>

<style lang="scss" scoped>
	.pool_list {
		padding-bottom: var(--window-bottom);
		background: #F3F6FB;
	}

	.fixBox {
		width: 100%;
	}

	.inputBox {
		width: 100%;
		background: #FFFFFF;
		padding: 20upx 30upx;
		box-sizing: border-box;
	}

	.inputBox>div {
		width: 100%;
		height: 80upx;
		background: #F1F1F1;
		// box-shadow:0px 10upx 30upx 0px rgba(7,26,122,0.06);
		border-radius: 10upx;
		margin: 0 auto;
		position: relative;
	}

	.inputBox>div span {
		position: absolute;
		top: 10upx;
		right: 0upx;
		width: 90upx;
		height: 60upx;
		border-left: 2upx solid #D8D8D8;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.inputBox>div span text {
		color: #B4B4BE;
		font-size: 40upx;
	}

	.inputBox input {
		width: 100%;
		height: 80upx;
		padding-left: 30upx;
		padding-right: 92upx;
		box-sizing: border-box;
	}

	.img {
		height: 260upx;
		width: 100%;
	}

	.tab_list {
		// position: relative;
		margin-top: 20upx;
		border-bottom: 1upx solid #E8E9ED;
		width: 100%;

		ul {
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			background: #fff;

			li {
				width: 33.3%;
				float: left;
				text-align: center;
				font-size: 24upx;
				position: relative;
			}

			.iconfont {
				color: #797D97;
				font-size: 28upx;
				margin-left: 6upx;
			}
		}

	}

	.list_conten {
		width: 100%;
		padding: 0upx 30upx;
		box-sizing: border-box;
		background: #FFFFFF;
		position: relative;

		li {
			width: 100%;
			padding: 30upx 0upx;
			box-sizing: border-box;
			overflow: hidden;
			border-bottom: 1upx solid #E8E9ED;
			display: flex;

			.list_conten_left {
				float: left;
				// flex: 1;
				width: 70%;

				h4 {
					width: 90%;
					font-size: 32upx;
					font-weight: bold;
					color: #2F2F2F;
					padding-bottom: 20upx;
					box-sizing: border-box;
					align-items: baseline;
					display: flex;

					p {
						flex: 1;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-weight: bold;
						color: rgba(47, 47, 47, 1);
						font-family: PingFang-SC-Bold, PingFang-SC;
						font-size: 32upx;
					}

					span {
						background: linear-gradient(90deg, #48CFAD, #19A784);
						font-size: 20upx;
						color: #fff;
						padding: 4upx 10upx;
						margin-left: 10upx;
					}
				}

				p {

					color: #5E6694;
					font-size: 24upx;
					padding-bottom: 20upx;
					box-sizing: border-box;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				div {
					span {
						display: inline-block;
						padding: 4upx 10upx;
						box-sizing: border-box;
						background: #EEEFF5;
						border-radius: 4upx;
						font-size: 20upx;
						color: rgba(113, 128, 167, 1);
						margin-right: 8upx;
					}
				}
			}

			.list_conten_right {
				float: right;
				width: 30%;
				text-align: right;
				font-size: 24upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 23upx;

				span {

					position: relative;
					color: #F66759;
					display: block;

					&::before {
						content: '';
						position: absolute;
						left: -20upx;
						top: 50%;
						transform: translateY(-50%);
						width: 8upx;
						height: 8upx;
						border-radius: 50%;
						background: #F66759;
					}
				}

				.btn {
					margin-top: 20upx;
					background: linear-gradient(174deg, #61ABFF 0%, #3272FF 100%);
					border-radius: 200px;
				}
			}

		}
	}
</style>
