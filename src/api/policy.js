import {
	config
} from './config'
import {
	request
} from './request'

export default {
	//企业模糊搜索
	getNamevague(req = {}){
		return request('GET', `${config.baseUrl}/Bussiness/getEntNames`, req , {
		    "token": `${uni.getStorageSync('userObj').token}`
		});
	},
	// 添加历史数据
	addHistoryData(req = {}) {
		return request('GET',
			`${config.baseUrl}/Bussiness/querylogAdd?token=${uni.getStorageSync('userObj').token}`, req);
	},
	//获取历史搜索数据
	getHistoryList(req = {}) {
		return request('GET',
			`${config.baseUrl}/Bussiness/querylogList?token=${uni.getStorageSync('userObj').token}`, req);
	},
	//政策匹配
	setpolicyGetCompanyV2(req = {}) {
		return request('POST',
			`${config.policyUrl}/api/v1/policyAssistant/list?token=${uni.getStorageSync('userObj').token}`,
			req);
	},
	//政策详情
	policyDetail(req = {}) {
		return request('GET',
			`${config.policyUrl}/api/v1/policyAssistant/detail?token=${uni.getStorageSync('userObj').token}`,
			req);
	},


}
