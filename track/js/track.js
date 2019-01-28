
    function isBlank(object){
        return (!object||(typeof(object)=="string" && $.trim(object)=="")||($.isPlainObject(object) && $.isEmptyObject(object))||($.isArray(object) && object.length == 0));
    }
    
    function refreshCaptca(o) {
        var url = "img/jcaptcha.jpg?update=" + Math.random();
        $("#captchaImage,#captchaImage2,#captchaImage3,#captchaImage4,#captchaImage5").attr("src",url);
    }
    
    function hwzz(){
    	if(isBlank($("#carNo").val())){
            alert("请输入车号！");
            $("#carNo").focus();
            return;
        }
    	/*if(isBlank($("#hph").val())){
	        alert("请输入运单号！");
	        $("#hph").focus();
	        return;
	    }*/
		if(!isBlank($("#hph").val())&&$("#hph").val().length < 5){
			alert("运单号需要输入至少后5位数字！");
			$("#hph").focus();
	        return;
		}
    	if(isBlank($("#QUERY_CAPTCA").val())){
            alert("请输入验证码！");
            $("#QUERY_CAPTCA").focus();
            return;
        }
    	
    	$("#infoBody").hide();
    	$.ajax({
           type: "POST",
           url: "/gateway/DzswNewD2D/Dzsw/action/ChcxAction_queryHwzzInfoByCarNo;DZSW_SESSIONID=7hqNOXUsA6oesfbwBwsPAuU8stBPlhZJCPmHq7fzB8lGX3b_-uvQ!-295400618",
           data: $("#hwzzForm").serialize(),
           success: function(msg) {
        	   if(!isBlank(msg.object)){
        		   msg.object=decode($.trim(msg.object),'3');
	               $("#infoBody").show();
	               var evtDate = msg.object[0].eventDate;
	               var dst = msg.object[0].destStation;
	               var arrDep = msg.object[0].arrDepId == "D"?"已过":"在";
	               var ss = msg.object[0].eventProvince+msg.object[0].eventCity;
	               var dtString = evtDate.substring(0,4)+"年"+evtDate.substring(5,7)+"月"+evtDate.substring(8,10)+"日"+evtDate.substring(11,13)+"时"+evtDate.substring(14,16)+"分";
	               var html = "您查询的货物"+arrDep+"："+msg.object[0].eventAdm+msg.object[0].eventStation+"站";
				   
	               if(!isBlank(ss)){
	            	   html += "（"+ss+"）";
	               }
	               if(isBlank(dst)){
	            	   html += "<br/>报告时间为："+dtString+"。"
	               } else {
	            	   var dzlc = msg.object[0].dzlc;
	            	   if(isBlank(dzlc)){
	            		    html += "<br/>报告时间为："+dtString+"。"
	            	   }else{
			               html += "<br/>距终点站"+dst+"站还有约"+dzlc+"公里，报告时间为："+dtString+"。"
	            	   }
	               }
	               $("#reportBody").html(html);
        	   } else if(!msg.success){
        		   alert(msg.message);
        	   } 
        	   var obj = document.getElementById("captchaImage");
               refreshCaptca(obj);
           }
        });
    }

	function shky(){
		if(isBlank($("#ddh").val())){
            alert("请输入需求单号！");
            $("#ddh").focus();
            return;
        }
		/*if(isBlank($("#fhrsjhm").val())){
            alert("请输入发货人手机号码！");
            $("#fhrsjhm").focus();
            return;
        }*/
        if(isBlank($("#QUERY_CAPTCA_2").val())){
            alert("请输入验证码！");
            $("#QUERY_CAPTCA_2").focus();
            return;
        }
    	
		$("#infoBody,#gjxx,#shkyBody,#lcgjBody").hide();
		$.ajax({
	        type: "POST",
	        url: "/gateway/DzswNewD2D/Dzsw/action/ShkyDhcxAction_queryShkyInfo;DZSW_SESSIONID=7hqNOXUsA6oesfbwBwsPAuU8stBPlhZJCPmHq7fzB8lGX3b_-uvQ!-295400618",
	        data: $("#shkyForm").serialize(),
	        success: function(msg) {
				if(!isBlank(msg.object)){
					msg.object=decode($.trim(msg.object),'3');
					$("#shkyBody").show();
					//modified by liuyang  20150226 
					$("#shkyDetailBody").empty();
					var result = "您查询的货物";
					if(!isBlank(msg.object["CarDynaInfo"])&&(msg.object["CarDynaInfo"] == '在'||msg.object["CarDynaInfo"] == '已过')){
						result +=msg.object["CarDynaInfo"]+":";
					}
					else{
						result +="在：";
						}
					//-end modified by liuyang  20150226 
					var chc = msg.object["TrackCc"];
					var dtString;
					if(isBlank(msg.object["CarTrackInfo"])){
						result = "暂无您查询货物的位置信息<br/> ";
					} else {
						result += msg.object["CarTrackInfo"][0].BGZMC + "站<br/>";
						chc = msg.object["CarTrackInfo"][0].CHC;
						dtString = msg.object["CarTrackInfo"][0].BGSJ;
					}
					if(!isBlank(msg.object["TrackCh"])){
						result += "车号：" + msg.object["TrackCh"];
					}
					if(!isBlank(chc)){
						result += "，车次：" + chc;
					}
					if(!isBlank(msg.object["TrackZcrq"])){
						result += "，装车日期：" + msg.object["TrackZcrq"];
					}

					var dst = msg.object["OrderUser"].dzzm;
            	    var dzlc = msg.object["Dzlc"];
            	    if(!isBlank(dzlc)){
            		   result += "<br/>距终点站"+dst+"站还有约"+dzlc+"公里";
            		   if(!isBlank(dtString)){
						   result += "，报告时间为："+dtString+"。";
                       }
            	    }
					
            	    if((!isBlank(msg.object["OrderTracks"]))){
						
						var orderTracksLength = msg.object["OrderTracks"].length;
						var jqsdOrderTracksLength = msg.object["jqsdOrderTracksBefore4"].length;
						
            	    	$.each(msg.object["jqsdOrderTracksBefore4"],function(i,item){
							var html = "<tr>";
		                    html += "<td align='center'>"+(i+1)+"</td><td align='center'>"+item.OPTIME+"</td><td style='padding-left:15px;'>"+item.ZTGJJC+"</td>";
		                    html += "</tr>";
		                    $("#shkyDetailBody").append(html);
						});
						
            	    	$.each(msg.object["OrderTracks"],function(i,item){
							var html = "<tr>";
		                    html += "<td align='center'>"+(i+1+jqsdOrderTracksLength)+"</td><td align='center'>"+item.ZTFSSJ+"</td><td style='padding-left:15px;'>"+getLcnr(item)+"</td>";
		                    html += "</tr>";
		                    $("#shkyDetailBody").append(html);
						});
						
            	    	$.each(msg.object["jqsdOrderTracksAfter4"],function(i,item){
							var html = "<tr>";
		                    html += "<td align='center'>"+(i+1+jqsdOrderTracksLength+orderTracksLength)+"</td><td align='center'>"+item.OPTIME+"</td><td style='padding-left:15px;'>"+item.ZTGJJC+"</td>";
		                    html += "</tr>";
		                    $("#shkyDetailBody").append(html);
						});
						$("#shkyDetailBody tr:even").addClass("even");
                        $("#shkyDetailBody tr:odd").addClass("odd");
            	    	result += "  <span style='font-size:14px; color:red; cursor:pointer;'  onclick='shwoShkyDetail()'>详情</span>";
            	    }
					$("#shkyResult").html(result);
		        } else if(!msg.success){
					alert(msg.message);
				} 
				var obj = document.getElementById("captchaImage2");
	 			refreshCaptca(obj);
			}
		});
	}

	function gtxb(){
		if(isBlank($("#gtxbdh").val())){
            alert("请输入快运单号！");
            $("#gtxbdh").focus();
            return;
        }
        if(isBlank($("#QUERY_CAPTCA_3").val())){
            alert("请输入验证码！");
            $("#QUERY_CAPTCA_3").focus();
            return;
        }
    	
		$("#infoBody,#gjxx,#gtxbBody,#lcgjBody").hide();
		$.ajax({
	        type: "POST",
	        url: "/gateway/DzswNewD2D/Dzsw/action/ZtkyDhcxAction_queryGtxbInfo;DZSW_SESSIONID=7hqNOXUsA6oesfbwBwsPAuU8stBPlhZJCPmHq7fzB8lGX3b_-uvQ!-295400618",
	        data: $("#gtxbForm").serialize(),
	        success: function(msg) {
	        	if(msg.success){
		        	msg=decode($.trim(msg.object),'3');
					if(!isBlank(msg.result)){
						$("#gtxbBody").show();
						$("#gtxbDetailBody").empty();
						var result = "您查询的货物当前最新状态：<br/>";
						var gjxxList = msg.result[0].details;
						if(isBlank(gjxxList)){
							result = "暂无您查询货物的最新状态<br/> ";
						} else {
							var obj = gjxxList[gjxxList.length - 1];
							result += obj.scantime +" "+obj.desc;
							result += "  <span style='font-size:14px; color:red; cursor:pointer;' onclick='shwoGtxbDetail()'>详情</span></br>";
							$.each(gjxxList,function(i,item){
								var html = "<tr>";
			                    html += "<td align='center'>"+(i+1)+"</td><td align='center'>"+item.scantime+"</td><td style='padding-left:15px;'>"+item.desc+"</td>";
			                    html += "</tr>";
			                    $("#gtxbDetailBody").append(html);
							});
							$("#gtxbDetailBody tr:even").addClass("even");
	                        $("#gtxbDetailBody tr:odd").addClass("odd");
						}
		
						$("#gtxbResult").html(result);
			        } else{
			        	result = "暂无您查询货物的最新状态<br/> ";
						$("#gtxbResult").html(result);
					} 	
	        	}else{
	        		alert(msg.message);
	        	}
				var obj = document.getElementById("captchaImage3");
	 			refreshCaptca(obj);
			}
		});
	}

	function ptxb(){
		if(isBlank($("#ptxbdh").val())){
            alert("请输入快运单号！");
            $("#ptxbdh").focus();
            return;
        }
        if(isBlank($("#QUERY_CAPTCA_4").val())){
            alert("请输入验证码！");
            $("#QUERY_CAPTCA_4").focus();
            return;
        }
    	
		$("#infoBody,#gjxx,#ptxbBody,#lcgjBody").hide();
		$.ajax({
	        type: "POST",
	        url: "/gateway/DzswNewD2D/Dzsw/action/ZtkyDhcxAction_queryPtxbInfo;DZSW_SESSIONID=7hqNOXUsA6oesfbwBwsPAuU8stBPlhZJCPmHq7fzB8lGX3b_-uvQ!-295400618",
	        data: $("#ptxbForm").serialize(),
	        success: function(msg) {
				if(msg.success){
					$("#ptxbBody").show();
					$("#ptxbDetailBody").empty();
					var result = "您查询的货物当前最新状态：<br/>";

                    var gjxxList=decode($.trim(msg.object),'3');
					if(isBlank(gjxxList)){
						result = "暂无您查询货物的最新状态<br/> ";
					} else {
						var obj = gjxxList[gjxxList.length - 1];
						result += "作业时间："+getTransDateAndTime(obj.transDate,obj.transTime)+" 作业名称："+obj.operationCode;
						result += " 作业机构："+obj.operationStation;
						result += "  <span style='font-size:14px; color:red; cursor:pointer;'  onclick='shwoPtxbDetail()'>详情</span>";
						
						$.each(gjxxList,function(i,item){
							var html = "<tr>";
		                    html += "<td align='center'>"+(i+1)+"</td><td align='center'>"+getTransDateAndTime(item.transDate,item.transTime)+"</td><td style='padding-left:15px;'>"+item.operationCode+"</td><td style='padding-left:15px;'>"+item.operationStation+"</td>";
		                    html += "</tr>";
		                    $("#ptxbDetailBody").append(html);
						});
						$("#ptxbDetailBody tr:even").addClass("even");
                        $("#ptxbDetailBody tr:odd").addClass("odd");
					}

					$("#ptxbResult").html(result);
		        } else if(!msg.success){
					alert(msg.message);
				} 
				var obj = document.getElementById("captchaImage4");
	 			refreshCaptca(obj);
			}
		});
	}

	function jzx(){
		var xz = $("#xz").val();
		if(isBlank(xz)){
            alert("请输入箱主！");
            $("#xz").focus();
            return;
        } else {
        	var r1 = /^[A-Z]{4}$/;
			if(!r1.test(xz)){
				alert("请输入4位大写字母组成的箱主！");
	            $("#xz").focus();
	            return;
			}
        }
        var xh = $("#xh").val();
		if(isBlank(xh)){
            alert("请输入箱号！");
            $("#xh").focus();
            return;
        } else {
            var r2 = /^[0-9]{7}$/;
			if(!r2.test(xh)){
				alert("请输入7位数字组成的箱号！");
	            $("#xh").focus();
	            return;
			}
        }
        if(isBlank($("#QUERY_CAPTCA_5").val())){
            alert("请输入验证码！");
            $("#QUERY_CAPTCA_5").focus();
            return;
        }
    	
		$("#jzxBody").hide();
		$.ajax({
	        type: "POST",
	        url: "/gateway/DzswNewD2D/Dzsw/action/ChcxAction_queryXhInfoByJzxNo;DZSW_SESSIONID=7hqNOXUsA6oesfbwBwsPAuU8stBPlhZJCPmHq7fzB8lGX3b_-uvQ!-295400618",
	        data: $("#jzxForm").serialize(),
	        success: function(msg) {
				if(msg.success){
					$("#jzxBody").show();
					var result = "您查询的集装箱当前最新状态：";
					var gjxxList = decode($.trim(msg.object),'3');

					if(isBlank(gjxxList)){
						result = "暂无您查询集装箱的最新状态<br/> ";
					} else {
						var obj = gjxxList[gjxxList.length - 1];
						result += " "+obj.xt;
						result += "，报告站："+obj.eventStation+"，报告时间："+obj.eventDate;
					}

					$("#jzxResult").html(result);
		        } else if(!msg.success){
					alert(msg.message);
				} 
				var obj = document.getElementById("captchaImage5");
	 			refreshCaptca(obj);
			}
		});
	}

	function shwoShkyDetail(){
		$("#shkyDialog").dialog("open");
	}

	function shwoPtxbDetail(){
		$("#ptxbDialog").dialog("open");
	}
	
	function shwoGtxbDetail(){
		$("#gtxbDialog").dialog("open");
	}

	function getTransDateAndTime(transDate,transTime){
		var fmtStr = transDate.substring(0,4)+"-"+transDate.substring(4,6)+"-"+transDate.substring(6);
		if(!isBlank(transTime)){
			fmtStr += " "+transTime.substring(0,2)+":"+transTime.substring(2,4)+":"+transTime.substring(4);
		}
		return fmtStr;
	}

	function getLcnr(orderTrack){
		var lcnr = orderTrack.ZTQRDW + " " +orderTrack.LCMC;
		var lczt = (orderTrack.LCZT == 1);
		if(orderTrack.LCBZ == 'XQSH' && !lczt){
			lcnr = '审核未通过';
		} else if(orderTrack.LCBZ == 'XQSH' && lczt){
			lcnr = '审核通过';
		} else if(orderTrack.LCBZ == 'SHJF' && !lczt){
			lcnr = '上货计费未通过';
		} else if(orderTrack.LCBZ == 'SHJF' && lczt){
			lcnr = '上货计费通过';
		} else if(orderTrack.LCBZ == 'HWJF' && !lczt){
			lcnr = '货物交付未完成';
		} else if(orderTrack.LCBZ == 'HWJF' && lczt){
			lcnr = '货物交付完成';
		} else if(orderTrack.LCBZ == 'CZZC' || orderTrack.LCBZ == 'ZZZC'){
			lcnr += "，车次： "+orderTrack.CHC+"，车号： " + orderTrack.CH; 
		} else if(orderTrack.LCBZ == 'JHKS'){
			lcnr = '接货开始,物流公司【'+orderTrack.ZTQRDW+'】,投递员【'+orderTrack.JCDW+'】,电话【'+orderTrack.JCR+'】,驾驶员【'+orderTrack.JSDW+'】,电话【'+orderTrack.JSR+'】,车牌号【'+orderTrack.CH+'】';
		} else if(orderTrack.LCBZ == 'JHWC'){
			lcnr = '接货完成';
		} else if(orderTrack.LCBZ == 'SHKS'){
			lcnr = '送货开始,物流公司【'+orderTrack.ZTQRDW+'】,投递员【'+orderTrack.JCDW+'】,电话【'+orderTrack.JCR+'】,驾驶员【'+orderTrack.JSDW+'】,电话【'+orderTrack.JSR+'】,车牌号【'+orderTrack.CH+'】';
		} else if(orderTrack.LCBZ == 'SHWC'){
			lcnr = '送货完成';
		} 
		lcnr=lcnr.replace(/undefined/g,"");
		lcnr=lcnr.replace(/null/g,"");
		return lcnr;
	}
	
    function clearForm(){
    	$("#infoBody,#gjxx,#shkyBody,#lcgjBody,#ptxbBody,#gtxbBody").hide();
        $("#carNo,#hph,#QUERY_CAPTCA,#QUERY_CAPTCA_2,#QUERY_CAPTCA_3,#QUERY_CAPTCA_4,#ddh,#fhrsjhm,#ptxbdh,#gtxbdh").val("");
    }
    
    $(function(){
    	$("#tabs").tabs();
    	$("#carNo").focus();

    	$("#ptxbDialog").dialog({
            autoOpen: false,
            position: "center",
            show: "blind",
            width: 520
        });
    	$("#gtxbDialog").dialog({
            autoOpen: false,
            position: "center",
            show: "blind",
            width: 520
        });
    	$("#shkyDialog").dialog({
            autoOpen: false,
            position: "center",
            show: "blind",
            width: 570
        });
    	
    	$("input").keypress(function(e){
	        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode; 
	        if (keyCode == 13) {
	            if($(this).attr("id")=="QUERY_CAPTCA") {
	                hwzz();
	                return false;
	            } else if($(this).attr("id")=="QUERY_CAPTCA_2") {
	                shky();
	                return false;
	            } else if($(this).attr("id")=="QUERY_CAPTCA_4") {
	                ptxb();
	                return false;
	            } else if($(this).attr("id")=="QUERY_CAPTCA_3") {
	                gtxb();
	                return false;
	            } else if($(this).attr("id")=="QUERY_CAPTCA_5") {
	                jzx();
	                return false;
	            }
	            for (var i = 0; i < this.form.elements.length; i++) {
	                if (this == this.form.elements[i]) break;
	            }
	            i = (i + 1) % this.form.elements.length;
	            this.form.elements[i].focus();
	            return false;
	        } else {
	            return true;
	        }
        });
    });
   function goDzsw(obj){
			window.location.href=document.getElementById("dzsws").options[obj.selectedIndex].value;
		}