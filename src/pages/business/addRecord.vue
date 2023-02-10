<template>
	<scroll-view scroll-y="true">
		<view class="nav">
			<div class="inputBox" v-if="!id">
				<div class='inp'>
					<input class="search_input" confirm-type="search" placeholder="请输入公司名称"
						placeholder-style="font-size:12px;color:#B4B4BE;" v-model.trim="searchName"
						@input="searchCompany" />
					<uni-icons class="clearIcon" type="clear" size="26" color="#999" v-if="showClearIcon"
						@click="clearIcon" />
					<span @click="searchCompany">
						<icon type="search" size="26" />
					</span>
				</div>
			</div>
			<view class="titleName" v-else>
				<image src="../../static/images/company2x.png" class="company"></image>
				{{infoFrom.enterpriseName}}
			</view>



			<scroll-view v-if="pickerView" class="list" scroll-y>
				<block v-if="enterpriseArr.length != 0">
					<view v-for="(item,index) in enterpriseArr" class="item" @click="changeCompany(item)">
						<text>{{item.label}}</text>
					</view>
				</block>
				<block v-else>
					<text class="item">暂无数据</text>
				</block>
			</scroll-view>
			<van-tabs v-model="active" @click="onClickTab">
				<van-tab title="企业信息">
					<view class="from_nav">
						<van-cell title-class='form_title' title="企业基本信息" />
						<form @submit="submite">
							<van-cell-group>

								<van-field required @change="setFromValue($event,'enterpriseName')"
									label-class='title_group' :value="infoFrom.enterpriseName" label="企业名称"
									placeholder="请输入" input-align="right" />

								<uni-datetime-picker v-model="infoFrom.startupTime" type='date'>
									<van-cell title-class='title_group' title="成立时间"
										:value="infoFrom.startupTime || '请选择'" />
								</uni-datetime-picker>


								<van-field @change="setFromValue($event,'territory')" label-class='title_group'
									:value="infoFrom.territory" label="所属地" placeholder="请输入" input-align="right" />

								<picker :value="infoFrom.industry" :range="industryData" range-key="name"
									@change="bindTimeData">
									<van-cell required title-class='title_group' title="所属产业"
										:value="infoFrom.industry || '请选择'" />
								</picker>

								<van-field @change="setFromValue($event,'representative')" label-class='title_group'
									:value="infoFrom.representative" label="法定代表人" placeholder="请输入"
									input-align="right" />

								<van-field @change="setFromValue($event,'registerCapital')" label-class='title_group'
									:value="infoFrom.registerCapital" label="注册资本" placeholder="请输入"
									input-align="right" />

								<van-field required @change="setFromValue($event,'contacts')" label-class='title_group'
									:value="infoFrom.contacts" label="联系人" placeholder="请输入" input-align="right" />

								<van-field @change="setFromValue($event,'duties')" label-class='title_group'
									:value="infoFrom.duties" label="职务" placeholder="请输入" input-align="right" />

								<van-field required @change="setFromValue($event,'contactInformation')"
									label-class='title_group' :value="infoFrom.contactInformation" label="联系方式"
									placeholder="请输入" input-align="right" />
							</van-cell-group>
						</form>
						<van-cell title-class='form_title' title="企业扩展信息" />
						<view class="textareaBox">
							<p class='title_group'>经营范围</p>
							<textarea @blur="setFromValue($event,'managementRange')" placeholder="请输入经营范围"
								:value='infoFrom.managementRange' auto-height />
						</view>
						<view class="textareaBox">
							<p class='title_group'>其他信息</p>
							<textarea @blur="setFromValue($event,'other')" placeholder="请输入其他信息" :value='infoFrom.other'
								auto-height />
						</view>
					</view>

				</van-tab>
				<van-tab title="跟进状态">
					<view class="from_nav">
						<van-cell title-class='form_title' title="跟进状态信息" />

						<van-cell-group>
							<van-field required @change="setFromValue($event,'followUpRerson')"
								label-class='title_group' :value="infoFrom.followUpRerson" label="跟进单位"
								placeholder="请输入" input-align="right" />

							<picker :value="infoFrom.followUpState" :range="followUpStateData" range-key="name"
								@change="setfollowUpState">
								<van-cell required title-class='title_group' title="跟进状态"
									:value="infoFrom.followUpState || '请选择'" />
							</picker>

						</van-cell-group>

						<view class="textareaBox">
							<p class='title_group'>跟进详情</p>
							<textarea v-if="active == '跟进状态'" @blur="setFromValue($event,'followUpDetails')"
								placeholder="请输入跟进详情" :value='infoFrom.followUpDetails' auto-height />
						</view>

						<view class="textareaBox">
							<p class='title_group'>协办事项</p>
							<textarea v-if="active == '跟进状态'" @blur="setFromValue($event,'cosponsor')"
								placeholder="请输入协办事项" class="text" :value='infoFrom.cosponsor' auto-height />
						</view>

						<view class="uploadBox">
							<p class='title_group'>上传图片</p>
							<view class="edit_img">
								<ul class="edit_list" v-if="imgArrUrl.length > 0">
									<li v-for="(item,index) in imgArrUrl" :key="index">
										<text style="background: #FFFFFF;" class="iconfont icon-shanchu"
											@click="deteleImg(index)"></text>
										<image :src="item.url" mode="aspectFill" />
									</li>
								</ul>
								<view class="up_img" @click="imageUpload" v-if="imgArrUrl.length < 3">
									<text class="iconfont icon-icon_xiangji_xian"></text>
									<p style='justify-content: center;'>上传图片</p>
								</view>
							</view>
							<view class="limit">最多3张照片</view>
						</view>
					</view>
				</van-tab>
			</van-tabs>

		</view>
		<view class="btnBox">
			<button class='btn' @click="submite" type="primary">更新商机</button>
		</view>
	</scroll-view>
</template>

<script>
	import {
		getNowFormatDay
	} from "@/utils/time.js";
	import api from "@/api/business";
	import {
		config
	} from '@/api/config'
	var graceChecker = require("@/static/js/graceChecker.js");
	export default {
		data() {
			return {
				searchName: '',
				pickerView: false,
				active: "企业信息",
				enterpriseArr: [], // 企业名称 模糊搜索后的 数据
				companyObj: '', //企业详情
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
				followUpStateData: [{
						name: '线索（首次接洽）'
					},
					{
						name: '商机（意向阶段）'
					},
					{
						name: '项目（准备签约）'
					},
					{
						name: '落地（签约落地）'
					}
				],
				imgArrUrl: [],
				infoFrom: {
					enterpriseName: '', // 企业名称
					startupTime: '', // 成立时间
					territory: '', // 所属地
					industry: '', // 所属产业
					representative: '', // 法定代表人
					registerCapital: '', // 注册资本
					contacts: '', // 联系人
					duties: '', // 职务
					contactInformation: '', // 联系方式
					managementRange: '', // 经营范围
					other: '', // 其他信息
					followUpRerson: '', // 跟进单位
					followUpState: '', // 跟进状态
					followUpDetails: '', // 跟进详情
					cosponsor: '', // 协办事项
				},
				infoRule: [{
						name: "enterpriseName",
						checkType: "notnull",
						errorMsg: "请填写企业名称"
					},
					{
						name: "industry",
						checkType: "notnull",
						errorMsg: "请选择所属产业"
					},
					{
						name: "contacts",
						checkType: "notnull",
						errorMsg: "请填写联系人"
					},
					{
						name: "contactInformation",
						checkType: "notnull",
						errorMsg: "请填写联系方式"
					},
					{
						name: "followUpRerson",
						checkType: "notnull",
						errorMsg: "请填写跟进单位"
					},
					{
						name: "followUpState",
						checkType: "notnull",
						errorMsg: "请选择跟进状态"
					},
				],

				id: undefined,
				showClearIcon: false
			}
		},
		onLoad: function(option) {
			if (option.id) {
				this.id = option.id
				this.getDetail()

			}
		},
		methods: {
			getDetail() {
				api.getQueryById({
					id: this.id
				}).then((res) => {
					if (res.success) {
						const value = JSON.parse(res.message)
						let stateData = [{
								name: '线索（首次接洽）',
								value: '1'
							},
							{
								name: '商机（意向阶段）',
								value: '10'
							},
							{
								name: '项目（准备签约）',
								value: '20'
							},
							{
								name: '落地（签约落地）',
								value: '30'
							}
						]
						let state = ''
						if (value.status) {
							state = stateData.filter(i => {
								return i.value == value.status
							})[0].name;
						}
						this.infoFrom.followUpState = state
						this.infoFrom.cosponsor = value.assist
						this.infoFrom.followUpDetails = value.trace
						this.infoFrom.followUpRerson = value.tracker
						this.infoFrom.territory = value.belong
						this.infoFrom.registerCapital = value.capital
						this.infoFrom.city = value.city
						this.infoFrom.startupTime = value.comp_date
						this.imgArrUrl = value.comp_pic
						this.infoFrom.industry = value.industrial
						this.infoFrom.enterpriseName = value.name
						this.infoFrom.other = value.other
						this.infoFrom.duties = value.post
						this.infoFrom.managementRange = value.scope
						this.infoFrom.representative = value.responser
						this.infoFrom.contacts = value.contact_people
						this.infoFrom.contactInformation = value.phone
						this.infoFrom.comp_type = value.comp_type
						this.infoFrom.contact = value.contact
						this.infoFrom.county = value.county
						this.infoFrom.email = value.email

					}
				})

			},
			changeLog(e) {
				console.log('----change事件:', e);
			},
			bindTimeData(e) {
				this.infoFrom.industry = this.industryData[e.detail.value].name
			},
			setfollowUpState(e) {
				this.infoFrom.followUpState = this.followUpStateData[e.detail.value].name
			},

			clearIcon: function() {
				this.searchName = '';
				this.showClearIcon = false;
				this.pickerView = false;
			},
			searchCompany(event) {
				this.searchName = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
					this.pickerView = false;
				}
				if (this.searchName !== "") {
					this.pickerView = true;
					let parml = {
						name: this.searchName
					};
					api.getNamevague(parml).then((res) => {
						if (res.success === true) {
							this.enterpriseArr = [];
							if (res.data !== undefined && res.data.length > 0) {
								res.data.forEach((item, index) => {
									this.enterpriseArr.push({
										value: item.originalName,
										label: item.originalName,
									});
								});
							}
						} else {
							this.enterpriseArr = [];
						}
					});
				}
			},
			changeCompany(item) {
				this.infoFrom = {
					enterpriseName: '', // 企业名称
					startupTime: '', // 成立时间
					territory: '', // 所属地
					industry: '', // 所属产业
					representative: '', // 法定代表人
					registerCapital: '', // 注册资本
					contacts: '', // 联系人
					duties: '', // 职务
					contactInformation: '', // 联系方式
					managementRange: '', // 经营范围
					other: '', // 其他信息
					followUpRerson: '', // 跟进单位
					followUpState: '', // 跟进状态
					followUpDetails: '', // 跟进详情
					cosponsor: '', // 协办事项
				}
				this.pickerView = false;
				this.searchName = this.infoFrom.enterpriseName = item.label || item.name;
				api.getEntInfo({
					name: this.infoFrom.enterpriseName
				}).then((res) => {
					this.infoFrom.startupTime = res.data.comp_date;
					this.infoFrom.territory = res.data.belong;
					this.infoFrom.representative = res.data.responser;
					this.infoFrom.registerCapital = res.data.capital;
					this.infoFrom.contacts = res.data.contact_people;
					this.infoFrom.contactInformation = res.data.phone;
					this.infoFrom.city = res.data.city;
					this.infoFrom.comp_type = res.data.comp_type;
					this.infoFrom.contact = res.data.contact;
					this.infoFrom.county = res.data.county;
					this.infoFrom.email = res.data.email;
					// this.infoFrom.followUpRerson = res.data.tracker,
					// this.infoFrom.industry = res.data.industrial

				})
			},
			submite() {
				// let from = this.active == '企业信息' ? this.infoFrom : this.infoFrom
				// let rule = this.active == '企业信息' ? this.infoRule : this.stateRule
				if (graceChecker.check(this.infoFrom, this.infoRule)) {
					let stateData = [{
							name: '线索（首次接洽）',
							value: '1'
						},
						{
							name: '商机（意向阶段）',
							value: '10'
						},
						{
							name: '项目（准备签约）',
							value: '20'
						},
						{
							name: '落地（签约落地）',
							value: '30'
						}
					]
					let state = ''
					if (this.infoFrom.followUpState) {
						state = stateData.filter(i => {
							return i.name == this.infoFrom.followUpState
						})[0].value
					}
					let query = {
						id: this.id,
						is_edit: this.id ? true : false,
						assist: this.infoFrom.cosponsor,
						belong: this.infoFrom.territory,
						capital: this.infoFrom.registerCapital,
						city: this.infoFrom.city,
						comp_date: this.infoFrom.startupTime,
						comp_pic: this.imgArrUrl,
						comp_type: this.infoFrom.comp_type,
						contact: this.infoFrom.contact,
						contact_people: this.infoFrom.contacts,
						county: this.infoFrom.county,
						email: this.infoFrom.email,
						industrial: this.infoFrom.industry,
						name: this.infoFrom.enterpriseName,
						other: this.infoFrom.other,
						phone: this.infoFrom.contactInformation,
						post: this.infoFrom.duties,
						responser: this.infoFrom.representative,
						scope: this.infoFrom.managementRange,
						status: state,
						trace: this.infoFrom.followUpDetails,
						tracker: this.infoFrom.followUpRerson,
					}
					let pages = getCurrentPages()
					// 获取上一页栈
					let prevPage = pages[pages.length - 2]
					if (this.id) {
						api.editBussiness(query).then((res) => {
							console.log(res)
							if (res.success) {
								uni.showToast({
									title: '修改成功',
									duration: 500
								});

								// 触发上一页 init函数(可以在括号里携带参数)
								prevPage.$vm.init()


								setTimeout(function() {
									uni.navigateBack({
										edit: true
									})
								}, 500);
							} else {
								uni.showToast({
									title: res.message,
									icon: 'error',
									duration: 1000
								})
							}
						}).catch((err) => {
							console.log(err)
							uni.showToast({
								title: "修改失败",
								icon: 'error',
								duration: 1000
							})
						});

					} else {
						api.addBussiness(query).then((res) => {
							console.log(res)
							if (res.success) {
								uni.showToast({
									title: '添加成功',
									duration: 500
								});
								// 触发上一页 init函数(可以在括号里携带参数)
								prevPage.$vm.init()
								setTimeout(function() {
									uni.navigateBack({
										edit: true
									})
								}, 500);
							} else {
								uni.showToast({
									title: res.message,
									icon: 'error',
									duration: 1000
								})
							}

						}).catch((err) => {
							console.log(err)
							uni.showToast({
								title: "添加失败",
								icon: 'error',
								duration: 1000
							})
							// INTERNAL_SERVER_ERROR
						});
					}

				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			onClickTab(event) {
				this.active = event.detail.title
			},

			setFromValue(event, value) {
				if (this.active == '企业信息') {
					if (event.detail.value || event.detail.value == '') {
						this.infoFrom[value] = event.detail.value
					} else {
						this.infoFrom[value] = event.detail
					}
				} else {
					if (event.detail.value || event.detail.value == '') {
						this.infoFrom[value] = event.detail.value
					} else {
						this.infoFrom[value] = event.detail
					}
				}
			},

			imageUpload() {
				if (this.imgArrUrl.length >= 3) {
					uni.showToast({
						title: '最多上传3张图片',
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
				const count = 3 - this.imgArrUrl.length,
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


		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		background: #F3F6FB;
	}

	.inputBox {
		width: 100%;
		background: #FFFFFF;
		padding: 20upx 0upx;
		box-sizing: border-box;

		.clearIcon {
			position: absolute;
			right: 100upx;
			top: 16upx;
			z-index: 9;
		}
	}

	.inputBox>div {
		height: 80upx;
		background: #F1F1F1;
		// box-shadow:0px 10upx 30upx 0px rgba(7,26,122,0.06);
		border-radius: 10upx;
		margin: 0 30upx;
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

	.from_nav {
		background: #FFFFFF;
	}

	.list {
		position: fixed;
		z-index: 10;
		width: 100%;
		height: 100%;
		background-color: #fff;
		padding: 0 0upx 100upx 0upx;
		box-sizing: border-box;
		top: 100upx;

		.item {
			padding-left: 40upx;
			height: 120upx;
			display: flex;
			border-bottom: 1upx solid #ccc;
			align-items: center;

			text {
				border-bottom: none
			}
		}

	}

	.textareaBox {
		margin: 20upx 32upx 34upx;
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		border-bottom: 1upx solid #E8E9ED;

		textarea {
			padding: 20upx 0px;
			font-size: 28upx;
			color: #999;
		}
	}

	.edit_img {
		background: #fff;
		padding: 20upx;
		box-sizing: border-box;
		min-height: 120upx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		text {
			font-size: 3.2rem;
			margin-left: 20upx;
		}

		.edit_list {
			display: flex;

			li {
				margin-top: 20upx;
				width: 196upx;
				height: 196upx;
				box-sizing: border-box;
				position: relative;
				margin-right: 26upx;

				text {
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
			width: 196upx;
			height: 196upx;
			border-radius: 6upx;
			border: 2upx dashed rgba(230, 230, 240, 1);

			text {
				flex: 1;
				height: 134upx;
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
	}


	.uploadBox {
		margin: 10px 16px 17px;
		padding-bottom: 10px;
	}
	.form_title {
		font-size: 36upx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #2F2F2F;
	}

	.btnBox {
		margin-bottom: 10upx;
		// padding: 0 10upx;
		overflow: hidden;

		.btn {
			background: linear-gradient(225deg, #3260FF 0%, #1890FF 100%);
			box-shadow: 0px 2px 5px 0px rgba(20, 64, 205, 0.3);
			border-radius: 3upx;
			font-size: 28upx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 80upx;
		}
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
	}

	.van-field__control.van-field__control--custom {
		height: 196upx;
		display: flex;
		justify-content: flex-end;
	}

	/deep/ .van-tabs__line {
		width: 50% !important;
		background: #1890FF !important;
	}
</style>
