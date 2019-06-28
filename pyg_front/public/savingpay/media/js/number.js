/**
 * 强制保留两位小数
 * 
 * @param {Object}
 *            x
 */
function toDecimal2(x) {
	var f = parseFloat(x);
	if (isNaN(f)) {
		return false;
	}
	var f = Math.round(x * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s;
}

function toDecimal1(x) {
	var f = parseFloat(x);
	if (isNaN(f)) {
		return false;
	}
	var f = Math.round(x * 10) / 10;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 1) {
		s += '0';
	}
	return s;
}

/**
 * 格式化时间戳
 * @param time
 * @returns
 */
function getLocalTime(time) { 
	var nS =  time.toString();
	nS = nS.substr(0,10);
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '); 
}

/**
 * 乘法精确运算
 * @param arg1
 * @param arg2
 * @returns
 */
function mul(arg1, arg2) {
    var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
    m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
    resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
    return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
}