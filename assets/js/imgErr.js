/* 图片加载失败处理 
	that 图片绑定字段所属对象
	dat 图片绑定字段
	src  用户设置默认图片
*/
export const imgErr = (that, dat, src)=>{
	if (src) {
		that[dat] = src //默认图片路径
	}else {
		that[dat] = "/static/tourcenter/nopicture.jpg" //默认图片路径
	}
	// 默认图片路径如果也加载失败 就没了 不会继续触发
}