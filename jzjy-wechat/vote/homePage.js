$(window).resize(function () {
    if ($('.index-footer').css("position") != "static") {
        $('.index-footer').css({
            'position': 'static'
        })
    } else {
        $('.index-footer').css({
            'position': 'fixed'
        })
    }
    if ($('.clons').css("position") != "static") {
        $('.clons').css({
            'position': 'static'
        })
    } else {
        $('.clons').css({
            'position': 'fixed'
        })
    }
});


$("body").scroll(function () {
    //已经滚动到上面的页面高度
    var scrollTop = $(this).scrollTop();
    //页面高度
    var scrollHeight = $(document).height() - 50;
    //浏览器窗口高度
    var windowHeight = $(this).height();
    //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
    if (scrollTop + windowHeight >= scrollHeight) {
        if (loading) return;
        loading = true;

        setTimeout(function () {
            if (loadOrder.page.maxPage > loadOrder.page.curPage) {
                loadOrder.allOrder(loadOrder.page.curPage + 1, loadOrder.page.pageCount);
            }
            loading = false;
        }, 2000);
    }
});
localStorage.setItem('isClick', 'no') // 连点
$(".index-footer li:last-child p").html("排名")
var activityId = getQueryString("activityId");
if (!activityId) {
    activityId = '385303394984809';
}
_localStorage.setItem("activityId", activityId);
var token = getQueryString("token");
var personId;
var empid, empData;
var isLogin;
var personIdInfo;
var mobile;
var idInfo;
var isEnroll = false;
$("#hiddenBtn").on("click", function () {

    try{
        bridgeObj.deliverOauthCode(function (result) {
            if (JSON.parse(result).token && JSON.parse(result).token !== '(null)' && JSON.parse(result).token !== 'null' && JSON.parse(result).token !== 'undefined') {
                token = JSON.parse(result).token;
                // if (window.location.href.indexOf('token') === -1) {
                //     window.location.href = window.location.href.indexOf('?') > 0 ? window.location.href + '&token=' + token : window.location.href + '?token=' + token
                // }
                let _data = function(){
                    return Object.assign({},encrypto.commonParam,{
                        key: 254149593116151,
                        token: token,
                        activityId: '385303394984809'
                    })
                }
                if(window.location.href.indexOf('null')>0 ){
                    window.location.href = window.location.href.substr(window.location.href,window.location.href.lastIndexOf('?')) + '?token=' + token
                }
                if(window.location.href.indexOf('time') > 0){
                    window.location.href = window.location.href.substr(window.location.href,window.location.href.lastIndexOf('?')) + '?token=' + token

                }
            }
        })
    }catch (e) {

    }

})

if(navigator.userAgent.toLowerCase().indexOf('android')){
    setTimeout(function () {
        bridgeObj.deliverOauthCode(function (result) {
            if (JSON.parse(result).token && JSON.parse(result).token !== '(null)' && JSON.parse(result).token !== 'null' && JSON.parse(result).token !== 'undefined') {
                token = JSON.parse(result).token;
                // if (window.location.href.indexOf('token') === -1) {
                //     window.location.href = window.location.href.indexOf('?') > 0 ? window.location.href + '&token=' + token : window.location.href + '?token=' + token
                // }
                let _data = function(){
                    return Object.assign({},encrypto.commonParam,{
                        key: 254149593116151,
                        token: token,
                        activityId: '385303394984809'
                    })
                }
                if(window.location.href.indexOf('null')>0 ){
                    window.location.href = window.location.href.substr(window.location.href,window.location.href.lastIndexOf('?')) + '?token=' + token
                }
                if(window.location.href.indexOf('time') > 0){
                    window.location.href = window.location.href.substr(window.location.href,window.location.href.lastIndexOf('?')) + '?token=' + token

                }
            }
        })
    },1500)
}

if(getQueryString('token') && navigator.userAgent.toLowerCase().indexOf('iphone') !== -1 && window.location.href.indexOf('null') !== -1){
    let _data = function(){
        return Object.assign({},encrypto.commonParam,{
            key: 254149593116151,
            token: getQueryString('token'),
            activityId: '385303394984809'
        })
    }
    $.ajax({
        url:'/apidisp/toWorker/dispatcher',
        type:'post',
        data:{
            body:encrypto.aesEncrypto(_data())
        },
        dataType:'json',
        async:false,
        success(data){
            if (data.code == 0) {
                var list = data.data.list;
                empData = data;
                empid = data.data.list[0].empId;
                idInfo = list[0].id;
                personIdInfo = empid
                _localStorage.setItem('personId', empid);
                _localStorage.setItem('id', list[0].id);
                _localStorage.setItem('status', list[0].status);
                console.log(list)
                if (list.length > 0) {
                    $(".personal").show();
                    $(".button").hide();
                    $(".enrollNum").html(data.data.enrollNum);
                    $(".voteNum").html(data.data.voteNum);
                    if (data.end.end == 1) {
                        if (list[0].status == 1) { //审核中
                            var html = ""
                            html += '<img src="' + list[0].cover + '"/>' +
                                '<p style="margin-left: .2rem;">' + list[0].name + '</p>' +
                                '<p>' + list[0].code + '号</p>' +
                                '<div class="state">' + list[0].statusName + '</div>' +

                                '<div class="modify">编辑</div>'
                            $(".personal").html(html)
                        }
                        if (list[0].status == 2) { //审核成功
                            var html = ""
                            html += '<img src="' + list[0].cover + '"/>' +
                                '<p>' + list[0].name + '</p>' +
                                '<p>' + list[0].code + '号</p>' +
                                '<div class="state">' + list[0].voteNum + '票</div>' +
                                '<div class="share" onclick="shareAward()">我要拉票</div>'
                            $(".personal").html(html);

                        }
                        if (list[0].status == 3) { //审核失败
                            var html = "";
                            html += '<img src="' + list[0].cover + '"/>' +
                                '<p>' + list[0].name + '</p>' +
                                '<p>' + list[0].code + '号</p>' +
                                '<div class="state" style="color:#FF1F73;">' + list[0].statusName + '</div>' +
                                '<img src="../../images/wenhao@3x.png" style="width:5%; height: .4rem;" class="errorimg"/>' +

                                '<div class="modify">重新编辑</div>'
                            $(".personal").html(html);
                            $(".errorimg").on("click", function () {
                                var text = list[0].rejectReason
                                $.alert({
                                    title: '',
                                    text: text,
                                    onOK: function () {
                                        //点击确认
                                    }
                                })

                            })
                        }
                    }
                    if (data.end.end == 2) { //活动结束
                        if (list[0].isPrize == 1) {
                            var html = ""
                            html += '<img src="' + list[0].cover + '"/>' +
                                '<p>' + list[0].name + '</p>' +
                                '<p>' + list[0].code + '号</p>' +
                                '<div class="state">' + list[0].voteNum + '票中奖</div>' +
                                '<div class="award">我要领奖</div>'
                            $(".personal").html(html)
                        }
                        if (list[0].isPrize == 2) {
                            var html = ""
                            html += '<img src="' + list[0].cover + '"/>' +
                                '<p>' + list[0].name + '</p>' +
                                '<p>' + list[0].code + '号</p>' +
                                '<div class="state" style="color:#FF1F73;">' + list[0].voteNum + '票未中奖</div>' +
                                '<div style=" border: 0 !important; color:#000;">下次加油！</div>'
                            $(".personal").html(html);
                        }
                        isEnroll = false
                        loadOrder.isEnd = true;

                    }

                }
            } else if (data.code == "-1") {
                $(".button").show();
                $(".personal").hide();
                if (data.end.end == 2) {
                    loadOrder.isEnd = true;
                }
            }
        },
        error(err){
            alert(err)
        }
    })
}


$(function () {
    $("#searchName").val("");
    if (jzjy.isWechat()) {
        if (jzjy.getToken()) {
            token = jzjy.getToken();
            info()
        } else {
            $(".button").show();
            $(".personal").hide()
        }
    } else {
        if (token === 'null' && token === 'undefined' && token === '(null)') {
            $(".button").show();
            $(".personal").hide()
        } else {
            token = getQueryString("token");
            $("#hiddenBtn").click()
            // info()
        }
    }

    loadOrder.allOrder(1, 10);


    $(".search button").on("click", function () {
        var name = $("#searchName").val();
        if (name) {
            loadOrder.param = {
                seekContent: name
            };
        } else {
            loadOrder.param = {};
        }
        $(document.body).destroyInfinite();
        // loadOrder.initFinite();
        loadOrder.allOrder(1, 10);
    })
    $('#rule').on("click", function () {
        $('#rabaw').show(0, "lineear",
            jzjy.activityKey({
                params: {
                    key: 113369660560631
                },
                async: false,
                isLoad: "0"
            }, function (data) {
                console.log(data)
                var data = data.data;
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    var list = data[i].content;
                    html += '<h2>' + data[i].title + '</h2>'
                    for (var j = 0; j < list.length; j++) {
                        html += '<p>' + list[j] + '</p>'
                    }
                }
                $(".schedule_ul li").html(html)
            })
        );
    })

    $(".know_btn").on("click", function () {
        $('#rabaw').hide();
    })
    $("#rabaw").on("click", function () {
        $('#rabaw').hide();
    })
    /*倒计时*/
    jzjy.activityKey({
            params: {
                key: 715400229949959
            },
            async: false
        },
        function (data) {
            console.log(data)
            var mss;
            var exists = data.data.exists;
            var flag = data.data.flag;
            if (exists == true) {
                if (flag == 1) {
                    mss = data.data.overTime; //距离结束
                } else if (flag == 2) {
                    mss = data.data.remainingTime; //距离开始
                } else if (flag == 3) {
                    mss = 1000;
                }
                $(".button").show();
            }
            var SysSecond;
            var InterValObj;
            Countdowns();

            function Countdowns() {
                SysSecond = mss; //这里获取倒计时的起始时间(60分钟3600000毫秒 单位：毫秒)
                InterValObj = window.setInterval(SetRemainTime, 1000); //间隔函数，1秒执行
            }

            //将时间减去1秒，计算天、时、分、秒
            function SetRemainTime() {
                if (SysSecond > 0) {
                    SysSecond = SysSecond - 1000;
                    var days = Math.floor(SysSecond / (1000 * 60 * 60 * 24)); //天
                    var hours = Math.floor((SysSecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); //时
                    var minite = Math.floor(((SysSecond % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60)); //计算分
                    var second = Math.floor((((SysSecond % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) % (1000 * 60)) / 1000); // 计算秒
                    var daysZero = "";
                    var hoursZero = "";
                    var miniteZero = "";
                    var seconedZero = "";
                    if (days < 10) {
                        daysZero = "0";
                    }
                    if (hours < 10) {
                        hoursZero = "0";
                    }
                    if (minite < 10) {
                        miniteZero = "0";
                    }
                    if (second < 10) {
                        seconedZero = "0";
                    }
                    if (flag == 1) {
                        var html = ""
                        html += '<p>' + daysZero + days + '</p><span>天</span><p>' + hoursZero + hours + '</p><span>时</span><p>' + miniteZero + minite + '</p><span>分</span><p>' + seconedZero + second + '</p><span>秒</span>'
                        $("#remainTime").html(html);
                        $(".datatime p").html("距离活动结束还有");
                        //window.location.reload();
                    } else if (flag == 2) {
                        var html = ""
                        html += '<p>' + daysZero + days + '</p><span>天</span><p>' + hoursZero + hours + '</p><span>时</span><p>' + miniteZero + minite + '</p><span>分</span><p>' + seconedZero + second + '</p><span>秒</span>'
                        $("#remainTime").html(html);
                        $(".datatime p").html("距离活动开始还有");

                    } else {
                        var html = "";
                        html += '<p>' + daysZero + days + '</p><span>天</span><p>' + hoursZero + hours + '</p><span>时</span><p>' + miniteZero + minite + '</p><span>分</span><p>' + seconedZero + second + '</p><span>秒</span>'
                        $("#remainTime").html(html);
                        $(".datatime p").html("该活动结束");

                    }
                    //$("#remainTime	").html('距离开抢' + daysZero + days + "天" + hoursZero + hours + "时" + miniteZero + minite + "分" + seconedZero + second + "秒");
                } else { //剩余时间小于或等于0的时候，就停止间隔函数
                    window.clearInterval(InterValObj);
                    //这里可以添加倒计时时间为0后需要执行的事件
                }
            }
        })

    /*报名数投票数*/
    jzjy.activityKey({
            params: {
                key: 837909539257991,
                activityId: 385303394984809
            },
            async: false
        },
        function (data) {
            console.log(data)
            if (data.code == 0) {
                $(".enrollNum").html(data.data.enrollNum);
                $(".voteNum").html(data.data.voteNum);
            }
        })

    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad || browser.versions.android) {
        setTimeout(function () {
            if (jzjy.isWechat()) {
                if (jzjy.getToken()) {
                    info()
                }
            } else {
                bridgeObj.deliverOauthCode(function (result) {

                    mobile = JSON.parse(result).mobile;
                    if (token && token !== 'null' && token !== 'undefined' && token !== '(null)') {
                        token = JSON.parse(result).token;
                        info()
                    }

                });
            }

        }, 500)
    } else {
        if (jzjy.getToken()) {
            info()
        }

    }

    $("#rgbn").on("click", function () {
        $("#rgbn").hide()
    })

    //登录
    /*获取验证码*/
    $('#time').on('click', function () {
        if ($("#phonenum").val() == "") {
            tanwin("请输入手机号码");
        } else {
            var timer;
            var time = 60;
            jzjy.ajax({
                params: {
                    mobile: $('#phonenum').val(),
                    type: 1,
                    pro: "jzjy",
                    terminal: "20020003"
                },
                async: false,
                url: "personnelApp/verificationCode",
                isLoad: "0"
            }, function (data) {
                /*console.log(data)*/
                if (data.code == '-1') {
                    tanwin(data.msg)
                } else if (data.code == '-2') {
                    tanwin('错误')
                } else if (data.code == "0") {
                    timer = setInterval(function () {
                        time--;
                        if (time == 0) {
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

        }
    })
    $("#vercode").on("click", function (e) {
        e.stopPropagation();
    })
    /*登录*/
    $(".vote-sigin").on("click", function () {
        var vercode = $('#vercode').val();
        var phonenum = $('#phonenum').val();
        if (phonenum == "") {
            tanwin("您还没有输入手机号码");
        } else if (!(/^(13|15|18|14|17|16|19)\d{9}$/i.test(phonenum))) {
            tanwin("请输入正确的手机号");
        } else if (vercode == '') {
            tanwin("您还没有输入验证码")
        } else {
            var params = {
                mobile: phonenum,
                type: 1,
                verifcode: vercode,
                channelCode: '432454642096150'
            };
            jzjy.ajax({
                params: params,
                async: false,
                url: "personnelApp/login",
                isLoad: "0"
            }, function (data) {
                console.log(data);
                if (data.code == -1) {
                    tanwin(data.msg);
                    return;
                } else {
                    // 设置值
                    _localStorage.setItem('token', data.data.token);
                    if (!jzjy.getToken()) {
                        token = data.data.token;
                    }

                    _localStorage.setItem('mobile', phonenum);
                    _localStorage.setItem("verity", "0");
                    if (data.data.verify == "1") {
                        //需要验证
                        _localStorage.setItem("verity", "1");
                    }
                    $(".vote-login").hide();
                    $("body").css("overflow", "initial");
                    window.location.reload();
                    isEnroll = false
                }
            });
        }
    });

    if (empData && empData.end.end == 1 && empData.data.list[0].status == 2) {
        jzjy.ajax({
            url: "weChat/signature",
            async: false,
            params: {
                url: window.location.href.split("#")[0]
            },
            isLoad: "0"
        }, function (data) {
            if (data.code == "-2") {
                console.log(data);
            } else {
                if (data.code == "0") {
                    var nonceStr = data.data.nonceStr;
                    var timestamp = data.data.timestamp;
                    var signature = data.data.signature;
                    wx.config({
                        debug: false,
                        appId: data.data.appId,
                        timestamp: timestamp,
                        nonceStr: nonceStr,
                        signature: signature,
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'hideMenuItems'
                        ]
                    });
                    var shareData = {
                        title: "我是【" + empData.data.list[0].name + "】，正在参加【家政日服务人员评选大赛】",
                        content: "赢万元现金大奖，还有现金红包抢到手软！还不快来！",
                        // pic:  empData.data.list[0].cover?empData.data.list[0].cover:'http://erp.95081.com/img/img/2019/01/02/dddca91df1d74efeb525e1b054ee458f.jpg',
                        pic: 'http://erp.95081.com/img/img/2019/01/02/dddca91df1d74efeb525e1b054ee458f.jpg',
                        url: jzjy.shareVoteUrl + "?empid=" + empData.data.list[0].empId + "&token=" + jzjy.getToken()
                    }
                    registeEvent(shareData);
                }
            }
        })
    } else {
        jzjy.ajax({
            url: "weChat/signature",
            async: false,
            params: {
                url: window.location.href.split("#")[0]
            },
            isLoad: "0"
        }, function (data) {
            if (data.code == "-2") {
                console.log(data);
            } else {
                if (data.code == "0") {
                    var nonceStr = data.data.nonceStr;
                    var timestamp = data.data.timestamp;
                    var signature = data.data.signature;
                    wx.config({
                        debug: false,
                        appId: data.data.appId,
                        timestamp: timestamp,
                        nonceStr: nonceStr,
                        signature: signature,
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'hideMenuItems'
                        ]
                    });
                    var shareData = {
                        title: "【家政日服务人员评选大赛】",
                        content: "赢万元现金大奖，还有现金红包抢到手软！还不快来！",
                        pic: 'http://erp.95081.com/img/img/2019/01/02/dddca91df1d74efeb525e1b054ee458f.jpg',
                        // pic:  empData.data.list[0].cover?empData.data.list[0].cover:'http://erp.95081.com/img/img/2019/01/02/dddca91df1d74efeb525e1b054ee458f.jpg',
                        url: jzjy.shareVoteIndexUrl
                    }
                    registeEvent(shareData);
                }
            }
        })
    }
})

/*我要报名*/

$(".signUp button").on("click", function () {
    if (isEnroll) return;
    isEnroll = true;
    if (loadOrder.isEnd) {
        tanwin("活动已结束");
        isEnroll = false
        return;
    }
    if (jzjy.isWechat()) {
        if (jzjy.getToken()) {
            servicePersonal()
            isEnroll = false
        } else {
            $(".vote-login").show();
            $(".vote-title").html('登录后即可报名');
            $(".vote-login").css("z-index", 100);
            $("body").css("overflow", "hidden");
            isEnroll = false
        }
    } else {
        $(".vote-login").hide();
        console.log('点了')
        bridgeObj.deliverOauthCode(function (result) {
            console.log('进方法')
            if (JSON.parse(result).token && JSON.parse(result).token !== '(null)' && JSON.parse(result).token !== 'null' && JSON.parse(result).token !== 'undefined') {
                token = JSON.parse(result).token;
                mobile = JSON.parse(result).mobile;
                servicePersonal()
                if(navigator.userAgent.toLowerCase().indexOf('android') > 0){
                    info()
                }
            } else {
                if (localStorage.getItem('isClick') === 'yes') {// 连点
                    return false;
                }
                localStorage.setItem('isClick', 'yes')// 连点
                bridgeObj.redirectToLogin({
                    'isLogin': 'false',
                }, function (responseData) {
                    localStorage.setItem('isClick', 'no')// 连点
                    bridgeObj.deliverOauthCode(function (result) {
                        if (JSON.parse(result).token && JSON.parse(result).token !== '(null)' && JSON.parse(result).token !== 'null' && JSON.parse(result).token !== 'undefined') {
                            token = JSON.parse(result).token;

                        }
                    })
                })
                window.location.href = window.location.href.indexOf('?') > 0 ? window.location.href + '&time=1' : window.location.href + '?time=1'

            }

        });
        isEnroll = false
    }


})
//微站关闭登录
$(".clons img").on("click", function () {
    $(".vote-login").hide();
    $("body").css("overflow", "initial");
    isEnroll = false
})
//个人信息编辑
$(".homePage .personal").on("click", ".modify", function () {
    jzjy.activityKey({
        params: {
            key: 978133006158071,
            token: token
        },
        async: false
    }, function (data) {

    })
    if (!token || token === 'null') {
        isLogin = 'false'
    } else {
        isLogin = 'true'
    }

    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad || browser.versions.android) {
        if (jzjy.isWechat()) {
            goto("homepage/signUp.html?type=1&token=" + token + '&personId=' + personIdInfo + '&mobile=' + _localStorage.getItem("mobile") + '&idInfo=' + idInfo);

        } else {
            bridgeObj.redirectToLogin({
                'isLogin': isLogin,
            }, function (responseData) {
            });
            if (isLogin == 'true') {
                bridgeObj.deliverOauthCode(function (result) {
                    goto("homepage/signUp.html?type=1&token=" + token + '&personId=' + personIdInfo + '&mobile=' + mobile + '&idInfo=' + idInfo);
                });
            } else {

            }

        }
    } else {
        goto("homepage/signUp.html?type=1&token=" + token + '&personId=' + personIdInfo + '&mobile=' + _localStorage.getItem("mobile") + '&idInfo=' + idInfo);
    }
    //  }

})
//我要领奖
$(".homePage .personal").on("click", ".award", function () {
    if (!token || token === 'null') {
        isLogin = 'false'
    } else {
        isLogin = 'true'
    }
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad || browser.versions.android) {
        if (jzjy.isWechat()) {
            goto("prize.html");
        } else {
            bridgeObj.redirectToLogin({
                'isLogin': isLogin,
            }, function (responseData) {
            });
            if (isLogin == 'true') {
                bridgeObj.deliverOauthCode(function (result) {
                    goto("prize.html");
                });
            } else {

            }
        }
    } else {
        goto("prize.html");
    }

})

//判断是否是服务人员
let tmp = 0;
function servicePersonal() {
    tmp++
    if(navigator.userAgent.toLowerCase().indexOf('android') > 0 && tmp %2 !== 0){
        return false;
    }
    if (token) {
        if (jzjy.isWechat()) {
            token = jzjy.getToken()
        } else {
            token = token
        }
    } else {
        $(".button").show();
        $(".personal").hide();
    }
    if (token) {
        jzjy.activityKey({
            params: {
                key: 978133006158071,
                token: token
            },
        }, function (data) {
            console.log(data)
            if (data.code == 0) {
                _localStorage.setItem('name', data.data.name);
                _localStorage.setItem('mobile', data.data.mobile);
                mobile = data.data.mobile
                _localStorage.setItem('personId', data.data.personId);
                //alert("homepage/signUp.html?name="+data.data.name+'&mobile='+data.data.mobile+'&personId'+data.data.personId+'&token='+token)
                isEnroll = false
                goto("homepage/signUp.html?name=" + data.data.name + '&mobile=' + data.data.mobile + '&personId=' + data.data.personId + '&token=' + token)
            }
            if (data.code == "-1") {
                if (data.msg == "您还不是服务人员！") {
                    tanwin("您还不是服务人员,请前去认证！");
                    isEnroll = false
                } else {
                    tanwin(data.msg);
                    isEnroll = false
                }
                isEnroll = false
                return;
            }

        })
    }

}

function info() {
    setTimeout(function () {
        $("#hiddenBtn").click()
    }, 2000)
    if (token) {
        $(function () {
            jzjy.activityKey({
                    params: {
                        key: 254149593116151,
                        token: token,
                        activityId: 385303394984809
                    },
                    async: false,
                },
                function (data) {
                    console.log('数据' + data)
                    if (data.code == 0) {
                        var list = data.data.list;
                        empData = data;
                        empid = data.data.list[0].empId;
                        idInfo = list[0].id;
                        personIdInfo = empid
                        _localStorage.setItem('personId', empid);
                        _localStorage.setItem('id', list[0].id);
                        _localStorage.setItem('status', list[0].status);
                        console.log(list)
                        if (list.length > 0) {
                            $(".personal").show();
                            $(".button").hide();
                            // $(".header p").html(data.data.voteName);
                            $(".enrollNum").html(data.data.enrollNum);
                            $(".voteNum").html(data.data.voteNum);
                            if (data.end.end == 1) {
                                if (list[0].status == 1) { //审核中
                                    var html = ""
                                    html += '<img src="' + list[0].cover + '"/>' +
                                        '<p style="margin-left: .2rem;">' + list[0].name + '</p>' +
                                        '<p>' + list[0].code + '号</p>' +
                                        '<div class="state">' + list[0].statusName + '</div>' +

                                        '<div class="modify">编辑</div>'
                                    $(".personal").html(html)
                                }
                                if (list[0].status == 2) { //审核成功
                                    var html = ""
                                    html += '<img src="' + list[0].cover + '"/>' +
                                        '<p>' + list[0].name + '</p>' +
                                        '<p>' + list[0].code + '号</p>' +
                                        '<div class="state">' + list[0].voteNum + '票</div>' +
                                        '<div class="share" onclick="shareAward()">我要拉票</div>'
                                    $(".personal").html(html);

                                }
                                if (list[0].status == 3) { //审核失败
                                    var html = "";
                                    html += '<img src="' + list[0].cover + '"/>' +
                                        '<p>' + list[0].name + '</p>' +
                                        '<p>' + list[0].code + '号</p>' +
                                        '<div class="state" style="color:#FF1F73;">' + list[0].statusName + '</div>' +
                                        '<img src="../../images/wenhao@3x.png" style="width:5%; height: .4rem;" class="errorimg"/>' +

                                        '<div class="modify">重新编辑</div>'
                                    $(".personal").html(html);
                                    $(".errorimg").on("click", function () {
                                        var text = list[0].rejectReason
                                        $.alert({
                                            title: '',
                                            text: text,
                                            onOK: function () {
                                                //点击确认
                                            }
                                        })

                                    })
                                }
                            }
                            if (data.end.end == 2) { //活动结束
                                if (list[0].isPrize == 1) {
                                    var html = ""
                                    html += '<img src="' + list[0].cover + '"/>' +
                                        '<p>' + list[0].name + '</p>' +
                                        '<p>' + list[0].code + '号</p>' +
                                        '<div class="state">' + list[0].voteNum + '票中奖</div>' +
                                        '<div class="award">我要领奖</div>'
                                    $(".personal").html(html)
                                }
                                if (list[0].isPrize == 2) {
                                    var html = ""
                                    html += '<img src="' + list[0].cover + '"/>' +
                                        '<p>' + list[0].name + '</p>' +
                                        '<p>' + list[0].code + '号</p>' +
                                        '<div class="state" style="color:#FF1F73;">' + list[0].voteNum + '票未中奖</div>' +
                                        '<div style=" border: 0 !important; color:#000;">下次加油！</div>'
                                    $(".personal").html(html);
                                }
                                isEnroll = false
                                loadOrder.isEnd = true;

                            }

                        }
                    } else if (data.code == "-1") {
                        $(".button").show();
                        $(".personal").hide();
                        if (data.end.end == 2) {
                            loadOrder.isEnd = true;
                        }
                    }
                })
        })

    } else {
        if (loadOrder.isEnd) {
            tanwin("活动已结束");
            isEnroll = false
            return;
        }
    }

}

/*下拉刷新*/
function fakeLoad(time) {
    $('#list').css({'transform': 'translateY(45px)', 'transition': 'transform .8s'})
    setTimeout(function () {
        $('#list').css({'transform': 'translateY(0px)', 'transition': 'transform .8s'})
    }, 800)
}

fakeLoad(800)
$('.homeContent').on('scroll', function (e) {
    e.stopPropagation()
    if (e.target.scrollTop === 0) {
        currPage = 0;
        /*调用*/
        // loadOrder.initFinite();
        loadOrder.allOrder(1, 10);
        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad || browser.versions.android) {
            if (jzjy.isWechat()) {
                info()
            } else {
                setTimeout(function () {
                    bridgeObj.deliverOauthCode(function (result) {
                        token = JSON.parse(result).token;
                        mobile = JSON.parse(result).mobile;
                        if (token) {
                            info()
                        }

                    });
                }, 10)
            }
        } else {
            info()
        }
        jzjy.activityKey({
                params: {
                    key: 837909539257991,
                    activityId: 385303394984809
                },
                async: false
            },
            function (data) {
                console.log(data)
                if (data.code == 0) {
                    $(".enrollNum").html(data.data.enrollNum);
                    $(".voteNum").html(data.data.voteNum);
                }
            });

        isEnroll = false;

        fakeLoad(800)
    }
})

var loading = false; //状态标记
$("body").scroll(function () {
    //已经滚动到上面的页面高度
    var scrollTop = $(this).scrollTop();
    //页面高度
    var scrollHeight = $(document).height() - 50;
    //浏览器窗口高度
    var windowHeight = $(this).height();
    //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
    if (scrollTop + windowHeight >= scrollHeight) {
        if (loading) return;
        loading = true;
        setTimeout(function () {
            if (loadOrder.page.maxPage > loadOrder.page.curPage) {
                loadOrder.allOrder(loadOrder.page.curPage + 1, loadOrder.page.pageCount);
            }
            loading = false;
        }, 3000);
    }
});

var loadOrder = {
    isEnd: false,
    param: {},
    page: {},
    allOrder: function (currentPage, pageSize) {
        var param = $.extend({}, {
            key: 783797976573687,
            curPage: currentPage,
            pageCount: pageSize,
            activityId: 385303394984809,//正式
            // activityId: 368607637598456
        }, loadOrder.param);
        jzjy.activityKey({
            params: param,
        }, function (data) {
            if (data.code == "0") {
                var list = data.data;
                var page = data.page;
                if (page.curPage == 1) {
                    $(".homeDetails").empty();
                }
                loadOrder.page = page;
                if (list && list.length > 0) {
                    var leftList = $(".details-left");
                    if ($(".details-left").length == 0) {
                        leftList = $("<div class='details-left'></div>");
                    }
                    var rightList = $(".details-right");
                    if ($(".details-right").length == 0) {
                        rightList = $("<div class='details-right'></div>");
                    }
                    $(".homeDetails").append(leftList);
                    $(".homeDetails").append(rightList);
                    for (var i = 0; i < list.length; i++) {
                        var listLi = $("<div></div>");
                        var img = list[i].cover;
                        listLi.append('<div class="cover" style="height: 4rem"> <img src="' + img + '" alt="" style="width: 100%;"></div>\n' +
                            '\t\t\t\t\t\t<div class="serial">' + list[i].code + '</div>\n' +
                            '\t\t\t\t\t\t<div class="detail-bottom">\n' +
                            '\t\t\t\t\t\t\t<div class="detail-name"><div>名称 <span class="num">' + list[i].name + '</span></div><span class="detail-vote">投票</span></div>\n' +
                            '\t\t\t\t\t\t\t<div class="detail-num"><div>票数 <span class="num">' + list[i].voteNum + '</span></div><span class="detail-appointment">预约</span></div>\n' +
                            '\t\t\t\t\t\t</div>');

                        $("img", listLi)[0].onload = function () {
                            $(this).parent().height("100%");
                        }
                        /*
                                                $("img",listLi)[0].onerror=function () {
                                                    if($(this).attr("src").indexOf("img-zip")>-1) {
                                                        $(this).attr("src", $(this).attr("src").replace("com/img/img-zip", "com/img/img"));
                                                    }
                                                }*/
                        listLi.data(list[i]);
                        if ($(".details-left").children().length > 5) {
                            var leftLength = $(".details-left").children().length;
                            var rightLength = $(".details-right").children().length;
                            if ($(".details-right").children()[rightLength - 1].offsetTop >= $(".details-left").children()[leftLength - 1].offsetTop) {
                                leftList.append(listLi);
                            } else {
                                rightList.append(listLi);
                            }
                        } else {
                            if (i % 2 == 0) {
                                leftList.append(listLi);
                            } else {
                                rightList.append(listLi);
                            }
                        }
                        listLi.on("click", function (ev) {
                            var self = this;
                            personId = $(self).data("empId")
                            var oEvent = ev || event;
                            if ($(oEvent.target).attr("class") == "detail-vote") {
                                //点击投票事件
                                if (loadOrder.isEnd) {
                                    tanwin("活动已结束");
                                    return;
                                }
                                if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad || browser.versions.android) {
                                    if (jzjy.isWechat()) {
                                        if (jzjy.getToken()) {
                                            loadOrder.voteTicket(personId, self);
                                            oEvent.stopPropagation();
                                            oEvent.cancelBubble = true;

                                        } else {
                                            $(".vote-login").show();
                                            $(".vote-title").html('登录后即可投票')
                                            $(".vote-login").css("z-index", 100);
                                            $("body").css("overflow", "hidden");
                                        }
                                    } else {
                                        $(".vote-login").hide();
                                        bridgeObj.deliverOauthCode(function (result) {
                                            if (JSON.parse(result).token && JSON.parse(result).token !== '(null)' && JSON.parse(result).token !== 'null' && JSON.parse(result).token !== 'undefined') {
                                                console.log(JSON.parse(result).token)
                                                token = JSON.parse(result).token;
                                                //alert(personId)
                                                loadOrder.voteTicket(personId, self);
                                                oEvent.stopPropagation();
                                                oEvent.cancelBubble = true;
                                            } else {
                                                bridgeObj.redirectToLogin({
                                                    'isLogin': 'false',
                                                }, function (responseData) {
                                                    window.location.reload();
                                                })
                                            }
                                        });
                                    }

                                } else {
                                    if (jzjy.getToken()) {
                                        loadOrder.voteTicket(personId, self);
                                        oEvent.stopPropagation();
                                        oEvent.cancelBubble = true;

                                    } else {
                                        $(".vote-login").show();

                                        $(".vote-title").html('登录后即可投票')
                                        $(".vote-login").css("z-index", 100);
                                        $("body").css("overflow", "hidden");
                                    }
                                }
                            } else if ($(oEvent.target).attr("class") == "detail-appointment") {

                                if (jzjy.isWechat()) {
                                    if (jzjy.getToken()) {
                                        goto("homepage/appointment.html?token=" + jzjy.getToken())
                                    } else {
                                        $(".vote-login").show();
                                        $(".vote-title").html('登录后即可预约')
                                        $(".vote-login").css("z-index", 100);
                                        $("body").css("overflow", "hidden");
                                    }

                                } else {
                                    $(".vote-login").hide();
                                    bridgeObj.deliverOauthCode(function (result) {
                                        if (JSON.parse(result).token && JSON.parse(result).token !== '(null)' && JSON.parse(result).token !== 'null' && JSON.parse(result).token !== 'undefined') {
                                            token = JSON.parse(result).token;
                                            goto("homepage/appointment.html?token=" + JSON.parse(result).token)
                                            oEvent.stopPropagation();
                                            oEvent.cancelBubble = true;
                                        } else {
                                            bridgeObj.redirectToLogin({
                                                'isLogin': 'false',
                                            }, function (responseData) {
                                                window.location.reload();
                                            })
                                        }
                                    });
                                }
                            } else {
                                //查看个人详情页
                                if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad || browser.versions.android) {
                                    if (jzjy.isWechat()) {
                                        if (jzjy.getToken()) {
                                            goto("homepage/detailsVoting.html?empid=" + personId)
                                        } else {
                                            $(".vote-login").show();
                                            $(".vote-title").html('登录后即可查看详情')
                                            $(".vote-login").css("z-index", 100);
                                            $("body").css("overflow", "hidden");
                                        }
                                    } else {
                                        $(".vote-login").hide();
                                        bridgeObj.deliverOauthCode(function (result) {
                                            if (JSON.parse(result).token && JSON.parse(result).token !== '(null)' && JSON.parse(result).token !== 'null' && JSON.parse(result).token !== 'undefined') {
                                                goto("homepage/detailsVoting.html?empid=" + personId + '&token=' + JSON.parse(result).token)

                                            } else {
                                                if (localStorage.getItem('isClick') === 'yes') {// 连点
                                                    return false;
                                                }
                                                localStorage.setItem('isClick', 'yes')// 连点
                                                bridgeObj.redirectToLogin({
                                                    'isLogin': 'false',
                                                }, function (responseData) {
                                                    localStorage.setItem('isClick', 'no')// 连点
                                                    window.location.reload();

                                                })
                                                if (navigator.userAgent.toLowerCase().indexOf('iphone') !== -1) {
                                                    console.log(-1)
                                                    window.location.reload();
                                                }
                                            }

                                        });

                                    }
                                } else {
                                    if (jzjy.getToken()) {
                                        goto("homepage/detailsVoting.html?empid=" + personId)
                                    } else {
                                        $(".vote-login").show();
                                        $(".vote-title").html('登录后即可查看详情')
                                        $(".vote-login").css("z-index", 100);
                                        $("body").css("overflow", "hidden");
                                    }
                                }
                            }

                        })
                    }
                    if (list.length < page.pageCount) {
                        $(".empty").empty()
                        $(".homeDetails").append("<div class='empty' style='width: 100%; text-align: center;color: #FFFFFF;margin-top: .2rem'>数据加载完毕</div>");
                        // $(document.body).destroyInfinite();
                        loading = true;
                    }
                } else {
                    if (page.curPage == 1) {
                        loading = true;
                    } else {
                        $(".empty").empty()
                        loading = true;
                        $(".homeDetails").append("<div style='width: 100%; text-align: center;color: #FFFFFF;margin-top: .2rem'>数据加载完毕</div>");
                    }
                }
            }
            $("#loading").hide();
        })
    },
    voteTicket: function (empId, self) {
        if (token) {
            token = token;
        } else {
            token = jzjy.getToken()
        }
        var param = {
            personId: empId,
            token: token,
            key: 572275157481463,
            activityId: 385303394984809
        }
        jzjy.activityKey({
            params: param,
            async: false
        }, function (data) {
            if (data.code == "0") {
                var voteNum = data.data.voteNum;
                $(".num", self).html(voteNum);
                // $.alert({
                //     title: '投票成功',
                //     text: '您有一次抽取红包的机会，分享红包雨活动，赢更多抽奖机会',
                //     onOK: function () {
                //         //点击确认
                //         goto('http://erp.95081.com/jzjy-wechat/html/redEnvelopes/redEnvelopes.html?token=' + token + '&id=349861414147449')
                //     }
                // });

                $.modal({
                    title: "投票成功",
                    text: "每日第一次投票可获得一次抽取红包机会。",
                    buttons: [
                        { text: " 去抢红包  ", onClick: function(){
                                goto('http://erp.95081.com/jzjy-wechat/html/redEnvelopes/redEnvelopes.html?token=' + token + '&id=349861414147449')

                            } },
                        { text: "继续投票", onClick: function(){ } },
                    ]
                });
            } else {
                tanwin(data.msg);
            }
        })
        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad || browser.versions.android) {
            if (!jzjy.isWechat()) {
                if (!token || token === 'null') {
                    isLogin = 'false'
                } else {
                    isLogin = 'true'
                }
                bridgeObj.redirectToLogin({
                    'isLogin': isLogin,
                }, function (responseData) {
                    window.location.reload();
                });
            }
        }
    }
}

//分享配置

function registeEvent(sharData) {
    wx.ready(function () {
        // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
        wx.checkJsApi({
            jsApiList: [
                'getNetworkType',
                'previewImage'
            ],
            success: function (res) {
                //alert(JSON.stringify(res));
            }
        });

        wx.hideMenuItems({
            menuList: ["menuItem:share:qq", "menuItem:share:QZone"] // 要显示的菜单项，所有menu项见附录3
        });
        // 2. 分享接口
        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareAppMessage({
            title: sharData.title,
            desc: sharData.content,
            link: sharData.url,
            imgUrl: sharData.pic ? sharData.pic : "http://erp.95081.com/Service-industry/img/accept-logo.png",
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击发送给朋友');
            },
            success: function (res) {
                alert('已分享');
            },
            cancel: function (res) {
                alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
        //alert('已注册获取“发送给朋友”状态事件');

        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口

        wx.onMenuShareTimeline({
            title: sharData.title,
            desc: sharData.content,
            link: sharData.url,
            imgUrl: sharData.pic ? sharData.pic : "http://erp.95081.com/Service-industry/img/accept-logo.png",
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击分享到朋友圈');
            },
            success: function (res) {
                alert('已分享');
            },
            cancel: function (res) {
                alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
        //alert('已注册获取“分享到朋友圈”状态事件');
    });

    wx.error(function (res) {
        alert(res.errMsg);
    });
}


function shareAward() {
    if (!jzjy.isWechat()) {
        var shareData = {};
        if (empData && empData.end.end == 1 && empData.data.list[0].status == 2) {
            shareData = {
                title: "我是【" + empData.data.list[0].name + "】，正在参加【家政日服务人员评选大赛】",
                content: "赢万元现金大奖，还有现金红包抢到手软！还不快来！？",
                pic: empData.data.list[0].cover ? empData.data.list[0].cover : 'http://erp.95081.com/img/img/2019/01/02/dddca91df1d74efeb525e1b054ee458f.jpg',
                url: jzjy.shareVoteUrl + "?empid=" + empData.data.list[0].empId + "&token=" + jzjy.getToken()
            }
        } else {
            shareData = {
                title: "【家政日服务人员评选大赛】",
                content: "赢万元现金大奖，还有现金红包抢到手软！还不快来！",
                pic: empData.data.list[0].cover ? empData.data.list[0].cover : 'http://erp.95081.com/img/img/2019/01/02/dddca91df1d74efeb525e1b054ee458f.jpg',
                url: jzjy.shareVoteIndexUrl
            }
        }
        bridgeObj.share({
            'isLogin': 'true',
            'title': shareData.title,
            'content': shareData.content,
            'url': shareData.url,
            "imgUrl": shareData.pic
        }, function (responseData) {
        });
    } else {
        var height = $(window).height();
        $('#rabaw').css('height', height + 'px');
        $("#rgbn").show()
    }
}