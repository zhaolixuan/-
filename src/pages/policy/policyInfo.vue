<template>
	<view class="content">
		<view class="content_view">
			<view class="titleName">
				<image src="../../static/images/company2x.png" class="company"></image>
				{{infoFrom.companyName}}
			</view>
			<uni-collapse>
				<!-- 投资信息 -->
				<uni-collapse-item>
					<template v-slot:title>
						<view class="collapseTitle">
							<image src="../../static/images/touzi.png" class="img"></image>
							<text class="title">投资信息</text>
						</view>
					</template>
					<view class="collapseContent">
						<picker :value="infoFrom.applyIndustry" :range="rangeData" range-key="name"
							@change="setPickerData($event,'applyIndustry',rangeData)">
							<van-cell  title-class='title_group' title="意向产业"
								:value="infoFrom.applyIndustry || '请选择'" />
						</picker>
						<van-field title-width='250upx' @change="setFromValue($event,'tzMoney','','tzMoney')"
							label-class='title_group' :value="infoFrom.tzMoney" label="投资资金(万元)" type='number'
							placeholder="请输入" input-align="right" />
						<van-field title-width='250upx' @change="setFromValue($event,'gdMoney')"
							label-class='title_group' :value="infoFrom.gdMoney" label="固定资产投资(万元)" type='number'
							placeholder="请输入" input-align="right" />
					</view>
				</uni-collapse-item>
				<!-- 基本信息 -->
				<uni-collapse-item>
					<template v-slot:title>
						<view class="collapseTitle">
							<image src="../../static/images/jiben.png" class="img"></image>
							<text class="title">基本信息</text>
						</view>
					</template>
					<view class="collapseContent">
						<van-cell  @click='showPCA' title-class='title_group' class="address" title="注册地"
							:value="infoFrom.regAddress || '请选择'" />
							<template v-if="infoFrom.regAddress" >
								<i class="iconfont icon-shanchu" @click="delAddress"></i>
							 </template>
						</van-cell>	  
						<pcaPicker ref="pcaPicker" :data='infoFrom' @confirm="getPCA"></pcaPicker>
						<van-field title-width='250upx' @change="setFromValue($event,'regMoney')"
							label-class='title_group' :value="infoFrom.regMoney" label="注册资金(万元)" type='number'
							placeholder="请输入" input-align="right" />

						<van-field title-width='250upx' @change="setFromValue($event,'regPayMoney')"
							label-class='title_group' :value="infoFrom.regPayMoney" label="实缴注册资金(万元)" placeholder="请输入"
							input-align="right" />

					</view>
				</uni-collapse-item>
				<!-- 规模信息 -->
				<uni-collapse-item>
					<template v-slot:title>
						<view class="collapseTitle">
							<image src="../../static/images/guimo.png" class="img"></image>
							<text class="title">规模信息</text>
						</view>
					</template>
					<view class="collapseContent">
						<picker :value="infoFrom.companySize" :range="companySizeData" range-key="name"
							@change="setPickerData($event,'companySize',companySizeData)">
							<van-cell  title-class='title_group' title="企业规模"
								:value="infoFrom.companySize || '请选择'" />
						</picker>


						<picker :value="infoFrom.devZb" :range="devZbData" range-key="name"
							@change="setPickerData($event,'devZb',devZbData)">
							<van-cell title-class='title_group' title="研发人员占比" :value="infoFrom.devZb || '请选择'" />
						</picker>

						<picker :value="infoFrom.bkZb" :range="bkZbData" range-key="name"
							@change="setPickerData($event,'bkZb',bkZbData)">
							<van-cell title-class='title_group' title="本科及以上人员占比" :value="infoFrom.bkZb || '请选择'" />
						</picker>
					</view>
				</uni-collapse-item>
				<!-- 财务信息 -->
				<uni-collapse-item>
					<template v-slot:title>
						<view class="collapseTitle">
							<image src="../../static/images/caiwu.png" class="img"></image>
							<text class="title">财务信息</text>
						</view>
					</template>
					<view class="collapseContent">
						<picker :value="infoFrom.businessIncome" :range="businessIncomeData" range-key="name"
							@change="setPickerData($event,'businessIncome',businessIncomeData)">
							<van-cell title-class='title_group' title="上年度营业收入"
								:value="infoFrom.businessIncome || '请选择'" />
						</picker>

						<picker :value="infoFrom.payIncome" :range="payIncomeData" range-key="name"
							@change="setPickerData($event,'payIncome',payIncomeData)">
							<van-cell title-class='title_group' title="上年度纳税总额" :value="infoFrom.payIncome || '请选择'" />
						</picker>

						<picker :value="infoFrom.devMoneyZb" :range="devMoneyZbData" range-key="name"
							@change="setPickerData($event,'devMoneyZb',devMoneyZbData)">
							<van-cell title-class='title_group' title="研发投入占销售占比"
								:value="infoFrom.devMoneyZb || '请选择'" />
						</picker>
					</view>
				</uni-collapse-item>
				<!-- 金融信息 -->
				<uni-collapse-item>
					<template v-slot:title>
						<view class="collapseTitle">
							<image src="../../static/images/jinrong.png" class="img"></image>
							<text class="title">金融信息</text>
						</view>
					</template>
					<view class="collapseContent">
						<picker :value="infoFrom.isFinance" :range="isData" range-key="name"
							@change="setPickerData($event,'isFinance',isData)">
							<van-cell title-class='title_group' title="是否有融资" :value="infoFrom.isFinance || '请选择'" />
						</picker>

						<picker :value="infoFrom.isList" :range="isData" range-key="name"
							@change="setPickerData($event,'isList',isData)">
							<van-cell title-class='title_group' title="是否上市" :value="infoFrom.isList || '请选择'" />
						</picker>
					</view>
				</uni-collapse-item>
				<!-- 人才信息 -->
				<uni-collapse-item>
					<template v-slot:title>
						<view class="collapseTitle">
							<image src="../../static/images/rencai.png" class="img"></image>
							<text class="title">人才信息</text>
						</view>
					</template>
					<view class="collapseContent">
						<view class="collapseContent_checkboxTitle">
							<text>拥有人才：</text>
							<uni-data-checkbox multiple v-model="infoFrom.personnel" :localdata="personnelData">
							</uni-data-checkbox>
						</view>

					</view>
				</uni-collapse-item>
				<!-- 资质信息 -->
				<uni-collapse-item>
					<template v-slot:title>
						<view class="collapseTitle">
							<image src="../../static/images/zizhi.png" class="img"></image>
							<text class="title">资质信息</text>
						</view>
					</template>
					<view class="collapseContent">
						<view class="collapseContent_checkboxTitle">
							<text class="required">企业类型：</text>
							<uni-data-checkbox multiple v-model="infoFrom.companyTypeTwo"
								:localdata="companyTypeTwoData">
							</uni-data-checkbox>
						</view>
						<view class="collapseContent_checkboxTitle">
							<text>研发机构认定：</text>
							<uni-data-checkbox multiple v-model="infoFrom.devOrg" :localdata="devOrgData">
							</uni-data-checkbox>
						</view>
						<view class="collapseContent_checkboxTitle">
							<text>品牌认定：</text>
							<uni-data-checkbox multiple v-model="infoFrom.brand" :localdata="brandData">
							</uni-data-checkbox>
						</view>
						<view class="collapseContent_checkboxTitle">
							<text>知识产权：</text>
							<uni-data-checkbox multiple v-model="infoFrom.zhiShi" :localdata="zhiShiData">
							</uni-data-checkbox>
						</view>
						<view class="collapseContent_checkboxTitle">
							<text>科技奖励：</text>
							<uni-data-checkbox multiple v-model="infoFrom.keJi" :localdata="keJiData">
							</uni-data-checkbox>
						</view>
						<view class="collapseContent_checkboxTitle">
							<text>称号认定：</text>
							<uni-data-checkbox multiple v-model="infoFrom.chenHao" :localdata="chenHaoData">
							</uni-data-checkbox>
						</view>
						<view class="collapseContent_checkboxTitle">
							<text>企业排名：</text>
							<uni-data-checkbox multiple v-model="infoFrom.companyPai" :localdata="companyPaiData">
							</uni-data-checkbox>
						</view>

					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<button class="btn" @click="submite">开始匹配</button>
	</view>
</template>
<script>
	import pcaPicker from '@/components/pcaPicker/pcaPicker.vue'
	import api from "@/api/policy";
	var graceChecker = require("@/static/js/graceChecker.js");
	export default {
		data() {
			return {
				infoFrom: {
					companyName: '企业名称', // 企业名称
					applyIndustry: '', //意向产业
					tzMoney: '', //投资金额
					gdMoney: '', //固定资产投资
					regAddress: '', // 注册地
					regMoney: '', //注册资金
					regPayMoney: '', //实缴注册资本
					companySize: '', //企业规模
					devZb: '', //研发人员占比
					bkZb: '', //本科及以上人员比
					businessIncome: '', //上年度营业收入
					payIncome: '', //上年度纳税总额
					devMoneyZb: '', //研发投入占销售占比
					isFinance: '', //是否有融资
					isList: '', //是否上市
					personnel: [], //拥有人才
					companyTypeTwo: [], //企业类型
					devOrg: [], //研发机构认定
					brand: [], //品牌认定
					zhiShi: [], //知识产权
					keJi: [], //科技奖励
					chenHao: [], //称号认定
					companyPai: [], //企业排名

					province: '',
					city: '',
					area: '',
				},
				rule: [{
						name: "applyIndustry",
						checkType: "notnull",
						errorMsg: "请选择意向产业"
					}, {
						name: "regAddress",
						checkType: "notnull",
						errorMsg: "请选择注册地"
					},
					{
						name: "companySize",
						checkType: "notnull",
						errorMsg: "请选择企业规模"
					}
				],
				rangeData: [{
						name: '农业'
					},
					{
						name: '林业'
					},
					{
						name: '畜牧业'
					},
					{
						name: '渔业'
					},
					{
						name: '采矿业'
					},
					{
						name: '制造业'
					},
					{
						name: '电力,热力,燃气及水生产和供应业'
					},
					{
						name: '建筑业'
					},
					{
						name: '交通运输,仓储和邮政业'
					},
					{
						name: '信息传输,软件和信息技术服务业'
					},
					{
						name: '批发和零售业'
					},
					{
						name: '住宿和餐饮业'
					},
					{
						name: '金融业'
					},
					{
						name: '房地产业'
					},
					{
						name: '租赁和商务服务业'
					},
					{
						name: '科学研究和技术服务业'
					},
					{
						name: '水利,环境和公共设施管理业'
					},
					{
						name: '居民服务,修理和其他服务业'
					},
					{
						name: '教育'
					},
					{
						name: '卫生和社会工作'
					},
					{
						name: '公共管理,社会保障和社会组织'
					},
					{
						name: '国际组织'
					}
				],
				companySizeData: [{
						name: '微型企业'
					},
					{
						name: '小型企业'
					},
					{
						name: '中型企业'
					},
					{
						name: '大型企业'
					},
				],
				devZbData: [{
						name: '10%以下'
					},
					{
						name: '10%以上'
					},
				],
				bkZbData: [{
						name: '50%以下'
					},
					{
						name: '50%~80%'
					},
					{
						name: '80%以上'
					}
				],
				businessIncomeData: [{
						name: '100万以下'
					},
					{
						name: '100~1000万'
					},
					{
						name: '1000万~1亿元'
					},
					{
						name: '1亿以上'
					},
				],
				payIncomeData: [{
						name: '100万以下'
					},
					{
						name: '100~500万'
					},
					{
						name: '500万~3000万元'
					},
					{
						name: '3000万以上'
					}
				],
				devMoneyZbData: [{
						name: '3%以下'
					},
					{
						name: '3%~5%'
					},
					{
						name: '5%以上'
					}
				],
				isData: [{
						name: '是'
					},
					{
						name: '否'
					}
				],
				industryData: [{
						name: '再生资源产业'
					},
					{
						name: '高端金属新材料产业',
					},
					{
						name: '建筑材料产业',
					},
					{
						name: '食品医药产业',
					},
					{
						name: '电子信息产业',
					},
					{
						name: '文化康养产业',
					},
					{
						name: '数字经济产业',
					},
				],
				personnelData: [{
						text: '领军人才',
						value: '领军人才'
					},
					{
						text: '正高级专业技术职称',
						value: '正高级专业技术职称'
					},
					{
						text: '副高级专业技术职称',
						value: '副高级专业技术职称'
					},
					{
						text: '高层次管理人才',
						value: '高层次管理人才'
					},
				],
				companyTypeTwoData: [{
						text: '高新技术企业',
						value: '高新技术企业'
					},
					{
						text: '外资企业',
						value: '外资企业'
					},
					{
						text: '中小企业',
						value: '中小企业'
					},
					{
						text: '民营企业',
						value: '民营企业'
					},
					{
						text: '国有企业',
						value: '国有企业'
					},
					{
						text: '事业单位',
						value: '事业单位'
					},
				],
				devOrgData: [{
						text: '重点实验室工程研究中心',
						value: '重点实验室工程研究中心'
					},
					{
						text: '企业技术中心',
						value: '企业技术中心'
					},
					{
						text: '工业设计中心',
						value: '工业设计中心'
					},
					{
						text: '制造业创新中心',
						value: '制造业创新中心'
					},
					{
						text: '产业创新中心',
						value: '产业创新中心'
					},
				],
				brandData: [{
						text: '驰名商标',
						value: '驰名商标'
					},
					{
						text: '著名商标',
						value: '著名商标'
					},
					{
						text: '名牌产品',
						value: '名牌产品'
					},
					{
						text: '地理标志',
						value: '地理标志'
					},
					{
						text: '商标',
						value: '商标'
					},
					{
						text: '中华老字号',
						value: '中华老字号'
					},
					{
						text: '国际商标',
						value: '国际商标'
					},
				],
				zhiShiData: [{
						text: '中国外观设计',
						value: '中国外观设计'
					},
					{
						text: '授权发明专利',
						value: '授权发明专利'
					},
					{
						text: '中国专利金奖',
						value: '中国专利金奖'
					},

				],
				keJiData: [{
						text: '国家自然科学奖',
						value: '国家自然科学奖'
					},
					{
						text: '科学技术进步奖',
						value: '科学技术进步奖'
					},
					{
						text: '技术发明奖',
						value: '技术发明奖'
					},

				],
				chenHaoData: [{
						text: '高新技术企业',
						value: '高新技术企业'
					},
					{
						text: '技术先进型服务',
						value: '技术先进型服务'
					},
					{
						text: '企业知识产权示范企业',
						value: '企业知识产权示范企业'
					},
					{
						text: '独角兽企业',
						value: '独角兽企业'
					},
					{
						text: '瞪羚企业',
						value: '瞪羚企业'
					},
					{
						text: '科技型中小微企业',
						value: '科技型中小微企业'
					},
					{
						text: '领军企业',
						value: '领军企业'
					},
					{
						text: '小巨人企业',
						value: '小巨人企业'
					},
					{
						text: '孵化器',
						value: '孵化器'
					},
				],
				companyPaiData: [{
						text: '中国500强',
						value: '中国500强'
					},
					{
						text: '世界500强',
						value: '世界500强'
					},

				],

			}
		},
		components: {
			pcaPicker
		},
		onLoad(option) {
			option.name ? this.infoFrom.companyName = option.name : null
		},
		methods: {
			submite() {
				let query = {
					...this.infoFrom,
					personnel: this.infoFrom.personnel.join(','), //拥有人才
					companyTypeTwo: this.infoFrom.companyTypeTwo.join(','), //企业类型
					devOrg: this.infoFrom.devOrg.join(','), //研发机构认定
					brand: this.infoFrom.brand.join(','), //品牌认定
					zhiShi: this.infoFrom.zhiShi.join(','), //知识产权
					keJi: this.infoFrom.keJi.join(','), //科技奖励
					chenHao: this.infoFrom.chenHao.join(','), //称号认定
					companyPai: this.infoFrom.companyPai.join(','), //企业排名
				}
				wx.navigateTo({
					url: '/pages/policy/policyMatch?search='+JSON.stringify(query)
				})
				
				// if (graceChecker.check(this.infoFrom, this.rule)) {
				// 	if (!this.infoFrom.companyTypeTwo.length) {
				// 		return uni.showToast({
				// 			title: '请选择企业类型',
				// 			icon: "none"
				// 		});
				// 	}
					
				// } else {
				// 	uni.showToast({
				// 		title: graceChecker.error,
				// 		icon: "none"
				// 	});
				// }

			},
			setPickerData(e, name, data) {
				this.infoFrom[name] = data[e.detail.value].name
			},
			showPCA(e) {
				this.$refs.pcaPicker.show();
			},
			getPCA(data) {
				// Object.assign(this.infoFrom, data)
				this.infoFrom.regAddress = data.province+','+ data.city +','+ data.area
				this.infoFrom.province = data.province
				this.infoFrom.city = data.city
				this.infoFrom.area = data.area
			},
			delAddress(){
				this.infoFrom.regAddress = ''
				this.infoFrom.province = ''
				this.infoFrom.city = ''
				this.infoFrom.area = ''
			},
			change(data) {
				this.infoFrom.industry = data.data.join('')
			},

			setFromValue(event, value) {
				if (event.detail.value || event.detail.value == '') {
					this.infoFrom[value] = event.detail.value
				} else {
					this.infoFrom[value] = event.detail
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.content{
		padding-bottom: 100upx;
	}
	.btn {
		height: 80upx;
		line-height: 80upx;
		background: linear-gradient(225deg, #3260FF 0%, #1890FF 100%);
		box-shadow: 0px 4px 10px 0px rgba(20, 64, 205, 0.3);
		border-radius: 0upx;
		font-size: 28upx;
		color: #fff;
		position: fixed;
		width: 100%;
		bottom: 0rpx;
		margin: 0 auto;
		text-align: center;
	}
	.content_view {
		margin: 0 30upx;

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

			.company {
				height: 60upx;
				width: 60upx;
				margin: 0 30upx;
			}

			.flexBox {
				display: flex;
				align-items: center;
				width: 90%;
				justify-content: space-between;
			}

		}

		.collapseTitle {
			display: flex;
			align-items: center;
			padding: 20upx 0;

			.img {
				width: 76upx;
				height: 76upx;
				margin-right: 28upx;
			}

			.title {
				font-size: 28upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
			}
		}

		.collapseContent {
			.collapseContent_checkboxTitle {
				padding: 10px 16px;
			}
			.icon-shanchu{
				position: absolute;
				right: -19upx;
				top: 7upx;
				padding: 20upx;
			}

			// height: 100upx;
			// display: flex;

		}
	}

	// .required {
	// 	&::before {
	// 		color: #ee0a24;
	// 		content: "*";
	// 		font-size: 14px;
	// 		left: 8px;
	// 		position: absolute;
	// 		margin-top: 5px;
	// 	}
	// }
	.address {
		/deep/ .van-cell__title, /deep/ .van-cell__value{
			flex:auto;
		}
	}

	

	/deep/ .van-field__label {
		white-space: nowrap;
	}
</style>
