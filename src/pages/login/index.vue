<template>
	<view class="login">
		<view class="header">
			<image style="width: 100%; height: 220upx; " mode="scaleToFill" src="../../static/images/login_bg.png">
			</image>
		</view>
		<view class="content">
			<image mode="scaleToFill" src="../../static/images/logo.png" class="logo"></image>
			<view class="login-title">梧州市产业经济投资促进平台</view>
			<view class="form">
				<view class="form-row">
					<i class="iconfont icon-yonghuming" style="font-size:38upx;"></i>
					<input class="form-input" confirm-type="确定" v-model="form.tel" maxlength="20" placeholder="用户名" />
				</view>

				<view class="form-row">
					<i class="iconfont icon-ziyuanxhdpi" style="font-size:38upx;"></i>
					<input class="form-input" type="password" v-model="form.password" maxlength="20" placeholder="密码"
						v-if="isPassword" />
					<input class="form-input" type="text" v-model="form.password" maxlength="20" placeholder="密码"
						v-else />
					<text class="iconfont " :class="{'icon-yincang':isPassword,'icon-xianshikejian':!isPassword}"
						@click="isPassword = !isPassword" style="font-size:40upx;"></text>
				</view>
			</view>


			<view class="submit" @click="submit">登 录</view>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("@/static/js/graceChecker.js");
	import api from "@/api/login";
	import util from "@/common/util";


	export default {
		name: "login",
		data() {
			return {
				isPassword: true,
				publicKey: '',
				rsakey: '',
				form: {
					tel: "",
					password: "",

				},
			};
		},
		onHide() {

		},
		// 获取 登录页面 url 地址参数
		onShow() {

		},
		created() {
			api.codeKey().then((res) => {
				this.rsakey = res.retData.rsakey;
				this.publicKey = res.retData.publicKey;
			})
		},
		methods: {
			getRsaPassword(input) {
				var publickey = this.publicKey;
				var encrypt = new this.$jsencrypt();
				encrypt.setPublicKey(publickey);
				return encrypt.encrypt(input);
			},
			// 提交
			submit() {
				let vm = this;
				let rule = [{
						name: "tel",
						checkType: "notnull",
						errorMsg: "请输入用户名"
					},
					{
						name: "password",
						checkType: "notnull",
						errorMsg: "请输入密码"
					},
				];
				// 表单验证
				if (graceChecker.check(vm.form, rule)) {
					uni.showLoading({
						title: "登录中",
						mask: true,
					});
					let params = {
						tel: vm.form.tel,
						password: vm.getRsaPassword(vm.form.password),
						rsakey: vm.rsakey,
					};
					api.login(params)
						.then((res) => {
							uni.hideLoading();
							if (res.token) {
								uni.showToast({
									title: "登录成功,正在跳转",
									icon: "none",
								});
								uni.setStorageSync('userObj', res);
								api.getUserRole().then(res => {
									if (res.success) {
										uni.setStorageSync('roleName', res.retData.roleName);
										uni.setStorageSync('loginName', res.retData.loginName);
										uni.switchTab({
											url: '/pages/card/index'
										});
									} else {
										uni.showToast({
											title: res.message || "登录失败，请重新尝试！",
											icon: "none",
										});
									}
								});
							} else {
								uni.showToast({
									title: res.message || "登录失败，请重新尝试！",
									icon: "none",
								});
							}
						})
						.catch(() => {
							uni.hideLoading();
							uni.showToast({
								title: "登录失败，请重新尝试！",
								icon: "none",
							});
						});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
		},
	};
</script>
<style lang="scss" scoped>
	.login {
		width: 100%;
		height: 100%;

		.content {
			width: 672upx;
			height: 800upx;
			box-sizing: border-box;
			padding: 34upx 40upx;
			position: fixed;
			top: 100upx;
			left: 50%;
			transform: translateX(-50%);
			background: #ffffff;
			box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
			border-radius: 20upx;

			.logo {
				width: 120upx;
				height: 120upx;
				margin: 0 auto;
				display: block;

			}

			.login-title {
				width: 100%;
				font-size: 36upx;
				font-family: Helvetica;
				font-weight: 500;
				color: #2f2f2f;
				text-align: center;
				margin-top: 40upx;
			}

			.form {
				.form-row {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #D8D8D8;
					height: 100upx;
					margin-top: 42upx;

					i {
						color: #1890FF;
						margin-right: 20upx;

					}

					.form-input {
						display: flex;
						width: 100%;
						background-color: #fff;
						// /deep/ .uni-input-wrapper {
						//   .uni-input-placeholder {
						//     height: 100%;
						//     line-height: 88rpx;
						//     font-size: 28rpx;
						//     padding-left: 40rpx;
						//     color: #a8b3c4;
						//     box-sizing: border-box;
						//   }
						//   .uni-input-input {
						//     padding: 0 40rpx;
						//     box-sizing: border-box;
						//   }
						// }
					}
				}
			}

			.submit {
				font-size: 32upx;
				font-family: MicrosoftYaHei, serif;
				color: #ffffff;
				text-align: center;
				width: 100%;
				height: 100upx;
				background: linear-gradient(135deg, #65B4FF 0%, #4057E8 100%);
				border-radius: 10upx;
				line-height: 100upx;
				margin-top: 74upx;
			}
		}
	}
</style>
