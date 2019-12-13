var istime=false
$(function () {
    //    注册按钮置灰显示
    $("body").delegate("input", "input", function() {
        jzjyFunction.delegate($('.phonenum').val().length ==11 && $('#vercode').val().length == 6 && $('#password').val().length > 5)
    })
})
//    密码展示隐藏
$("#eyes").on("click",function () {
    jzjyFunction.password($("#eyes"))
})
//验证码
$("#time").on('click', function() {
    jzjyFunction.time($(".phonenum").val(),$("#time"),function () {
        if(data.code == '-1') {
            tanwin(data.msg)
        }
    })
})
//    确认修改密码
$(".button button").on("click",function () {
    if(!$(".phonenum").val()) {
        tanwin("请输入手机号码");
        return
    } else if(!(/^(13|15|16|18|14|17|19)\d{9}$/i.test($(".phonenum").val()))) {
        tanwin("请输入正确的手机号");
        return;
    }else if(!$("#vercode").val()) {
        tanwin("请输入您的验证码");
        return;
    }else if(!$("#password").val()) {
        tanwin("请输入密码验证");
        return;
    }else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test($("#password").val()))) {
        tanwin("请输入6-12位字母和数字组合的密码")
        return;
    }else{
        jzjy.newAjax({
                params: {
                    key:369496262952216,
                    mobile:$(".phonenum").val(),
                    verifyCode:$("#vercode").val(),
                    firstPwd:$("#password").val(),
                    type:3,
                },
            },
            function(data) {
                console.log(data)
                if(data.code=='0'){
                    if(getQueryString("channelCode")){
                        $.alert({
                            title: '',
                            text: data.msg,
                            onOK: function () {
                                goto("/jzjy-wechat/signin.html?channelCode="+getQueryString("channelCode"))
                            },
                            onCancel: function () {
                            }
                        });
                    }else{
                        $.alert({
                            title: '',
                            text: data.msg,
                            onOK: function () {
                                goto("/jzjy-wechat/signin.html")
                            },
                            onCancel: function () {
                            }
                        });
                    }
                }else if(data.code=='-1'){
                    tanwin(data.msg)
                    jzjyFunction.removerInter()
                    $('#time').html('重新获取');
                    istime = false;
                }
            }
        )
    }
})
