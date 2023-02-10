function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};
var getQueryStringArgs = function () {
	//取得查询字符串并去掉开头的问号
	var qs = (location.search.length > 0 ? location.search.substring(1) : ""),

		//保存数据的对象
		args = {},

		//取得每一项
		items = qs.length ? qs.split("&") : [],
		item = null,
		name = null,
		value = null,
		//在 for 循环中使用
		i = 0,
		len = items.length;
	//逐个将每一项添加到 args 对象中
	for (i = 0; i < len; i++) {
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		if (name.length) {
			args[name] = value;
		}
	}

	return args;
}

var JdSetStorageSync = function (key, value) {
	if (window.__wxjs_environment === 'miniprogram' || getQueryStringArgs().source !== 'h5') {
		//若在微信小程序里
		uni.setStorageSync('JD-wei-xin-' + key, value);
	} else {
		uni.setStorageSync(key, value);
	}

};
var JdGetStorageSync = function (key) {
	if (window.__wxjs_environment === 'miniprogram' || getQueryStringArgs().source !== 'h5') {
		//若在微信小程序里
		return uni.getStorageSync('JD-wei-xin-' + key);
	} else {
		return uni.getStorageSync(key);
	}
};
var JdRemoveStorageSync = function (key) {
	if (window.__wxjs_environment === 'miniprogram' || getQueryStringArgs().source !== 'h5') {
		//若在微信小程序里
		return uni.removeStorageSync('JD-wei-xin-' + key);
	} else {
		return uni.removeStorageSync(key);
	}
};
var filterUrlSearch = function () {
	let urlSearch = getQueryStringArgs() || {};
	urlSearch.phoneNum = '';
	urlSearch.token = '';
	urlSearch._ = parseInt(Math.random() * 1000000);
	let newUrlSearch = [];
	let newUrlSearchStr = '?';
	Object.keys(urlSearch).forEach((key) => {
		urlSearch[key] && newUrlSearch.push(`${key}=${urlSearch[key]}`)
	});
	newUrlSearchStr = newUrlSearch.length > 0 ? newUrlSearchStr + newUrlSearch.join('&') : "";
	return newUrlSearchStr;
}
/*
 * JSON数组去重
 * @param: [array] json Array
 * @param: [string] 唯一的key名，根据此键名进行去重
 */
function uniqueArray(array, key) {
	var result = [array[0]];
	for (var i = 1; i < array.length; i++) {
		var item = array[i];
		var repeat = false;
		for (var j = 0; j < result.length; j++) {
			if (item[key] == result[j][key]) {
				repeat = true;
				break;
			}
		}
		if (!repeat) {
			result.push(item);
		}
	}
	return result;
}
/**
 * 
 * @returns {page} 当前页面
 */
function getCurPage(i = 1) {
	let pages = getCurrentPages();
	let curPage = pages[pages.length - i];
	return curPage
}
//获得连接参数
// 将url window.location.search参数转化为对象
function getUrlObj(url) {
	const str = decodeURI(url).substring(1);
	const reg = /([^?&=]+)=([^?&=]*)/g;
	const obj = {};
	str.replace(reg, (str, key, val) => {
		obj[key] = String(val);
		return "";
	});
	return obj;
}

/**
* @return {[Number]}  至少多长时间触发一次
* @param fn
* @param delay
* @param mustRun
*/
function throttle(fn, delay, mustRun) {
	let timer = null,
		previous = null;

	return function () {
		let now = +new Date(),
			// @ts-ignore
			context = this,
			args = arguments;
		if (!previous) previous = now;
		let remaining = now - previous;
		if (mustRun && remaining >= mustRun) {
			fn.apply(context, args);
			previous = now;
		} else {
			clearTimeout(timer);
			timer = setTimeout(function () {
				fn.apply(context, args);
			}, delay);
		}
	};
}

function setNums(values = '') {
	return values.replace(/(\d{10})\d*([0-9a-zA-Z]{2})/,"$1******$2")
}

function createUrlParams(params = {}) {
  let query = [];
  Object.keys(params).forEach(key => {
    (params[key] || params[key] === 0) && query.push(`${key}=${params[key]}`);
  });
  return query.join("&");
}

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	getQueryStringArgs: getQueryStringArgs,
	JdSetStorageSync: JdSetStorageSync,
	JdGetStorageSync: JdGetStorageSync,
	JdRemoveStorageSync: JdRemoveStorageSync,
	filterUrlSearch: filterUrlSearch,
	uniqueArray: uniqueArray,
	getCurPage: getCurPage,
	getUrlObj: getUrlObj,
	throttle: throttle,
	setNums: setNums,
	createUrlParams: createUrlParams
}
