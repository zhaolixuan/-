<template>
	<view class="home-wrapper">
		<div class="map_box">
			<map style="width: 100%; height: 1332upx;" :latitude="latitude" :longitude="longitude" :markers="markers"
				:scale="scale" @markertap="getPoint">
			</map>
			<div class="float_box">
				<ul>
					<li v-for="(item,index) in classify" :key="index" @click="getDetail(index,item)">
						<p class="img"><img :src="item.icon" alt=""></p>
						<p class="word" :class="item.isShow ? 'active' : 'noactive'">{{item.name}}</p>
					</li>
				</ul>
			</div>
			<div class="content"  v-show="show" :class="isScrollTop ? 'diffContent' : 'content'">
				<view @click.stop="scrollTop">
					<view class="slot" v-if="!isScrollTop"><text class="iconfont icon-shouqi-"></text> 展开</view>
					<view class="shouqi" v-else><text class="iconfont icon-zhankai"></text> 收起</view>
				</view>
				<dl>
					<dt>
						<img src="../../static/images/industry.png" alt="">
					</dt>
					<dd>
						<p class="title">
							工业用地
						</p>
						<p class="p">
							挂牌价: {{parkObj.gyyd.gpj}}
						</p>
						<p class="p">
							办证费用: {{parkObj.gyyd.bzfy}}
						</p>
					</dd>
				</dl>
				<dl>
					<dt>
						<img src="../../static/images/rent.png" alt="">
					</dt>
					<dd>
						<p class="title">
							标准厂房租金
						</p>
						<p class="p">
							单层: {{parkObj.bzcfyj.dc}}
						</p>
						<p class="p">
							多层: {{parkObj.bzcfyj.yc}}
						</p>
					</dd>
				</dl>
				<dl>
					<dt>
						<img src="../../static/images/consumption.png" alt="">
					</dt>
					<dd>
						<p class="title">
							工商业及其他用电
						</p>
						<p class="p">
							最大需量: {{parkObj.gsyjqtyd.zdxl}}
						</p>
						<p class="p">
							变压器容量: {{parkObj.gsyjqtyd.byqrl}}
						</p>
						<!-- 下拉框 -->
						<picker class="type" mode="selector" @change="bindPickerChange" :range="parkObj.gsyjqtyd.dy"
							:index="index" :range-key="'title'">
							<view class="selectorTitle">{{parkObj.gsyjqtyd.dy[index].title}} <text
									class="iconfont icon-zhankai" style="margin-left:30upx;"></text></view>
							<p class="p" v-if="parkObj.gsyjqtyd.dy[index].title =='220千伏及以上'">
								<view class="view">峰段: {{parkObj.gsyjqtyd.dy[index].child.fd}}</view>
								<view class="view">平段: {{parkObj.gsyjqtyd.dy[index].child.pd}}</view>
								<view class="view">谷段: {{parkObj.gsyjqtyd.dy[index].child.gd}}</view>
							</p>
							<p class="p" v-if="parkObj.gsyjqtyd.dy[index].title =='220千伏及以下'">
								<view class="view">峰段: {{parkObj.gsyjqtyd.dy[index].child.fd}}</view>
								<view class="view">平段: {{parkObj.gsyjqtyd.dy[index].child.pd}}</view>
								<view class="view">谷段: {{parkObj.gsyjqtyd.dy[index].child.gd}}</view>
							</p>
						</picker>
					</dd>
				</dl>
				<dl>
					<dt>
						<img src="../../static/images/gas.png" alt="">
					</dt>
					<dd>
						<p class="title">
							燃气价格
						</p>
						<p class="p">
							商业: {{parkObj.rqjg.sy}}
						</p>
						<p class="p">
							工业: {{parkObj.rqjg.gy}}
						</p>
					</dd>
				</dl>
				<dl>
					<dt>
						<img src="../../static/images/money.png" alt="">
					</dt>
					<dd>
						<p class="title">
							最低工资标准
						</p>
						<p class="p">
							地区类别: {{parkObj.zdgzbz.dqlb}}
						</p>
						<p class="p">
							金额: {{parkObj.zdgzbz.je}}
						</p>
					</dd>
				</dl>
				<dl>
					<dt>
						<img src="../../static/images/insurance.png" alt="">
					</dt>
					<dd>
						<p class="title">
							社会保险费用
						</p>
						<p class="p">
							养老保险: {{parkObj.shbxfy.ylbx}}
						</p>
						<p class="p">
							失业保险: {{parkObj.shbxfy.sybx}}
						</p>
						<p class="p">
							工伤保险: {{parkObj.shbxfy.gsbx}}
						</p>
					</dd>
				</dl>
				<dl>
					<dt>
						<img src="../../static/images/water.png" alt="">
					</dt>
					<dd>
						<p class="title">
							水价
						</p>
						<p class="p">
							非居民生活用水: {{parkObj.sj.fjmshys}}
						</p>
						<p class="p">
							污水处理费: {{parkObj.sj.wsclf}}
						</p>
						<p class="p">
							水资源费: {{parkObj.sj.szyf}}
						</p>
					</dd>
				</dl>
				<dl>
					<dt>
						<img src="../../static/images/policy.png" alt="">
					</dt>
					<dd>
						<p class="title">
							房价
						</p>
						<p class="p">
							{{parkObj.fj}}
						</p>
					</dd>
				</dl>
			</div>
		</div>
	</view>
</template>

<script>
	import "../../static/css/iconfont.css"
	import {classify,parkData} from "./wuzhou-parkdata.js";
	export default {
		name: "productionPage",
		components: {

		},
		data() {
			return {
				classify: '',
				parkData: '',
				parkObj:'',
				scale: 10,
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 23.476962, // 维度
				longitude: 111.279115, //经度
				markers: [],
				show: false,
				isScrollTop: false,
				index: 0,
			}

		},
		mounted() {},
		onShow() {

		},
		created() {
			this.classify = classify;
			this.parkData = parkData;
		},
		onLoad(option) {},
		onShow() {
			var that = this;
			for (var i = 0; i < that.parkData.length; i++) {
				let arr = [{
					id: that.parkData[i].id,
					longitude: that.parkData[i].lon,
					latitude: that.parkData[i].lat,
					name: that.parkData[i].name,
					iconPath: that.parkData[i].icon,
				}];
				let markers = []
				for (var j = 0; j < arr.length; j++) {
					markers = markers.concat({
						id: arr[j].id,
						latitude: arr[j].latitude, //纬度
						longitude: arr[j].longitude, //经度
						iconPath: arr[j].iconPath,
						type:'park',
						width: 34,
						height: 51,
						callout: { //自定义标记点上方的气泡窗口 点击有效
							content: arr[j].name, //文本
							color: '#ffffff', //文字颜色
							padding: 8,
							fontSize: 12, //文本大小
							borderRadius: 15, //边框圆角
							bgColor: '#4D6DFD', //背景颜色
							display: 'BYCLICK', //点击显示
						},
					})
					that.markers.push(markers[j]);
				}
			}
		},
		methods: {
			// 点击园区标记点展示下方list
			getPoint(e) {
				if(e.detail.markerId < this.parkData.length){
					let parkArr  = this.parkData.filter((i) => {
					  return e.detail.markerId == i.id;
					});
					this.parkObj = parkArr[0];
					this.show = true;
					this.isScrollTop = false;
				}else{
					this.parkObj = '';
					this.show = false;
					this.isScrollTop = false;
				}
			},
			// 点击右上角图标打点
			getDetail(index, item) {
				var that = this;
				item.isShow = !item.isShow;
				this.show = false;
				if (item.isShow) {
					for (var i = 0; i < that.classify.length; i++) {
						if (item.name == that.classify[i].name) {
							for (var e = 0; e < that.classify[i].list.length; e++) {
								let newArr = [{
									id: that.classify[i].id, // 避免有重复的id
									longitude: that.classify[i].list[e].lon,
									latitude: that.classify[i].list[e].lat,
									name: that.classify[i].list[e].name,
									iconPath: that.classify[i].markIcon,
								}];
								let markers = []
								for (var j = 0; j < newArr.length; j++) {
									markers = markers.concat({
										id: newArr[j].id,
										latitude: newArr[j].latitude, //纬度
										longitude: newArr[j].longitude, //经度
										iconPath: newArr[j].iconPath,
										width: 70,
										height: 75,
										callout: { //自定义标记点上方的气泡窗口 点击有效
											content: newArr[j].name, //文本
											color: '#ffffff', //文字颜色
											padding: 8,
											fontSize: 12, //文本大小
											borderRadius: 15, //边框圆角
											bgColor: '#4D6DFD', //背景颜色
											display: 'BYCLICK', //点击显示
										},
									})
									that.markers.push(markers[j]);
								}
							}
						}
					}

				} else {
					var arr = []
					for (var i = 0; i < that.markers.length; i++) {
						if (that.markers[i].id != item.id) {
							arr.push(that.markers[i]);
						}
					}
					that.markers = arr;
				}

			},
			// 点击列表置顶
			scrollTop() {
				this.isScrollTop = !this.isScrollTop;
			},
			// select 切换
			bindPickerChange(e) {
				this.index = e.target.value;
			},
		}
	};
</script>

<style lang="scss" scoped>
	.home-wrapper {
		.map_box {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 9;

			.float_box {
				position: fixed;
				right: 30upx;
				top: 40upx;
				width: 110upx;
				background: #FFFFFF;
				box-shadow: 0px 4upx 6upx 0px rgba(184, 180, 180, 0.5);
				border-radius: 18upx;
				z-index: 99;

				ul li {
					padding: 12upx 32upx;
					box-sizing: border-box;
					text-align: center;

					.img {
						width: 48upx;
						height: 48upx;

						img {
							width: 48upx;
							height: 48upx;
						}
					}

					.word {
						margin-top: 10upx;
						font-size: 20upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #333333;
					}

					.active {
						color: #5983F0;
					}

					.noactive {
						color: #333333;
					}
				}
			}

			.content {
				position: fixed;
				z-index: 999;
				width: 100%;
				bottom: 0upx;
				height: 512upx;
				overflow-y: scroll;
				background: #FFFFFF;
				padding: 40upx 48upx 64upx;
				box-sizing: border-box;
				box-shadow: 0px -20upx 40upx 0px rgba(0, 0, 0, 0.05), 0px 10upx 20upx 0px rgba(0, 0, 0, 0.05);
				border-radius: 56upx 56upx 0px 0px;

				.slot {
					width: 100%;
					text-align: center;
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					padding-bottom: 30upx;
					color: #5983F0;
					box-sizing: border-box;
				}

				.shouqi {
					width: 100%;
					text-align: center;
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					padding-bottom: 30upx;
					color: #5983F0;
					box-sizing: border-box;
				}

				.iconfont {
					margin-right: 10upx;
				}

				dl {
					display: flex;
					align-items: center;
					background: #FFFFFF;
					box-shadow: 0px 10upx 40upx 0px rgba(0, 0, 0, 0.08);
					border-radius: 40upx;
					padding: 22upx 54upx;
					box-sizing: border-box;
					margin-bottom: 20upx;

					dt {
						img {
							width: 60upx;
							height: 62upx;
						}
					}

					dd {
						border-left: 2upx solid rgba(151, 151, 151, .4);
						width: 100%;
						margin-left: 26upx;
						padding-left: 26upx;
						box-sizing: border-box;

						.title {
							font-size: 24upx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #5983F0;
							line-height: 44upx;
						}

						.p {
							font-size: 24upx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #333333;
							line-height: 44upx;

							.view {
								font-size: 24upx;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #333333;
								line-height: 44upx;
							}
						}

						.selectorTitle {
							font-size: 30upx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #333333;
							line-height: 44upx;
						}
					}
				}
			}

			.diffContent {
				position: fixed;
				z-index: 999;
				top: 0upx;
				width: 100%;
				height: 100%;
				overflow-y: scroll;
				background: #FFFFFF;
				padding: 40upx 48upx 64upx;
				box-sizing: border-box;
				box-shadow: 0px -20upx 40upx 0px rgba(0, 0, 0, 0.05), 0px 10upx 20upx 0px rgba(0, 0, 0, 0.05);
				border-radius: 0upx;

				.slot {
					width: 100%;
					text-align: center;
					color: #5983F0;
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					padding-bottom: 30upx;
					box-sizing: border-box;
				}

				.shouqi {
					width: 100%;
					text-align: center;
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					padding-bottom: 30upx;
					color: #5983F0;
					box-sizing: border-box;
				}

				.iconfont {
					margin-right: 10upx;
				}

				dl {
					display: flex;
					align-items: center;
					background: #FFFFFF;
					box-shadow: 0px 10upx 40upx 0px rgba(0, 0, 0, 0.08);
					border-radius: 40upx;
					padding: 22upx 54upx;
					box-sizing: border-box;
					margin-bottom: 20upx;

					dt {
						img {
							width: 60upx;
							height: 62upx;
						}
					}

					dd {
						border-left: 2upx solid rgba(151, 151, 151, .4);
						width: 100%;
						margin-left: 26upx;
						padding-left: 26upx;
						box-sizing: border-box;

						.title {
							font-size: 24upx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #5983F0;
							line-height: 44upx;
						}

						.p {
							font-size: 24upx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #333333;
							line-height: 44upx;
						}
					}
				}
			}
		}
	}
</style>
