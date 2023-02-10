import {config} from './config'
import {request } from './request'

export default {
	// 跟进状态数据
	getBusinessStatus(req = {}){
		 return request('GET', `${config.baseUrl}/lengend/query?servCode=businessStatus&atCity=梧州`, req , {
            "token": `${uni.getStorageSync('userObj').token}`
        });
	},
    // 所属产业数据
    getIndustryClass(req = {}) {
        return request('GET', `${config.baseUrl}/lengend/query?servCode=industryClass&atCity=梧州`, req , {
            "token": `${uni.getStorageSync('userObj').token}`
        });
    }, 
	//商机列表
	getBusinessList(req = {}) {
	    return request('POST', `${config.baseUrl}/Bussiness/queryBussiness?servCode=industryClass`, req , {
	        "token": `${uni.getStorageSync('userObj').token}`
	    });
	},
	 //商机列表筛选接口
	 getQueryCondition(req = {}) {
	     return request('POST', `${config.baseUrl}/Bussiness/queryCondition?servCode=industryClass`, req , {
	         "token": `${uni.getStorageSync('userObj').token}`
	     });
	 },
	 //商机列表筛选接口
	 getQueryById(req = {}) {
	     return request('POST', `${config.baseUrl}/Bussiness/queryById?servCode=industryClass`, req , {
	         "token": `${uni.getStorageSync('userObj').token}`
	     });
	 },
	
	
	//企业模糊搜索
	getNamevague(req = {}){
		return request('GET', `${config.baseUrl}/Bussiness/getEntNames`, req , {
		    "token": `${uni.getStorageSync('userObj').token}`
		});
	},
	//企业信息查询
	getEntInfo(req = {}){
		return request('GET', `${config.baseUrl}/Bussiness/getEntInfo`, req , {
		    "token": `${uni.getStorageSync('userObj').token}`
		});
	},
	//添加商机
	addBussiness(req = {}){
		return request('POST', `${config.baseUrl}/Bussiness/addBussiness`, req , {
		    "token": `${uni.getStorageSync('userObj').token}`
		});
	},
	//编辑商机
	editBussiness(req = {}){
		return request('POST', `${config.baseUrl}/Bussiness/editBussiness`, req , {
		    "token": `${uni.getStorageSync('userObj').token}`
		});
	},
	
	 
	
	
	
    
}