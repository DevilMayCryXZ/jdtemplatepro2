/**
 * 获取当前日期
 * @returns {string}
 * type  1  y-m-d  2 y-m-d 23:59:59  3  y-m-d h:m:s   4  h:m:s  5 获取当前星期
 */
export default {
	formatDate(originVal, type) {
		let date = originVal ? originVal : new Date();
		let seperator1 = "-";
		const dt = new Date(Number(originVal));

		const y = dt.getFullYear();
		const m = (dt.getMonth() + 1 + '').padStart(2, '0');
		const d = (dt.getDate() + '').padStart(2, '0');

		const hh = (dt.getHours() + '').padStart(2, '0');
		const mm = (dt.getMinutes() + '').padStart(2, '0');
		const ss = (dt.getSeconds() + '').padStart(2, '0');
		let currentdate = "";
		if (type == 1) {
			currentdate = `${y}${seperator1}${m}${seperator1}${d}`
		} else if (type == 2) {
			currentdate = `${y}${seperator1}${m}${seperator1}${d} 23:59:59`
		} else if (type == 3) {
			currentdate = `${y}${seperator1}${m}${seperator1}${d} ${hh}:${mm}:${ss}`
		} else if (type == 4) {
			currentdate = `${hh}:${mm}:${ss}`
		} else if (type == 5) {
			let dateArray = `${y}${seperator1}${m}${seperator1}${d}`.split("-");
			let date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
			currentdate = "周" + "日一二三四五六".charAt(date.getDay());
		}
		return currentdate;
	}
	// formatDate
}
