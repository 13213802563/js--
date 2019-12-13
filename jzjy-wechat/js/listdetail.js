$('.listdetail-bot>div').hide();
$('.listdetail-bot>div:first').show();
$('.listdeta>.listdetail-ul>li').eq(0).css({
	"color": "#FC4949",
	"border-bottom": "1px solid red"
}).siblings().css({
	"color": "#000000",
	"border-bottom": "0"
})
$('.listdeta>.listdetail-ul>li').click(function() {
	$('.listdeta>.listdetail-ul>li').eq($(this).index()).css({
		"color": "#FC4949",
		"border-bottom": "1px solid red"
	}).siblings().css({
		"color": "#000000",
		"border-bottom": "0"
	})
	$('.listdetail-bot>.catalog').eq($(this).index()).show().siblings().hide();
})
/*点击下拉*/
$('.stop').click(function() {
	$('.drop-down').toggle();
})



//遮罩
$('.xzz').click(function() {
	$('.xzz').css("display", "none");
	$(".lidiv").css("display", "none");
})
