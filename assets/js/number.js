/**
 * 格式化数字
 */
export default {
	formatNum(val, type) {
		if (!type || type == null || type == 1) {
			return val ? parseFloat(val).toFixed(1) : '0.0';
		} else if (type == 2) {
			return val ? parseFloat(val).toFixed(2) : '0.00';
		} else if (type == 3) {
			return val ? "￥" + parseFloat(val).toFixed(2) : '暂未标价';
		}
	}
}
