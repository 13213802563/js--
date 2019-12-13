//channelCode  判断各个渠道进登录
$(function() {
	/*var timer = "";
	var nums = 60;
	var validCode = true; //定义该变量是为了处理后面的重复点击事件*/
	$(".verCode-img").on("click", "", function() {
		$(".verCode-img img").attr("src", "/apidisp/verification/img/20020003/jzjy?" + new Date());
		return false;
	})

	/*验证码*/
	$('#time').on('click', function() {
		// if(!$("#imgVerCode").val()) {
		// 	tanwin("请输入计算结果");
		// 	return;
		// }
		if($("#phonenum").val() == "") {
			tanwin("请输入手机号码");
		}
		else {
			var timer;
			var time = 60;
			/*图片验证*/
			jzjy.ajax({
				params: {
					mobile: $('#phonenum').val(),
					type: 1,
					//veriCode: $("#imgVerCode").val(),
					pro: "jzjy",
					terminal: "20020003"
				},
				async: false,
				url: "personnelApp/verificationCode"
			}, function(data) {
				/*console.log(data)*/
				if(data.code == '-1') {
					tanwin(data.msg);
                    //$(".verCode-img img").attr("src", "/apidisp/verification/img/20020003/jzjy?" + new Date());
					return;
				}else if (data.code==0){
                    /*是否显示邀请码输入框*/
                    jzjy.newAjax({
                        params: {
                            mobile: $('#phonenum').val(),
                            key: 992996421381895

                        },
                        async: false
                    }, function(data) {
                        if(data.code == 0) {
                            if(data.data.erpCode==false){
                                $("#yqm").hide()
                            }else{
                                $("#yqm").show()
                            }
                            if(data.data.isLogin==false){
                                $(".disclaimer").hide();
                            }else{
                                $(".disclaimer").show();
                                _localStorage.setItem('new-prize',"1");
                            }
                        }
                        console.log(data)
                    });

					//$(".verCode-img img").attr("src", "/apidisp/verification/img/20020003/jzjy?" + new Date());
					timer = setInterval(function() {
						time--;
						if(time == 0) {
							clearInterval(timer);
							$('#time').val("获取验证码");
							$('#time').attr("disabled", false);
						} else {
							$('#time').val(time + "秒后重试");
							$('#time').attr("disabled", true);
						}
					}, 1000)
				}
			});
			/*是否显示协议*/
			// jzjy.newAjax({
			// 	params: {
			// 		mobile: $('#phonenum').val(),
			// 		key: 517026075718727
			// 	},
			// 	async: false
			// }, function(data) {
			// 	console.log(data)
			// 	if(data.code == 0) {
			// 		if(data.msg == "false") {
			// 			$(".disclaimer").hide();
			// 		} else {
			// 			$(".disclaimer").show()
			// 		}
			// 	}
            //
			// })
		}

	})

	/*协议*/
	$(".disclaimer").on("click","#disclaimer",function() {
        $('.xieyi').show();
	})

	/*登录按钮*/
	$(".signin-but").on("click", function() {
        _czc.push(['_trackEvent','微站', '登录按钮'])
		var inviteCode = $('#inviteCode').val();
		var vercode = $('#vercode').val();
		var phonenum = $('#phonenum').val().trim();
		if($(".disclaimer").css("display")!="none") {
			if(!$('#checkbox').is(':checked')) {
				tanwin("请勾选协议");
				return;
			}
		}
		if(phonenum == "") {
			tanwin("您还没有输入手机号码");
			return;
		} else if(!(/^(13|15|16|18|14|17|19)\d{9}$/i.test(phonenum))) {
			tanwin("请输入正确的手机号");
			return;
		} else if(phonenum==$("#inviteCode").val().trim()){
            tanwin("您输入的邀请码和手机号不能相同");
            return;
		}else if(vercode == '') {
			tanwin("您还没有输入验证码");
			return;
		} else {
			/* 判断从各个渠道进登录*/
			if(getQueryString("channelCode")){
                var params={
                    mobile: phonenum,
                    type: 1,
                    verifcode: vercode,
                    channelCode:getQueryString("channelCode")
                };
			}else{
                var params={
                    mobile: phonenum,
                    type: 1,
                    verifcode: vercode,
                    channelCode:"432454642096150"
                };
			}

			if($("#inviteCode").val()){
                if(!(/^(13|15|18|14|17|16|19)\d{9}$/i.test(inviteCode))){
                    tanwin("请输入11位有效邀请码");
                    return;
				} 
				params.invitationCode=$("#inviteCode").val()
			}


			jzjy.ajax({
				params:params,
				async: false,
				url: "personnelApp/login"
			}, function(data) {
				console.log(data);
				if(data.code == -1) {
					tanwin(data.msg);
					return;
				}  else {
					// 设置值
					if(_localStorage.getItem("new-prize")=="1"){
                        _localStorage.setItem('new-prize',"2");
					}
                    _localStorage.setItem('token', data.data.token);
                    _localStorage.setItem('mobile', phonenum);
                    _localStorage.setItem("verity", data.data.verify);
                    _localStorage.setItem("isHopeCityDisPlay", data.data.isHopeCityDisPlay);
                    if(getQueryString("template")){
                        window.location.href = 'my.html?template='+getQueryString("template");
					}else if(getQueryString("channelCode")&&getQueryString("channelCode")!='432454642096150'){
                        window.location.href='extension/download/index1.html'
					}else if(getQueryString("url")){
                        window.location.href=getQueryString("url")
					}else if(getQueryString("invite-prizes")){
                        window.location.href='extension/invite-prizes/invite-prizes.html?token='+jzjy.getToken()
					}
					else{
                        window.history.back(-1);
					}
				}
			});
		}
	})
})