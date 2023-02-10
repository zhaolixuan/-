<template>
	<scroll-view scroll-y="true">
		<view class="nav">
			<view class="from_nav">

				<!-- 拜访成立弹窗 -->
				<van-popup :show="showPicker" position="bottom">
					<van-datetime-picker type="datetime" @confirm="onConfirm" @cancel="setShowPicker" />
				</van-popup>
				<!-- 拜访地点弹窗 -->
				<van-action-sheet :show="showSheet" :actions="actions" cancel-text="取消" close-on-click-action
					@select="onSelect" @cancel="setShowSheet" />

				<form @submit="submite">
					<van-cell title-class='form_title' title="小分队情况" />

					<van-cell-group>

						<van-cell required title-class='title_group' title="对别" @click="setShowSheet('pairPin')"
							:value="form.pairPin || '请选择'" />

						<!-- <van-field required @change="setFromValue($event,'pairPin')" label-class='title_group'
							:value="form.pairPin" label="对别" placeholder="请输入" input-align="right" /> -->

						<van-field required @change="setFromValue($event,'captain')" label-class='title_group'
							:value="form.captain" label="队长" placeholder="请输入" input-align="right" />

						<van-field required @change="setFromValue($event,'liaisonMan')" label-class='title_group'
							:value="form.liaisonMan" label="小分队联络员" placeholder="请输入" input-align="right" />

						<van-field required @change="setFromValue($event,'liaisonManContact')" label-class='title_group'
							:value="form.liaisonManContact" label="小分队联络员联系方式" placeholder="请输入" input-align="right" />

						<van-cell required title-class='title_group' title="驻点区域" @click="setShowSheet('arrestPoint')"
							:value="form.arrestPoint || '请选择'" />

						<van-cell title-class='form_title' title="拜访信息" />


						<popup>
							<uni-datetime-picker v-model="form.seeTime" type='datetime'>
								<van-cell title-class='title_group' title="拜访时间" :value="form.seeTime || '请选择'" />
							</uni-datetime-picker>
						</popup>

						<view class="place noborder">
							<text class="title_group required">拜访地点</text>
							<text class="rightText" @click="selectPlace">
								<text v-if="!form.seeSite" class="iconfont icon-dingweixiao">选择地址</text>
								<text v-else>{{form.seeSite}}</text>
							</text>
						</view>

						<view class="place">
							<input class="inp" @change="setFromValue($event,'detailedAddress')" placeholder="请填写详细地址哦"
								type="text" :value="form.detailedAddress" />
						</view>


						<van-field required @change="setFromValue($event,'projectName')" label-class='title_group'
							:value="form.projectName" label="项目名称" placeholder="请输入" input-align="right" />

						<text class='tishi'>注：xx生产建设项目（拜访企业）/拓展招</text>

						<van-cell required title-class='title_group' title="是否重点跟踪项目"
							@click="setShowSheet('isEmphasis')" :value="form.isEmphasis || '请选择'" />

						<van-field required @change="setFromValue($event,'enterpriseName')" label-class='title_group'
							:value="form.enterpriseName" label="企业名称" placeholder="请输入" input-align="right" />

						<van-cell required title-class='title_group' title="是否制造业企业" @click="setShowSheet('isMake')"
							:value="form.isMake || '请选择'" />

						<van-cell required title-class='title_group' title="企业类型"
							@click="setShowSheet('enterpriseType')" :value="form.enterpriseType || '请选择'" />

						<van-field required @change="setFromValue($event,'investOrigin')" label-class='title_group'
							:value="form.investOrigin" label="投资企业来源地" placeholder="请输入" input-align="right" />
						<van-field required @change="setFromValue($event,'investSum')" label-class='title_group'
							:value="form.investSum" label="投资额（亿元）" placeholder="请输入" type="int" input-align="right" />
						<van-field required @change="setFromValue($event,'siteArea')" label-class='title_group'
							:value="form.siteArea" label="用地面积（亩）" placeholder="请输入" type="int" input-align="right" />
						<van-field required @change="setFromValue($event,'predictValue')" label-class='title_group'
							:value="form.predictValue" label="预计产值（亿元）" placeholder="请输入" type="int"
							input-align="right" />
						<van-field required @change="setFromValue($event,'recommendInto')" label-class='title_group'
							:value="form.recommendInto" label="拟推荐设区市" placeholder="请输入" input-align="right" />

						<view class="textareaBox">
							<p class='title_group required'>项目洽谈情况</p>
							<textarea @blur="setFromValue($event,'projectNegotiation')"
								placeholder="请填写企业基本信息，了解企业外迁或意向扩产能、产业转移等投资意愿情况。"
								style=" font-size: 14px; line-height: 24px;" :value='form.projectNegotiation'
								auto-height />
						</view>

						<view class="textareaBox">
							<p class='title_group required'>项目简介</p>
							<textarea @blur="setFromValue($event,'projectBrief')"
								placeholder="请填写项目主要建设内容、年产值、用工及纳税等基本情况。" style=" font-size: 14px; line-height: 24px;"
								:value='form.projectBrief' auto-height />
						</view>


						<van-cell required title-class='title_group' title="企业是否有外迁打算"
							@click="setShowSheet('isMigrate')" :value="form.isMigrate || '请选择'" />

						<view class="textareaBox">
							<p class='title_group required'>企业落户基本条件</p>
							<textarea @blur="setFromValue($event,'settlePostulate')" placeholder="请填写税收优惠、设备补贴及装修补贴等。"
								style=" font-size: 14px; line-height: 24px;" :value='form.settlePostulate'
								auto-height />
						</view>

						<van-field required @change="setFromValue($event,'projectBoostCase')" label-class='title_group'
							:value="form.projectBoostCase" label="项目推进情况" placeholder="请输入" input-align="right" />
						<van-field required @change="setFromValue($event,'businessAddress')" label-class='title_group'
							:value="form.businessAddress" label="企业地址" placeholder="请输入" input-align="right" />
						<van-field required @change="setFromValue($event,'businessContacts')" label-class='title_group'
							:value="form.businessContacts" label="企业联系人" placeholder="请输入" input-align="right" />
						<van-field required @change="setFromValue($event,'referrals')" label-class='title_group'
							:value="form.referrals" label="推荐人" placeholder="请输入" input-align="right" />
						<van-field required @change="setFromValue($event,'arrestPointStaff')" label-class='title_group'
							:value="form.arrestPointStaff" label="驻点人员" placeholder="请输入" input-align="right" />


						<view class="textareaBox">
							<p class='title_group required'>下一步工作计划</p>
							<textarea @blur="setFromValue($event,'nextWorkPlan')" placeholder="请填写。"
								style=" font-size: 14px; line-height: 24px;" :value='form.nextWorkPlan' auto-height />
						</view>


						<view class="textareaBox">
							<p class='title_group'>备注</p>
							<textarea @blur="setFromValue($event,'remarks')" placeholder="对接跟踪报备自治区领导洽谈意向项目的，请注明。"
								style=" font-size: 14px; line-height: 24px;" :value='form.remarks' auto-height />
						</view>

						<van-cell required title-class='title_group' title="是否转为商机" @click="setShowSheet('isBusiness')"
							:value="form.isBusiness || '请选择'" />


						<view class="uploadBox">
							<p class='title_group required'>现场照片</p>
							<view class="edit_img">
								<ul class="edit_list" >
									<li v-for="(item,index) in imgArrUrl" :key="index">
										<text style="background: #FFFFFF;" class="iconfont icon-shanchu"
											@click="deteleImg(index)"></text>
										<image :src="item.url" mode="aspectFill" />
									</li>
									<li class="up_img" @click="imageUpload" v-if="imgArrUrl.length < 5">
										<text class="iconfont icon-icon_xiangji_xian"></text>
										<p style='justify-content: center;'>上传图片</p>
									</li>
								</ul>
								
							</view>
							<view class="limit">最多5张照片</view>

						</view>
					</van-cell-group>
				</form>
			</view>

		</view>
		<view class="btnBox">
			<button class='blackbtn btn' @click="goBlack" type="primary">取消</button>
			<button class='btn' @click="submite" type="primary">保存</button>
		</view>
	</scroll-view>
</template>

<script>
	import {
		getNowFormatTime
	} from "@/utils/time.js";
	import api from "@/api/visit.js";
	import {
		config
	} from '@/api/config'
	var graceChecker = require("@/static/js/graceChecker.js");
	export default {
		data() {
			return {
				showPicker: false,
				showSheet: false,
				actions: [],
				imgArrUrl: [],


				form: {
					//对别
					pairPin: '',
					//队长
					captain: '',
					//小分队联络员
					liaisonMan: '',
					//小分队联络员联系方式
					liaisonManContact: '',
					//驻点区域
					arrestPoint: '',
					//拜访时间
					seeTime: '',
					//拜访地点
					seeSite: '',
					//详细地址
					detailedAddress: '',
					//项目名称
					projectName: '',
					//是否重点跟踪项目
					isEmphasis: '',
					//企业名称
					enterpriseName: '',
					//是否制造业企业
					isMake: '',
					//企业类型
					enterpriseType: '',
					//投资企业来源地
					investOrigin: '',
					//投资额
					investSum: '',
					//用地面积
					siteArea: '',
					//预计产值
					predictValue: '',
					//拟推荐设区市
					recommendInto: '',
					//项目洽谈情况
					projectNegotiation: '',
					//项目简介
					projectBrief: '',
					// 企业是否有外迁打算
					isMigrate: '',
					// 企业落户基本条件
					settlePostulate: '',
					//项目推进情况
					projectBoostCase: '',
					//企业地址
					businessAddress: '',
					//企业联系人
					businessContacts: '',
					//推荐人
					referrals: '',
					//驻点人员
					arrestPointStaff: '',
					//下一步工作计划
					nextWorkPlan: '',
					//备注
					remarks: '',
					// 是否转为商机
					isBusiness: '',

				},
				onSelectName: '',
				id: undefined,
				rule: [{
						name: "pairPin",
						checkType: "notnull",
						errorMsg: "请填写对别"
					},
					{
						name: "captain",
						checkType: "notnull",
						errorMsg: "请填写队长"
					},

					{
						name: "liaisonMan",
						checkType: "notnull",
						errorMsg: "请填写小分队联络员"
					},

					{
						name: "liaisonManContact",
						checkType: "notnull",
						errorMsg: "请填写小分队联络员联系方式"
					},
					{
						name: "liaisonManContact",
						checkType: "phoneno",
						errorMsg: "联系方式格式不正确"
					},

					{
						name: "arrestPoint",
						checkType: "notnull",
						errorMsg: "请选择驻点区域"
					},

					{
						name: "seeTime",
						checkType: "notnull",
						errorMsg: "请选择拜访时间"
					},

					{
						name: "detailedAddress",
						checkType: "notnull",
						errorMsg: "请填写拜访地点"
					},



					{
						name: "projectName",
						checkType: "notnull",
						errorMsg: "请填写项目名称"
					},

					{
						name: "isEmphasis",
						checkType: "notnull",
						errorMsg: "请选择是否重点跟踪项目"
					},
					{
						name: "enterpriseName",
						checkType: "notnull",
						errorMsg: "请填写企业名称"
					},
					{
						name: "isMake",
						checkType: "notnull",
						errorMsg: "请选择是否制造业企业"
					},


					{
						name: "enterpriseType",
						checkType: "notnull",
						errorMsg: "请选择企业类型"
					},
					{
						name: "investOrigin",
						checkType: "notnull",
						errorMsg: "请填写投资企业来源地"
					},
					{
						name: "investSum",
						checkType: "notnull",
						errorMsg: "请填写投资额"
					},
					{
						name: "investSum",
						checkType: "reg",
						checkRule: /^[1-9]{1}[0-9]{0,7}(.[0-9]{1,8})?$/,
						errorMsg: "投资额输入格式有误，请输入数字，且整数最多8位，小数点后最多8位"
					},
					{
						name: "siteArea",
						checkType: "notnull",
						errorMsg: "请填写用地面积"
					},
					{
						name: "siteArea",
						checkType: "reg",
						checkRule: /^[1-9]{1}[0-9]{0,7}(.[0-9]{1,8})?$/,
						errorMsg: "用地面积输入格式有误，请输入数字，且整数最多8位，小数点后最多8位"
					},
					{
						name: "predictValue",
						checkType: "notnull",
						errorMsg: "请填写预计产值"
					},
					{
						name: "predictValue",
						checkType: "reg",
						checkRule: /^[1-9]{1}[0-9]{0,7}(.[0-9]{1,8})?$/,
						errorMsg: "预计产值输入格式有误，请输入数字，且整数最多8位，小数点后最多8位"
					},

					{
						name: "recommendInto",
						checkType: "notnull",
						errorMsg: "请填写拟推荐设区市"
					},
					{
						name: "projectNegotiation",
						checkType: "notnull",
						errorMsg: "请填写项目洽谈情况"
					},
					{
						name: "projectBrief",
						checkType: "notnull",
						errorMsg: "请填写项目简介"
					},
					{
						name: "isMigrate",
						checkType: "notnull",
						errorMsg: "请选择企业是否有外迁打算"
					},
					{
						name: "settlePostulate",
						checkType: "notnull",
						errorMsg: "请填写企业落户基本条件"
					},
					{
						name: "projectBoostCase",
						checkType: "notnull",
						errorMsg: "请填写项目推进情况"
					},
					{
						name: "businessAddress",
						checkType: "notnull",
						errorMsg: "请填写企业地址"
					},
					{
						name: "businessContacts",
						checkType: "notnull",
						errorMsg: "请填写企业联系人"
					},
					{
						name: "referrals",
						checkType: "notnull",
						errorMsg: "请填写推荐人"
					},
					{
						name: "arrestPointStaff",
						checkType: "notnull",
						errorMsg: "请填写驻点人员"
					},
					{
						name: "nextWorkPlan",
						checkType: "notnull",
						errorMsg: "请填写下一步工作计划"
					},
					{
						name: "isBusiness",
						checkType: "notnull",
						errorMsg: "请选择是否转为商机"
					},
				],

			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id
				this.getVisitData()
			} else {
				this.getSquad()
			}

		},
		methods: {
			validatorMessage(val) {
				const pwdRegex = new RegExp('/^\d{1,8}$|^\d{1,8}[.]\d{1,8}$/')
				if (!pwdRegex.test(value)) {
					callback(new Error('输入格式有误，整数位最多8位，小数点后最多8位'))
				}
				callback()
			},
			getVisitData() {
				api.getVisitData({
					id: this.id
				}).then(res => {
					this.form.captain = res.captain
					this.form.liaisonMan = res.liaisonMan
					this.form.liaisonManContact = res.liaisonManContact
					this.form.pairPin = res.pairPin
					this.form.zsSquadId = res.zsSquadId
					//驻点区域
					this.form.arrestPoint = res.arrestPoint
					//拜访时间
					this.form.seeTime = getNowFormatTime(new Date(res.seeTime))
					//拜访地点
					// this.form.seeSite = res.seeSite
					//详情地址
					this.form.detailedAddress = res.seeSite

					//项目名称
					this.form.projectName = res.projectName
					//是否重点跟踪项目
					this.form.isEmphasis = res.isEmphasis ? '是' : '否'

					//企业名称
					this.form.enterpriseName = res.enterpriseName
					//是否制造业企业
					this.form.isMake = res.isMake ? '是' : '否'
					//企业类型
					this.form.enterpriseType = res.enterpriseType
					//投资企业来源地
					this.form.investOrigin = res.investOrigin
					//投资额
					this.form.investSum = res.investSum
					//用地面积
					this.form.siteArea = res.siteArea
					//预计产值
					this.form.predictValue = res.predictValue
					//拟推荐设区市
					this.form.recommendInto = res.recommendInto
					//项目洽谈情况
					this.form.projectNegotiation = res.projectNegotiation
					//项目简介
					this.form.projectBrief = res.projectBrief
					// 企业是否有外迁打算
					this.form.isMigrate = res.isMigrate ? '是' : '否'
					// 是否有转为商机
					this.form.isBusiness = res.isBusiness ? '是' : '否'
					// 企业落户基本条件
					this.form.settlePostulate = res.settlePostulate
					//项目推进情况
					this.form.projectBoostCase = res.projectBoostCase
					//企业地址
					this.form.businessAddress = res.businessAddress
					//企业联系人
					this.form.businessContacts = res.businessContacts
					//推荐人
					this.form.referrals = res.referrals
					//驻点人员
					this.form.arrestPointStaff = res.arrestPointStaff
					//下一步工作计划
					this.form.nextWorkPlan = res.nextWorkPlan
					//备注
					this.form.remarks = res.remarks
					// 图片数组
					this.imgArrUrl = JSON.parse(res.sitePicture)
				})
			},
			getSquad() {
				api.getSquad().then(res => {
					if (res.success && res.retData) {
						let {
							level,
							captain,
							liaisonMan,
							liaisonManContact,
							arrestPoint,
							id
						} = res.retData
						this.form.captain = captain || ''
						this.form.liaisonMan = liaisonMan || ''
						this.form.liaisonManContact = liaisonManContact || ''
						this.form.pairPin = level || ''
						this.form.zsSquadId = id || ''

					}
				})
			},
			imageUpload() {
				if (this.imgArrUrl.length >= 5) {
					uni.showToast({
						title: '最多上传5张图片',
						duration: 1500,
						icon: 'none'
					});
					return false
				}
				let itemList = ['图片（从手机相册选择）', '图片（拍摄）']
				uni.showActionSheet({
					itemList: itemList,
					success: res => {
						this.chooseImage(res.tapIndex)
					}
				})
			},
			// 上传图片
			chooseImage(index) {
				// 选择图片
				var that = this;
				const count = 5 - this.imgArrUrl.length,
					sourceType = index > 0 ? 'camera' : 'album'
				uni.chooseImage({
					count: count,
					sizeType: ['original', 'compressed'],
					sourceType: [sourceType],
					success: chooseImageRes => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						if (chooseImageRes.tempFilePaths.count == 0) {
							return
						}
						for (var i = 0; i < tempFilePaths.length; i++) {
							const uploadTask = uni.uploadFile({
								url: `${config.baseUrl}/lengend/uploadFile?token=${uni.getStorageSync('userObj').token}`,
								filePath: tempFilePaths[i],
								name: 'file',
								success: (uploadFileRes) => {
									that.imgArrUrl.push({
										url: JSON.parse(uploadFileRes.data).message
									})
								},
								fail: () => {
									uni.showModal({
										content: '上传失败',
										showCancel: false
									})
								}
							})
						}

					}
				})
			},
			deteleImg(index) {
				var that = this;
				uni.showModal({
					content: '是否删除这张照片',
					success: function(res) {
						if (res.confirm) {
							that.imgArrUrl.splice(index, 1)
						}
					}
				})
			},
			onConfirm(value) {
				this.form.seeTime = getNowFormatTime(new Date(value.detail))
				this.showPicker = false;
			},
			setShowPicker() {
				this.showPicker = !this.showPicker;
			},
			setShowSheet(name) {
				this.showSheet = !this.showSheet;
				if (!name) return
				this.onSelectName = name
				switch (name) {
					case 'isEmphasis':
						// 是否重点跟踪项目
						this.actions = [{
								name: '是'
							}, {
								name: '否'
							},

						]
						break;
					case 'isMake':
						// 是否制造业企业
						this.actions = [{
								name: '是'
							}, {
								name: '否'
							},

						]
						break;

					case 'isBusiness':
						// 是否转为商机
						this.actions = [{
								name: '是'
							}, {
								name: '否'
							},

						]
						break;
					case 'isMigrate':
						// 企业是否有外迁打算
						this.actions = [{
								name: '是'
							}, {
								name: '否'
							},

						]
						break;
					case 'enterpriseType':
						// 企业类型
						this.actions = [{
								name: '“三类500强”企业'
							},
							{
								name: '行业龙头企业'
							},
							{
								name: '全国知名行业商协会'
							},

						]
						break;
					case 'arrestPoint':
						// 驻点区域
						this.actions = [{
								name: '粤港澳大湾区'
							},
							{
								name: '长江经济带'
							},
							{
								name: '京津冀地区'
							},
							{
								name: '其他'
							},

						]
						break;

					case 'pairPin':
						this.actions = [{
								name: '副处级'
							},
							{
								name: '正处级'
							},
							{
								name: '副厅级'
							},
							{
								name: '正厅级'
							},

						]
						break;
					default:
						break;

				}
			},
			selectPlace() {
				let that = this
				uni.chooseLocation({
					success: function(res) {
						that.form.seeSite = res.name
						that.form.detailedAddress = res.name
						that.form.lon = res.longitude
						that.form.lat = res.latitude
					}
				});
			},
			setFromValue(event, value) {
				if (event.detail.value || event.detail.value == '') {
					this.form[value] = event.detail.value
				} else {
					this.form[value] = event.detail
				}
			},
			onSelect(value) {
				this.form[this.onSelectName] = value.detail.name
				this.showSheet = false;
			},
			submite() {
				if (graceChecker.check(this.form, this.rule)) {
					if (!this.imgArrUrl.length) {
						return uni.showToast({
							title: '请上传现场照片',
							icon: "none"
						});
					}
					let query = {
						id: this.id,
						...this.form,
						sitePicture: JSON.stringify(this.imgArrUrl),
						isEmphasis: this.form.isEmphasis == '是' ? 1 : 0,
						isMake: this.form.isMake == '是' ? 1 : 0,
						isMigrate: this.form.isMigrate == '是' ? 1 : 0,
						isBusiness: this.form.isBusiness == '是' ? 1 : 0,
						isDel: 0
					}
					api.addVisitList(query).then(res => {
						if (res.success) {
							let pages = getCurrentPages()
							// 获取上一页栈
							let prevPage = pages[pages.length - 2]
							// 触发上一页 init函数(可以在括号里携带参数)
							prevPage.$vm.init()
							if (this.id) {
								uni.showToast({
									title: '修改成功',
									duration: 500
								});
							} else {
								uni.showToast({
									title: '添加成功',
									duration: 500
								});
							}


							setTimeout(function() {
								uni.navigateBack()
							}, 500);
						} else {
							uni.showToast({
								title: res.message,
								icon: 'error',
								duration: 1000
							})
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			goBlack() {
				uni.navigateBack()
			}

		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		background: #F3F6FB;
	}

	.place {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1upx solid #E8E9ED;
		padding: 20upx 0upx;
		margin: 0 29upx;

		.rightText {
			display: flex;
			align-items: center;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #B4B4BE;
			font-size: 23upx;

			.icon-dingweixiao {
				font-size: 23upx;
			}
		}

		.inp {
			height: 60upx;
			width: 100%;
			background: #FFFFFF;
			border: 1upx solid #D8D8D8;
			color: #000;
		}
	}

	.noborder {
		border: none;
	}

	.tishi {
		font-size: 20upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #2D55EE;
		line-height: 28upx;
		padding: 12upx 30upx;
		border-bottom: 1upx solid #E8E9ED;
	}

	.textareaBox {
		margin: 10px 16px 17px;
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		border-bottom: 1upx solid #E8E9ED;

		textarea {
			padding: 10px 0px;
			min-height: 90upx;
		}
	}


	.from_nav {
		background: #FFFFFF;
	}

	.uploadBox {
		margin: 10px 16px 17px;
		padding-bottom: 10px;
	}

	.imgBox {
		display: flex;
		flex-wrap: wrap;
		margin: 10px 16px 17px;
		padding-bottom: 10px;
		border-bottom: 1upx solid #E8E9ED;
	}

	.my_presentation_detailList_imgRightDiv {
		width: 220upx;
		height: 220upx;
		display: inline-block;
		position: relative;
		margin-bottom: 10upx;
		margin-right: 10upx;

		text {
			position: absolute;
			top: 0;
			right: 0;
			z-index: 99;
			font-size: 32upx;
		}

		.img1 {
			width: 220upx;
			height: 220upx;
		}
	}

	.btnBox {
		margin-bottom: 10upx;
		overflow: hidden;
		display: flex;

		.btn {
			flex: 1;
			background: linear-gradient(225deg, #3260FF 0%, #1890FF 100%);
			box-shadow: 0px 2px 5px 0px rgba(20, 64, 205, 0.3);
			border-radius: 3upx;
			font-size: 28upx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 80upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.blackbtn {
			color: #168FFF;
			background: #FFFFFF;
		}
	}

	.required {
		&::before {
			color: #ee0a24;
			content: "*";
			font-size: 14px;
			left: 8px;
			position: absolute;
			margin-top: 5px;
		}
	}
	
	.edit_img {
		background: #fff;
		box-sizing: border-box;
		min-height: 120upx;

		text {
			font-size: 3.2rem;
			margin-left: 20upx;
		}
	
		.edit_list {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
	
			li {
				margin-top: 20upx;
				width: 215upx;
				height: 215upx;
				box-sizing: border-box;
				position: relative;
				margin-right: 26upx;
				&:nth-child(3n){
					margin-right: 0;
				}
	
				.icon-shanchu {
					position: absolute;
					top: -16upx;
					right: -16upx;
					font-size: 1.6rem;
					color: #666;
					border-radius: 50%;
					border: 2upx solid #fff;
					box-sizing: border-box;
					// z-index: 999;
				}
	
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	
		.up_img {
			margin-top: 20upx;
			width: 215upx;
			height: 215upx;
			border-radius: 6upx;
			border: 2upx dashed rgba(230, 230, 240, 1);
	
			.icon-icon_xiangji_xian {
				flex: 1;
				height: 150upx;
				color: #B4B4BE;
				margin: 0;
				font-size: 2.4rem;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #FFFFFF;
			}
	
			p {
				width: 100%;
				height: 62upx;
				background-color: #a1a1a1;
				font-size: 24upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				line-height: 62upx;
				text-align: center;
			}
		}
	}

	

	.limit {
		width: 195upx;
		height: 28upx;
		font-size: 24upx;
		padding: 0 0 20upx 20upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(119, 125, 166, 1);
		line-height: 28upx;
		margin-top: 20upx;
	}
</style>
<style>
	.form_title {
		font-size: 36upx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #2F2F2F;
	}

	.title_group {
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 14px;
		white-space: nowrap;
	}

	.van-field__control.van-field__control--custom {
		height: 196upx;
		display: flex;
		justify-content: flex-end;
	}

	input::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #ccc;
	}

	input:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #ccc;
	}

	input::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #ccc;
	}

	input:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #ccc;
	}

	textarea::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #ccc;
	}

	textarea:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #ccc;
	}

	textarea::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #ccc;
	}

	textarea::-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #ccc;
	}
</style>
