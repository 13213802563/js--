$(function() {
	var params
	var onTime;
	var serveAttitude;
	var cleaning;
	var clothing;
	var tool;
	var orderId = getQueryString("id");

	/*回显数据*/
	$.ajax({
		url: "/apidisp/to/dispatcher",
		data: {
			key: 170637233697623,
			id: orderId
		},
		type: "post",
		success: function(data) {
			var data = data.data;
			if(data){
                var html = "";
                var html1 = ""
                html += '<li><span>客户姓名:</span><p>' +((!!data.receiverName)?data.receiverName:'') + '</p></li>' +
                    '<li><span>联系电话:</span><p>' + ((!!data.receiverMobile)?data.receiverMobile:'') + '</p></li>' +
                    '<li><span>预约时间:</span><p>' + ((!!data.createTime)?data.createTime:'') + '</p></li>' +
                    '<li><span>预约地点:</span><p>' + ((!!data.address)?data.address:'') + '</p></li>' +
                    '<li><span>服务类型:</span><p>' + ((!!data.cateName)?data.cateName:'') + '</p></li>' +
                    '<li><span>服务人数:</span><p>' + ((!!data.perNumber)?data.perNumber:'') + '</p></li>' +
                    '<li><span>服务人员:</span><p>' + ((!!data.perName)?data.perName:'') + '</p></li>' +
                    '<li><span>开始时间:</span><p>' + ((!!data.startTime)?data.startTime:'') + '</p></li>'+
                    '<li><span>总工作量:</span><p>' + ((!!data.actualTime)?data.actualTime:'') + '</p></li>'+
                    '<li><span>缴费金额:</span><p>' + ((!!data.actualCost)?data.actualCost:'') + '元</p></li>'
                $(".content-two").html(html)
                html1 += '<span>编号: ' + data.orderCode + '</span><span>服务站: ' + data.orgName + '</span>'
                $(".content-one .number:first-child").html(html1)
            }

		}
	})
	$(":radio").click(function() {
		if($('.number-radio1 input[name="radio1"]:checked ').val() == 1) {
			$("#text").show()
		} else {
			$("#text").hide()
		}
	});

	/*提交*/
	$('.star1').raty({
		click: function(score, evt) {
			onTime = score
		}
	});
	$('.star2').raty({
		click: function(score, evt) {
			serveAttitude = score
		}
	});
	$('.star3').raty({
		click: function(score, evt) {
			cleaning = score
		}
	});
	$('.star4').raty({
		click: function(score, evt) {
			clothing = score
		}
	});
	$('.star5').raty({
		click: function(score, evt) {
			tool = score
		}
	});
    var once=false;
    if(!once){
        $("button").on("click", function() {
            once=true;
            $("#btnSummit").attr('disabled','true');
            $("#btnSummit").css({background:"#9d968f",cursor:'default'});

            let time= setTimeout(function(){
                if(once){
                    once=false;
                    clearInterval(time);
                    $("#btnSummit").removeAttr('disabled');
                    $("#btnSummit").css({background:"#FF7E00",cursor:'pointer'});
                }
            },2000)
            if(!$('.number-radio input[name="radio"]:checked ').val()) {
                tanwin("您还没有对本次服务进行评价");
                // once=false;
                return;
            }
            if(!$('.number-radio1 input[name="radio1"]:checked ').val()) {
                tanwin("您还没有确认家中物品损换及丢失");
                // once=false;
                return;
            }
            if(onTime == undefined) {
                tanwin("您还没有对保洁准时到达进行评分");
                // once=false;
                return;
            }
            if(serveAttitude == undefined) {
                tanwin("您还没有对保洁的服务态度进行评分");
                // once=false;
                return;
            }
            if(cleaning == undefined) {
                tanwin("您还没有对保洁打扫的干净程度进行评分");
                // once=false;
                return;
            }
            if(clothing == undefined) {
                tanwin("您还没有对保洁的衣着进行评分");
                // once=false;
                return;
            }
            if(tool == undefined) {
                tanwin("您还没有对保洁的工具进行评分");
                // once=false;
                return;
            }
            else {
                var feedback = $('.number-radio input[name="radio"]:checked ').val()
                var goodsDamage = $('.number-radio1 input[name="radio1"]:checked ').val()
                if($("#text").val() == "") {
                    params = {
                        key: 876444941178711,
                        orderId: orderId,
                        feedback: feedback,
                        goodsDamage: goodsDamage,
                        onTime: onTime,
                        serveAttitude: serveAttitude,
                        cleaning: cleaning,
                        clothing: clothing,
                        tool: tool
                    }
                } else {
                    params = {
                        key: 876444941178711,
                        orderId: orderId,
                        feedback: feedback,
                        goodsDamage: goodsDamage,
                        goodsDamageDetails: $("#text").val(),
                        onTime: onTime,
                        serveAttitude: serveAttitude,
                        cleaning: cleaning,
                        clothing: clothing,
                        tool: tool
                    }

                }

                $.ajax({
                    url: "/apidisp/to/dispatcher",
                    data: params,
                    type: "post",
                    success: function(data) {
                        if(data.code == 0) {
                            tanwin(data.msg);
                            // once=false;
                        }
                        if(data.code == "-1") {
                            tanwin(data.msg);
                            // once=false;
                        }

                    }
                })
            }

        })
    }else{
    }
})

function tanwin(text) {
	$("#tanwin").text(text).attr('style', '');
	var clea = setInterval(function() {
		$('.tan').fadeOut("slow", function() {
			$("#tanwin").attr('style', 'display:none');
			clearInterval(clea);
		});
	}, 2000);
};

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURI(r[2]);
	return null;
}
