$('#rabaw').click(function() {
	$(this).hide();
	$('.wraprgba>div').hide();
})
var height = $(window).height();
$('#househo').css('height', height + 'px')
$('#rabaw').css('height', height + 'px')

/*$('.listname li').click(function() {
	var data;	
	if($("input",this).val().indexOf(":")>-1){
		data = $("input",this).val().replace(/\s+/g,"").split(";");
		var divContent=$('.wraprgba>div').eq($(this).index()).children();
		for (var i=0;i<divContent.length;i++) {
			for(var j=0;j<data.length;j++){			
				var title=data[j].split(":")[0];
				if(title==divContent[i].innerHTML){
					var liContent=$("li",$(divContent[i+1]));
					var value=data[j].split(":")[1];
					for(var m=0;m<liContent.length;m++){
						if(value.indexOf(liContent[m].innerHTML)>-1){
							liContent[m].style.color="red";
							break;
						}
					}
					i++;
					break
				}			
			}
		}
	}
	else{
		data = $("input",this).val();
		var liLength=$("li",$('.wraprgba>div').eq($(this).index()));
		for (var i=0;i<liLength.length;i++) {		
			if(data==liLength[i].innerHTML){
				liLength[i].style.color="red";
			}
		}
	}
	$('#rabaw').show();
	$('.wraprgba>div').eq($(this).index()).show().siblings().hide();

})*/
/*键盘隐藏*/
/*var divs=$("div").not("#div1");//获取除id为div1的所有div*/
$(".listname li").not(".layout").focus(function() {
	document.activeElement.blur();
})

$('.sex_ul li').click(function() {
	$(this).addClass('one').siblings().removeClass('one');
})
$('.houses_ul li').click(function() {
	$(this).addClass('one').siblings().removeClass('one');
})
$('.first_con,.remo').click(function() {
	$('#rabaw').hide();
	$('.wraprgba>div').hide();
})
$('.dan_ul li').click(function() {
	$(this).addClass('red').siblings().removeClass('red')
})
$('.ent').click(function() {

	var ulId = $(this).parent().next().data("name");
	var text = $(this).parent().next().find('.red').text();

	$("#" + ulId).val(text);
	$('#rabaw').hide();
	$('.wraprgba>div').hide();
})
$('.last_con').click(function() {
	var ulId = $(this).parent().prev().data("name");
	var text = $(this).parent().parent().find('.one').html();
	$("#" + ulId).val(text);

})

$('.duo_btn').click(function() {
	var ulId = $(this).parent().prev().data("name");
	var $h2 = $(this).parent().parent().find("h2");
	var text = "";
	$h2.each(function(i, o) {
		var name = $(o).html();
		var nameVal = $(o).next().find('.one').html();
		if(name == "老人") {
			if(nameVal == undefined) {
				$("#elder").val("");
			} else {
				$("#elder").val(nameVal + "人");
			}
		} else if(name == "总人口") {
			if(nameVal == undefined) {
				$("#populationTotal").val("");
			} else {
				$("#populationTotal").val(nameVal + "人");
			}
		} else if(name == "小孩") {
			if(nameVal == undefined) {
				$("#kid").val("");
			} else {
				$("#kid").val(nameVal + "人");
			}
		} else if(name == "中年人") {
			if(nameVal == undefined) {
				$("#middleAge").val("");
			} else {
				$("#middleAge").val(nameVal + "人");
			}
		} else if(name == "老人身体状态") {
			if(nameVal == undefined) {
				$("#elderlyStatus").val("");
			} else {
				$("#elderlyStatus").val(nameVal);
			}
		} else if(name == "老人自理能力") {
			if(nameVal == undefined) {
				$("#elderlyBodyStatus").val("");
			} else {
				$("#elderlyBodyStatus").val(nameVal);
			}
			/*家电*/
		} else if(name == "冰箱") {
			if(nameVal == undefined) {
				$("#fridgeStatus").val("");
			} else {
				$("#fridgeStatus").val(nameVal);
			}
		} else if(name == "电视") {
			if(nameVal == undefined) {
				$("#tvStatus").val("");
			} else {
				$("#tvStatus").val(nameVal);
			}
		} else if(name == "洗衣机") {
			if(nameVal == undefined) {
				$("#washerStatus").val("");
			} else {
				$("#washerStatus").val(nameVal);
			}
		} else if(name == "空调") {
			if(nameVal == undefined) {
				$("#airCondStatus").val("");
			} else {
				$("#airCondStatus").val(nameVal);
			}
		} else if(name == "净化器") {
			if(nameVal == undefined) {
				$("#ovenStatus").val("");
			} else {
				$("#ovenStatus").val(nameVal);
			}
		} else if(name == "油烟机") {
			if(nameVal == undefined) {
				$("#micwaveBrand").val("");
			} else {
				$("#micwaveBrand").val(nameVal);
			}
		} else if(name == "微波炉") {
			if(nameVal == undefined) {
				$("#cookerHoodStatus").val("");
			} else {
				$("#cookerHoodStatus").val(nameVal);
			}
		} else if(name == "烤箱") {
			if(nameVal == undefined) {
				$("#airCleanerStatus").val("");
			} else {
				$("#airCleanerStatus").val(nameVal);
			}
		} else if(name == "汽车") {
			if(nameVal == undefined) {
				$("#carWithout").val("");
			} else {
				$("#carWithout").val(nameVal);
			}
		} else if(name == "汽车品牌") {
			if(nameVal == undefined) {
				$("#carLine").val("");
			} else {
				$("#carLine").val(nameVal);
			}
		} else if(name == "户型") {
			if(nameVal == undefined) {
				$("#houseType").val("");
			} else {
				$("#houseType").val(nameVal);
			}
		} else if(name == "面积") {
			var mji = $("#mji").val();
			if(mji == undefined) {
				$("#housingArea").val("");
			} else {
				$("#housingArea").val(mji);
			}
		}

		if(name == "面积") {
			var mji = $("#mji").val();
			if(mji != "") {
				if($(o).next().find('.one').html() == "" || mji == undefined) {
					text += '';
				} else {
					text += $(o).html() + ':' + mji + ";";
				}
			}
		} else {
			if($(o).next().find('.one').html() == "" || $(o).next().find('.one').html() == undefined) {
				text += '';
			} else {
				text += $(o).html() + ':' + $(o).next().find('.one').html() + ";";
			}
		}

	});
	$("#" + ulId).val(text);
	$('#rabaw').hide();
	$('.wraprgba>div').hide();

})

$('#carss,#trt').hide();
$("#bcar").on('click', "li", function() {
	if($(this).hasClass("has")) {
		$('#carss,#trt').show();
		$('.sex_ul li').click(function() {
			$(this).addClass('one').siblings().removeClass('one');

		})

	} else if($(this).hasClass("not")) {
		for(var i = 0; i < $("#carss").children().length; i++) {
			$("#carss").children('li').eq(i).removeClass('one').unbind('click')

		};
		$('#carss,#trt').hide();
	}
})

//其他
//		$(".qita li:last-child>span").click(function(){
//			$(this).css("display","none");
//			$(this).siblings("div").css("display","block");
////			$(this).children("input").val()
//			
//		});
//		$('.qita li:last-child #btn2').click(function(){
//			$(".qita li:last-child").children("span").css("display","block");
//			$('.qita .qt-div').css("display","none");
//			
//		});
//		$('.qita li:last-child #btn1').click(function(){
//			var clii  = $("<li></li>")
//			 clii.html($('.qita .qt-div input').val())
//         
//			$(".qita li:last-child").before(clii)
//			$('.qita .qt-div input').val("")
//			
//		});

/*$(document).ready(function($) {
	var customId = getQueryString("id");
	$.ajax({
		url: geturl() + "/cutomerAnalysis/loadCustomerAnalysis",
		type: "post",
		dataType: "json",
		data: {
			"body": "{'customId':'" + customId + "'}"
		},
		success: function(res) {

			var data = res.date;
			var html = "";
			var html1 = "";
			var html2 = "";
			var html3 = "";
			var html4 = "";
			var html5 = "";
			var html6 = "";
			var html7 = "";
			if(data.name != undefined) {
				$("#custName").val(data.name);
			}
			if(data.mobile != undefined) {
				$("#custPhone").val(data.mobile);
			}
			if(data.channel != undefined) {
				$("#custChannel").val(data.channel);
			}
			if(data.province != undefined) {
				$("#custProvince").val(data.province);
			}
			if(data.city != undefined) {
				$("#custCity").val(data.city);
			}
			if(data.town != undefined) {
				$("#custTown").val(data.town);
			}
			if(data.address != undefined) {
				$("#custAddress").val(data.address);
			}
			if(data.coOrdinates != undefined) {
				$("#custCoOrdinates").val(data.coOrdinates);
			}
			var sex = ""
			if(data.sex != undefined) {
				sex = data.sex;
			}
			html += '<input type="text" readonly="readonly" name="sex" id="sex" value="' + sex + '" />';
			$(".p").append(html);

			var belief = ""
			if(data.belief != undefined) {
				belief = data.belief;
			}
			html1 += '<input type="text" id="religion" value="' + belief + '" readonly="readonly"/>';
			$(".p1").append(html1);

			var marriage = ""
			if(data.marriage != undefined) {
				marriage = data.marriage;
			}
			html2 += '<input type="text" id="married" value="' + marriage + '" readonly="readonly"/>';
			$(".p2").append(html2);

			var fitmentStstus = ""
			if(data.fitmentStstus != undefined) {
				fitmentStstus = data.fitmentStstus;
			}
			html3 += '<input type="text" id="furniture" value="' + fitmentStstus + '" readonly="readonly"/>';
			$(".p3").append(html3)

			var houseType = "";
			var housingArea = "";
			if(data.houseType != undefined) {
				houseType = "户型:" + data.houseType + ";&nbsp;";
				$("#houseType").val(data.houseType);
			}
			if(data.housingArea != undefined) {
				housingArea = "面积:" + data.housingArea + ";&nbsp;";
				$("#housingArea").val(data.housingArea);
			}
			html4 += '<input type="text" id="house" value="' + houseType + housingArea + '" />'
			$(".p4").append(html4)

			var populationTotal = "";
			var kid = "";
			var middleAge = "";
			var elder = "";
			var elderlyBodyStatus = "";
			var elderlyStatus = "";
			if(data.populationTotal != undefined) {
				populationTotal = "总人口:" + data.populationTotal + ";&nbsp;";
				$("#populationTotal").val(data.populationTotal);
			}
			if(data.kid != undefined) {
				kid = "小孩:" + data.kid + ";&nbsp;";
				$("#kid").val(data.kid);
			}
			if(data.middleAge != undefined) {
				middleAge = "中年人:" + data.middleAge + ";&nbsp;";
				$("#middleAge").val(data.middleAge);
			}
			if(data.elder != undefined) {
				elder = "老人:" + data.elder + ";&nbsp;";
				$("#elder").val(data.elder);
			}
			if(data.elderlyBodyStatus != undefined) {
				elderlyBodyStatus = "老人身体状态:" + data.elderlyBodyStatus + ";&nbsp;";
				$("#elderlyBodyStatus").val(data.elderlyBodyStatus);
			}
			if(data.elderlyStatus != undefined) {
				elderlyStatus = "老人自理能力:" + data.elderlyStatus + ";&nbsp;";
				$("#elderlyStatus").val(data.elderlyStatus);
			}
			var all = populationTotal + kid + middleAge + elder + elderlyBodyStatus + elderlyStatus;
			html5 += '<input type="text" id="people" value="' + all + ' " readonly="readonly"/>'
			$(".p5").append(html5)

			var carLine = "";
			var carWithout = "";
			if(data.carLine != undefined) {
				carLine = "汽车品牌:" + data.carLine + ";&nbsp;";
				$("#carLine").val(data.carLine);
			}
			if(data.carWithout != undefined) {
				carWithout = "有无汽车:" + data.carWithout + ";&nbsp;";
				$("#carWithout").val(data.carWithout);
			}

			html6 += '<input type="text" class="inp" id="car" value="" readonly="readonly">'
			$(".p6").append(html6)

			var fridgeStatus = "";
			var tvStatus = "";
			var washerStatus = "";
			var airCondStatus = "";
			var ovenStatus = "";
			var micwaveBrand = "";
			var cookerHoodStatus = "";
			var airCleanerStatus = "";
			if(data.fridgeStatus != undefined) {
				fridgeStatus = "冰箱:" + data.fridgeStatus + ";&nbsp;";
				$("#fridgeStatus").val(data.fridgeStatus);
			}
			if(data.tvStatus != undefined) {
				tvStatus = "电视:" + data.tvStatus + ";&nbsp;";
				$("#tvStatus").val(data.tvStatus);
			}
			if(data.washerStatus != undefined) {
				washerStatus = "洗衣机:" + data.washerStatus + ";&nbsp;";
				$("#washerStatus").val(data.washerStatus);
			}
			if(data.airCondStatus != undefined) {
				airCondStatus = "空调:" + data.airCondStatus + ";&nbsp;";
				$("#airCondStatus").val(data.airCondStatus);
			}
			if(data.ovenStatus != undefined) {
				ovenStatus = "烤箱:" + data.ovenStatus + ";&nbsp;";
				$("#ovenStatus").val(data.ovenStatus);
			}
			if(data.micwaveBrand != undefined) {
				micwaveBrand = "微波炉:" + data.micwaveBrand + ";&nbsp;";
				$("#micwaveBrand").val(data.micwaveBrand);
			}
			if(data.cookerHoodStatus != undefined) {
				cookerHoodStatus = "抽油烟机:" + data.cookerHoodStatus + ";&nbsp;";
				$("#cookerHoodStatus").val(data.cookerHoodStatus);
			}
			if(data.airCleanerStatus != undefined) {
				airCleanerStatus = "净化器:" + data.airCleanerStatus + ";&nbsp;";
				$("#airCleanerStatus").val(data.airCleanerStatus);
			}
			var houseEle = fridgeStatus + tvStatus + washerStatus + airCondStatus + ovenStatus + micwaveBrand + cookerHoodStatus + airCleanerStatus;
			html7 += '<input type="text" readonly="readonly" class="inp" id="household" value="' + houseEle + '"/>'
			$(".p7").append(html7)

			/*if(data.airCleanerStatus==undefined||data.cookerHoodStatus==undefined||data.micwaveBrand==undefined||data.ovenStatus==undefined){
				$('#household').val('')
			}else{
				$('#household').val(  '冰箱,'+ data.airCleanerStatus+ '&nbsp;电视,'+data.cookerHoodStatus+'洗衣机,'+ data.micwaveBrand+ '&nbsp;空调,'+data.ovenStatus  )
			}
			*/
		/*},
		error() {

		}

	})
});*/


/* 完善客户信息传后台 */
$('.inv_btn').click(function() {
	var sex = $("#sex").val();
	var belief = $("#religion").val();
	var marriage = $("#married").val();
	var fitmentStstus = $("#furniture").val();
	var houseType = $("#house").val();
	var people = $("#people").val();
	var car = $("#car").val();
	var household = $("#household").val();
	var populationTotal = $("#populationTotal").val(); //总人口
	var elder = $("#elder").val(); //老人
	var kid = $("#kid").val(); //小孩
	var middleAge = $("#middleAge").val(); //中年
	var elderlyStatus = $("#elderlyStatus").val(); //老人状况
	var elderlyBodyStatus = $("#elderlyBodyStatus").val(); //老人身体状况
	/*家电*/
	var fridgeStatus = $("#fridgeStatus").val(); //
	var tvStatus = $("#tvStatus").val(); //
	var washerStatus = $("#washerStatus").val(); //
	var airCondStatus = $("#airCondStatus").val(); //
	var ovenStatus = $("#ovenStatus").val(); //
	var micwaveBrand = $("#micwaveBrand").val(); //
	var cookerHoodStatus = $("#cookerHoodStatus").val(); //
	var airCleanerStatus = $("#airCleanerStatus").val(); //
	var carLine = $("#carLine").val(); //有无汽车
	var carWithout = $("#carWithout").val(); //车系
	var houseType = $("#houseType").val(); //户型
	var housingArea = $("#housingArea").val(); //面积
	var name = $("#custName").val();
	var mobile = $("#custPhone").val();
	var channel = $("#custChannel").val();
	var province = $("#custProvince").val();
	var city = $("#custCity").val();
	var town = $("#custTown").val();
	var address = $("#custAddress").val();
	var coOrdinates = $("#custCoOrdinates").val();
	var customId = getQueryString("id");
	var cus = '{"city":"' + city + '","town":"' + town + '","address":"' + address + '","coOrdinates":"' + coOrdinates + '","name":"' + name + '","mobile":"' + mobile + '","channel":"' + channel + '","province":"' + province + '","houseType":"' + houseType + '","housingArea":"' + housingArea + '","carLine":"' + carLine + '","carWithout":"' + carWithout + '","fridgeStatus":"' + fridgeStatus + '","tvStatus":"' + tvStatus + '","washerStatus":"' + washerStatus + '","airCondStatus":"' + airCondStatus + '","ovenStatus":"' + ovenStatus + '","micwaveBrand":"' + micwaveBrand + '","cookerHoodStatus":"' + cookerHoodStatus + '","airCleanerStatus":"' + airCleanerStatus + '","customId":"' + customId + '","elderlyStatus":"' + elderlyBodyStatus + '","elderlyBodyStatus":"' + elderlyStatus + '","kid":"' + kid + '","middleAge":"' + middleAge + '","populationTotal":"' + populationTotal + '","elder":"' + elder + '","sex":"' + sex + '","belief":"' + belief + '","marriage":"' + marriage + '","fitmentStstus":"' + fitmentStstus + '"}';
	$.ajax({
		url: geturl() + "/cutomerAnalysis/updateCustomerAnalysis",
		type: "post",
		dataType: "json",
		data: {
			'body': cus
		},
		success: function(res) {
			if(res.code == "0") {
				alert("提交成功")
			} else {

			}
		}

	})
})