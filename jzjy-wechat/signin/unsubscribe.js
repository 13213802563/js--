var istime=false
//获取注销提示
$(function () {
    jzjy.newAjax({
            params: {
                key: 210960409626312,
                token: jzjy.getToken()
            },
            async: false
        },
        function (data) {
            if(data.code == '0'){
                var list = data.data;
                var html = "";
                var t=''
                for(var i = 0; i < list.length; i++) {
                    html += '<li><div><p></p><p>'+list[i].title+'</p></div><div>'
                    for(var j = 0; j < list[i].content.length; j++) {
                        if(list[i].content[j].indexOf("####")!=-1){
                            t=list[i].content[j].replace(/####/ig,'<span style="color: #fc4949;">'+jzjy.getMobile()+'</span>')
                        }else{
                            t=list[i].content[j]
                        }
                        html += '<p>' + t + '</p>'
                    }
                    html+='</div></li>'
                }
                $("ul").html(html);
            }else if(data.code=="-1"){
                tanwin(data.msg);
            }
        })
})
//        注销协议的状态
$("#checkImg").on("click", function () {
    if ($("#checkImg").attr('src') == '../../images/accountSecurity/choose@2x.png') {
        $("#checkImg").attr('src', '../../images/accountSecurity/no_choice@2x.png');
        $('.button button').css('background-image', 'url(/jzjy-wechat/images/accountSecurity/prohibit@3x.png)');
        $('.button button').attr('disabled', 'true')

    } else {
        $("#checkImg").attr('src', '../../images/accountSecurity/choose@2x.png');
        if($("#vercode").val().length=="6"){
            $('.button button').css('background-image', 'url(/jzjy-wechat/images/accountSecurity/btn@3x.png)');
            $('.button button').removeAttr('disabled')
        }else{
            $('.button button').css('background-image', 'url(/jzjy-wechat/images/accountSecurity/prohibit@3x.png)');
            $('.button button').attr('disabled', 'true')
        }
    }
})

$("body").delegate("input", "input", function() {
    if($("#vercode").val().length=="6"&&($("#checkImg").attr('src') == '../../images/accountSecurity/choose@2x.png')){
        $('.button button').css('background-image', 'url(/jzjy-wechat/images/accountSecurity/btn@3x.png)');
        $('.button button').removeAttr('disabled')
    }else{
        $('.button button').css('background-image', 'url(/jzjy-wechat/images/accountSecurity/prohibit@3x.png)');
        $('.button button').attr('disabled', 'true')
    }
})

//    获取验证码
$("#time").on('click', function() {
    if(istime)return;
    istime=true;
    jzjyFunction.time(jzjy.getMobile(),$("#time"),function () {
        if(data.code == '-1') {
            tanwin(data.msg);
            istime = false;
            jzjyFunction.removerInter()
            $('#time').html('重新获取');
            return
        }
    })
})


//确认注销
$('#button').on('click', function () {
    // if (!$("#vercode").val()) {
    //     tanwin("验证码不能为空");
    //     return;
    // } else if ($("#checkImg").attr('src') == '../../images/accountSecurity/no_choice@2x.png') {
    //     tanwin("请勾选同意放弃，再确认注销");
    //     return;
    // } else {
        jzjy.newAjax({
                params: {
                    key: 810464220994840,
                    token: jzjy.getToken(),
                    mobile: jzjy.getMobile(),
                    verifyCode: $('#vercode').val()
                },
            },
            function (data) {
                if (data.code == '0') {
                    $.alert({
                        title: '',
                        text:"注销成功",
                        onOK: function () {
                            localStorage.clear();
                            window.location.href = '../../my.html'
                        }
                    });
                }else if(data.code=='-1'){
                    $("#loading").hide()
                    tanwin(data.msg)
                    jzjyFunction.removerInter()
                    $('#time').html('重新获取');
                    istime = false;
                }
            })
    //}
})