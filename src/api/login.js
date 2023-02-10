import {config} from './config'
import {request } from './request'


export default {
	// 获取 公钥和 秘钥
	codeKey(req = {}){
		 return request('POST', `${config.passportUrl}/passport/getLoginRsaKey`, req);
	},
    // 登录
    login(req = {}) {
        return request('GET', `${config.passportUrl}/ic-passport-web/passport/webLogin`, req);
    }, 
	// 登录
	getUserRole(req = {}) {
	    return request('GET', `${config.roleUrl}/sysWebUser/getUserRole?token=${uni.getStorageSync('userObj').token}`, req, {
            "token": `${uni.getStorageSync('userObj').token}`
        });
	}, 
   
}