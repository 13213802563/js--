var page;
jzjy.ajax({
	params: {},
	async: true,
	url: "teacher/queryTeacher"
}, function(data) {
	console.log(data);
	var datas = data.data;
	console.log(datas);
	page=data.page;
	for(var i = 0; i < datas.length; i++) {
		var teacher = "";
		teacher ='<div class="left">' +
			'<div><img src="'+(datas[i].headPath?datas[i].headPath:"img/course_default.png")+'" alt="" /></div>'+
			'</div>' +
			'<div class="right">' +
			'<div class="right-top">' +
			'<h2>' + datas[i].name + '</h2>' +
			'</div>' +
			'<div class="right-bottom">' + datas [i].describe + '</div>' +
			'</div>'
			$("<li></li>").append(teacher).appendTo($(".list-ul")).on("click", function() {
				window.location.href = "teach.html?teacId=" + $(this).attr("data-id")+"&ios=1";
			}).attr("data-id",datas[i].id);
	}

});

$(window).scroll(function () {
    //已经滚动到上面的页面高度
    var scrollTop = $(this).scrollTop();
    //页面高度
    var scrollHeight = $(document).height();
    //浏览器窗口高度
    var windowHeight = $(this).height();
    //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
    if (scrollTop + windowHeight == scrollHeight) {

    }
});

/*
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
if(isAndroid){
    $(".header").hide();
}
else{
    $(".header").show();
}
*/