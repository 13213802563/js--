var channelCode;
var istime=false
$(function () {

    if(getQueryString("channelCode")){
        channelCode=getQueryString("channelCode")
    }else{
        channelCode=432454642096150
    }
    //    注册按钮置灰显示
    $("body").delegate("input", "input", function() {
        jzjyFunction.delegate($('#mobile').val().length ==11 && $('#vercode').val().length == 6 && $('#password').val().length > 5)
    })
})
//密码展示隐藏
$("#eyes").on("click",function () {
    jzjyFunction.password($("#eyes"))
})
//验证码
$("#time").on('click', function() {
    if(istime)return;
    istime=true;
    jzjyFunction.time($("#mobile").val(),$("#time"),function () {
        if(data.code == '-1') {
            tanwin(data.msg);
            istime = false;
            return
        }
    })
})
//    注册家政家园协议
$(".button button").on("click",function () {
    if(!$("#mobile").val()) {
        tanwin("请输入手机号码");
        return
    } else if(!(/^(13|15|16|18|14|17|19)\d{9}$/i.test($("#mobile").val()))) {
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
                    key:193483637856680,
                    mobile:$("#mobile").val(),
                    verifyCode:$("#vercode").val(),
                    passWord:$("#password").val(),
                    channelCode:channelCode,
                },
            },
            function(data) {
                if(data.code=='0'){
                    if(getQueryString("channelCode")&&getQueryString("channelCode")!="432454642096150"){
                        tanwin("注册成功","",function () {
                            goto("/jzjy-wechat/extension/download/index1.html")
                        })

                    }else{
                        tanwin("注册成功","",function () {
                            goto("/jzjy-wechat/signin.html")
                        })


                    }

                }else if(data.code=='-1'){
                    if(data.msg=='该手机号已注册，立即登录？'){
                        $.confirm({
                            title: '',
                            text: data.msg,
                            onOK: function () {
                                goto("/jzjy-wechat/signin.html")
                            },
                            onCancel: function () {
                            }
                        });
                    }else{
                        tanwin(data.msg)
                    }
                    jzjyFunction.removerInter()
                    $('#time').html('重新获取');
                    istime = false;
                }
            })
    }
})

/*协议*/
$(".disclaimer").on("click","#disclaimer",function() {
    $('.xieyi').show();
    $('.yinsi').hide();
})
$(".disclaimer").on("click","#yinsi",function() {
    $('.yinsi').show();
    $('.xieyi').hide();
})
