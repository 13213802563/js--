var obj = {};
var istime=false
$(function() {
    //按钮置灰显示
    $("body").delegate("input", "input", function() {
        jzjyFunction.delegate(($('.phonenum').val().length==11&&$('#vercode').val()&&$('#vercode').val().length==6)||($('.phonenum').val().length==11&&$('#password').val().length>5&&$('#password').val()))
    })
    $('#tools-btn').hide()
	$('.signinLi>div').hide();
	$('.signinLi>div:first').show();
	$('.signinTitle>li p').eq(0).show().siblings().hide();
	$('.signinTitle>li').eq(0).css({
		"font-weight": "700",
		// "border-bottom": "1px solid red"
	}).siblings().css({
        "font-weight": "500",
		"border-bottom": "0"
	})
	$('.signinTitle>li').click(function() {
        $('.button button').css('background-image', 'url(/jzjy-wechat/images/accountSecurity/prohibit@3x.png)');
        $('#vercode').val("")
        $('#password').val("")
        obj={}

		$('.signinTitle>li').eq($(this).index()).css({
            "font-weight": "700",
		}).siblings().css({
            "font-weight": "500",
			"border-bottom": "0"
		})
		 $('.signinTitle>li p').eq($(this).index()).show().parent().siblings().children('p').hide()
		$('.signinLi>div').eq($(this).index()).show().siblings().hide();

        //判断显示隐藏注册和忘记密码入口 高长浩
		if($(this).text() == '手机号登录' || $(this).text() == '短信登录'){
			$('#tools-btn').hide()
		}else{
			$('#tools-btn').show()
		}
	})
})
//密码展示隐藏
$("#eyes").on("click",function () {
    jzjyFunction.password($("#eyes"))
})
//获取验证码
$("#time").on('click', function() {
    if(istime)return;
    istime=true;
    jzjyFunction.times($(".phonenum").val(),function (data) {
    	console.log(data)
        if(data.code == '-1') {
            $.confirm({
                title: '',
                text: data.msg,
                onOK: function () {
                    //点击确认
                    if(getQueryString("channelCode")){
                        goto("html/signin/register.html?channelCode="+getQueryString("channelCode"))
                    }else{
                        goto("html/signin/register.html")
                    }
                },
                onCancel: function () {
                }
            });

            return
        }
    })
})
/*登录按钮*/
$(".button button").on("click", function() {
	_czc.push(['_trackEvent', '微站', '登录按钮'])
	if(!$('.phonenum').val()) {
		tanwin("您还没有输入手机号码");
		return;
	} else if(!(/^(13|15|16|18|14|17|19)\d{9}$/i.test($('.phonenum').val()))) {
		tanwin("请输入正确的手机号");
		return;
	}
	if($(".password").css("display") == 'none') {
		if(!$('#vercode').val()) {
			tanwin("您还没有输入验证码");
			return;
		}
	} else if($(".verCode").css("display") == 'none') {
		if(!$('#password').val()) {
			tanwin("您还没有输入密码");
			return;
		}else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test($("#password").val()))) {
            tanwin("请输入6-12位字母和数字组合的密码")
            return;
        }
	}
	/* 登录方式  type1验证码   2  密码登录*/
	if($(".password").css("display") == 'none') {
		obj.type = '1';
		obj.verifcode = $('#vercode').val()
		console.log(obj)
	} else {
		obj.type = '2';
		obj.passWord = $('#password').val()
		console.log(obj)

	}

	if(getQueryString("channelCode")) {
		obj.channelCode = getQueryString("channelCode")
        obj.mobile = $('.phonenum').val()
		console.log(obj)

	} else {
		obj.mobile = $('.phonenum').val()
		obj.channelCode = '432454642096150'

	}

	jzjy.ajax({
		params: obj,
		url: "personnelApp/fastLogin"
	}, function(data) {
		if(data.code == '-1') {
			if(data.msg=='该手机号未注册，立即注册？'){
                $.modal({
                    title: "",
                    text: data.msg,
                    buttons: [
                        { text: "取消", onClick: function(){ console.log(1)} },
                        { text: "注册",className: "default", onClick: function(){
                            if(getQueryString("channelCode")){
                                goto("html/signin/register.html?channelCode="+getQueryString("channelCode"))
                            }else{
                                goto("html/signin/register.html")
                            }
                        }
                        }
                    ]
                });
			}else{
                tanwin(data.msg)
			}
            obj={};
            jzjyFunction.removerInter()
            $('#time').html('重新获取');
            istime = false;
            return;
		} else if(data.code=='0'){
		    tanwin("登录成功","",function () {
                _localStorage.setItem('userId',data.data.userId)
                _localStorage.setItem('token', data.data.token);
                _localStorage.setItem('verity', data.data.verify);
                _localStorage.setItem('mobile', $(".phonenum").val());
                _localStorage.setItem('isPopWindow', data.data.isPopWindow);
                _localStorage.setItem("isHopeCityDisPlay", data.data.isHopeCityDisPlay);
                if(getQueryString("template")) {
                    window.location.href = 'my.html?template=' + getQueryString("template");
               } else if(getQueryString("url")) {
                    window.location.href = getQueryString("url")
                } else if(getQueryString("type")=='1') {
                    goto("my.html")
                } else if(getQueryString("invite-prizes")) {
                    window.location.href = 'extension/invite-prizes/invite-prizes.html?token=' + jzjy.getToken()
                }
                else {
                    if(window.parent.document.referrer){
                        if(data.data.flag=='01'){//首次登录设置密码
                            goto("html/my/accountSecurity/setPassword.html")
                        }else{
                            if( window.parent.document.referrer.indexOf("jzjy-wechat/html/signin")!=-1||window.parent.document.referrer.indexOf("signin.html") != -1 ) {
                                goto("my.html")
                            }else{
                                self.location=document.referrer;//返回上一个页面并刷新
                            }
                        }
                    }else{
                        // 设置值
                        if(data.data.flag=='01'){//首次登录设置密码
                            goto("html/my/accountSecurity/setPassword.html")
                        }else{
                            if( window.parent.document.referrer.indexOf("jzjy-wechat/html/signin")!=-1||window.parent.document.referrer.indexOf("signin.html") != -1 ) {
                                goto("my.html")
                            }else{
                                self.location=document.referrer;//返回上一个页面并刷新
                            }
                        }
                    }
                }

            })

		}
	});
})

$(".button a:first-child").on("click",function () {
    if(getQueryString("channelCode")){
    	goto("html/signin/retrievePassword.html?channelCode="+getQueryString("channelCode"))
    }else{
        goto("html/signin/retrievePassword.html")
	}
})
$(".header a").on("click",function () {
    if(getQueryString("channelCode")){
        goto("html/signin/register.html?channelCode="+getQueryString("channelCode"))
    }else{
        goto("html/signin/register.html")
	}
})
//返回
$("#lo_left").on("click",function () {
        if( window.parent.document.referrer.indexOf("jzjy-wechat/html/signin")!=-1||window.parent.document.referrer.indexOf("signin.html") != -1 ) {
            goto("my.html")
        }else{
            if(document.referrer.toString().indexOf('?') === -1){
                self.location = document.referrer + '?v=' + (new Date().getTime());
            }else{
                self.location = document.referrer + '&v=' + (new Date().getTime());
            }
        }
})
