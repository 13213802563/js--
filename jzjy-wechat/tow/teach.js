var id = getQueryString("teacId");
if(getQueryString("ios")){
    $('#lo_left').on("click",function(){
       // window.history.back(-1);
    })
}else{

}
jzjy.ajax({
	params: {
		teacId: id
	},
	async: false,
	url: "teacher/queryDetailTeacher"
}, function(data) {
	console.log(data)
	var Data = data.data;
	var Teachers = "";
	console.log(Data);

	Teachers += '<div class="swiper-slide" style="margin-top: 4.5rem;">' +
		'<img src="' +(Data.headPath?Data.headPath:"http://192.168.1.235/Service-industry/img/accept-logo.png") + '" alt="" />'+
		'<div class="wrap_name clearfix">' +
		'<h2 style="font-size:.5rem;">' + Data.name + '</h2>' +
		'</div>' +
		'<div class="brief clearfix">' + Data.describe + '</div>' +
		'</div> '

	$(".swiper-wrapper").html(Teachers)

});
