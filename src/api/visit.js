import {
	config
} from './config'
import {
	request
} from './request'

export default {
	// 根据用户ID获取小分队信息
	getSquad(req = {}) {
		return request('GET', `${config.invitationUrl}/zsSquad/getSquad?token=${uni.getStorageSync('userObj').token}`,
			req, {
				"token": `${uni.getStorageSync('userObj').token}`
			});
	},

	//拜访记录列表
	getVisitList(req = {}) {
		return request('POST',
			`${config.invitationUrl}/zsSquadDaily/searchList?token=${uni.getStorageSync('userObj').token}`, req, {
				"token": `${uni.getStorageSync('userObj').token}`,
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			});
	},

	//添加修改拜访记录
	addVisitList(req = {}) {
		return request('POST',
			`${config.invitationUrl}/zsSquadDaily/save?token=${uni.getStorageSync('userObj').token}`, req, {
				"token": `${uni.getStorageSync('userObj').token}`,
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			});
	},

	getVisitData(req = {}) {
		return request('GET', `${config.invitationUrl}/zsSquadDaily/get?token=${uni.getStorageSync('userObj').token}`,
			req, {
				"token": `${uni.getStorageSync('userObj').token}`
			});
	},


//添加小分队用户后登录时绑定用户id
	getBinding(req = {}) {
		return request('GET', `${config.invitationUrl}/zsSquad/binding?token=${uni.getStorageSync('userObj').token}`,
			req, {
				"token": `${uni.getStorageSync('userObj').token}`
			});
	},











}
