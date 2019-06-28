/**
 * @author 张鹏
 * @see 获取页面推荐商品的js文件
 * @version 1.0.0
 */

var recommendedGoods; // 获取推荐商品

var arrImg2 = {}; // recommend pictures
var arrText2 = {}; // recommend text

function recommendedGoods() {

	$.ajax({
		type : 'post',
		url : '<%=basePath%>web/recommended/goods',
		beforeSend : function() {
			// wait a moment
		},
		success : function(data) {
			recommendedGoods = data.data;
		},
		complete : function() {
		}
	})
}

function getRecommendedGoods(arrImg2, arrText2) {
	for (var i = 0; i < recommendedGoods.length; i++){
		arrImg2 = recommendedGoods[i].mainPicture;
		arrText2 = recommendedGoods[i].goodsTitle;
	}
	return arrImg2;
}