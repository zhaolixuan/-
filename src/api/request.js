
import util from "@/common/util";

export const request = function (method='GET',url,data,headers={}) {
    return new Promise((resolve,reject)=>{
        uni.request({
            url: url,
            data: data,
            method: method,
            header: {
                //'Accept': 'application/json, text/javascript, */*; q=0.01',
                //'Content-Type': 'application/json;charset=UTF-8',
                ...headers // 带有header信息
            },
        }).then(res => {
            // data为一个数组，数组第一项为错误信息，第二项为返回数据
            // 返回的错误信息
            if (res[0] != null) {
                uni.showToast({
                    title: '数据加载失败，请重新操作！',
                    icon: 'none'
                })
                reject(res[0])
            } else if (
                res[1].statusCode === 200 || 
                res[1].statusCode === 204 || 
                res[1].statusCode === 400 || 
                res[1].statusCode === 422) {
                let data = res[1].data || {};
                resolve(data);
            } else if (res[1].statusCode === 401) {
                // 判断当前地址是否是 登录页
                if (location.pathname === '/h5/pages/login/index') {
                    return;
                }
                let url = `/pages/login/index`;
                if (location.pathname === '/h5/pages/address/inoculate') {
                     // 返回登录之前的页面 并携带地址参数
                    var urlParams = util.getUrlObj(location.href);   // 获取当前页面地址
                    let params = {
                        ...urlParams,
                        "returnPage": location.pathname.split('/')[4]
                    };
                    params = util.createUrlParams(params);
                    url = `/pages/login/index?${params}`
                }
                uni.redirectTo({
                    url: url
                });
            } else if (res[1].statusCode === 500) {
                reject(res[1].data || {})
            }
            // else {
            //     let data = res[1].data || {};
            //     resolve(data);
            // }
        }).catch(parmas => {
            console.log('请求失败',parmas);
            uni.showToast({
                title: parmas.message,
                icon: 'none'
            })
            reject(parmas)
        })
    })
}