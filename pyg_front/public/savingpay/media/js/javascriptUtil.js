/**
 * @JavaScript工具
 */

// 获取地址栏参数
function getUrlParam(key) {
	var url = window.location.search;
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	var result = url.substr(1).match(reg);
	return result ? decodeURIComponent(result[2]) : null;
}