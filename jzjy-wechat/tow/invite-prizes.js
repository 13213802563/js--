var shareData; //apiID，可留空;
$(function () {

    if(jzjy.getToken()||getQueryString("token")){
        $("#inv").show()
        $("#inv").click(function (e) {
            _czc.push(['_trackEvent','微站', '邀请有奖的查看记录'])

            if(getQueryString("ai")){
                window.location.href = 'invite.html?token=' + jzjy.getToken();
            }else{
                window.location.href = 'invite.html?token=' + getQueryString("token");
            }

        })
    }


})
var mobile="";

if(!getQueryString("ai")){
    mobile=getQueryString("mobile").replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
function shareAward() {
    _czc.push(['_trackEvent','微站', '邀请有奖分享'])

    if(getQueryString("ai")){
        if(jzjy.getToken()){
            mobile=jzjy.getMobile().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
            $("#rgbn").show()
            jzjy.ajax({
                url: "weChat/signature",
                async: false,
                params: {
                    url: window.location.href.split("#")[0]
                }
            }, function (data) {
                if (data.code == "-2") {
                    console.log(data);
                } else {
                    if(data.code=="0"){

                        init(data);
                    }
                }
            })
        }else{
            jzjy.getTokenSkip()
        }
    }else{
        var isLogin;
        if(getQueryString("token")){
            isLogin = 'true'
        }else{
            isLogin = 'false'
        }
        bridgeObj.share({
            'isLogin':isLogin,
            'title': "我是【" + mobile + "】，邀请你加入家政家园，做家政挣大钱",
            'content': "这个月我已经挣了小一万块钱，你也加入吧",
            'url': jzjy.shareAcceptUrl,
            "imgUrl":'http://erp.95081.com/Service-industry/img/accept-logo.png',

        }, function(responseData) {
        });
    }


}
$("#rgbn").on("click",function(){
    $("#rgbn").hide()
})

function init(data) {
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
    shareData = {
        title: "我是【" + mobile + "】，邀请你加入家政家园，做家政挣大钱",
        content: "这个月我已经挣了小一万块钱，你也加入吧",
        pic: 'http://erp.95081.com/Service-industry/img/accept-logo.png',
        url: jzjy.shareAcceptUrl + "?mobile=" + mobile + "&token=" + jzjy.getToken()
    }
    bindEvent(shareData);
}

function bindEvent(shareData){
    shareData.url=jzjy.shareAcceptUrl+shareData.url.substr(shareData.url.indexOf("?"));
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
            menuList: ["menuItem:share:qq","menuItem:share:QZone"] // 要显示的菜单项，所有menu项见附录3
        });
        // 2. 分享接口
        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口

        wx.onMenuShareAppMessage({
            title: shareData.title,
            desc: shareData.content,
            link:shareData.url,
            imgUrl: shareData.pic,
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击发送给朋友');
            },
            success: function (res) {
                alert('已分享');
                $("#rgbn").hide()
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
            title: shareData.title,
            desc: shareData.content,
            link:shareData.url,
            imgUrl: shareData.pic,
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击分享到朋友圈');
            },
            success: function (res) {
                alert('已分享');
                $("#rgbn").hide()
            },
            cancel: function (res) {
                alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
        //alert('已注册获取“分享到朋友圈”状态事件');


        // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口

        wx.onMenuShareQQ({
            title: shareData.title,
            desc: shareData.content,
            link:shareData.url,
            imgUrl: shareData.pic,
            trigger: function (res) {
                //alert('用户点击分享到QQ');
            },
            complete: function (res) {
                //alert(JSON.stringify(res));
            },
            success: function (res) {
                alert('已分享');
                $("#rgbn").hide()
            },
            cancel: function (res) {
                alert('已取消');
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
        //alert('已注册获取“分享到 QQ”状态事件');


        // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口

        wx.onMenuShareWeibo({
            title: shareData.title,
            desc: shareData.content,
            link:shareData.url,
            imgUrl: shareData.pic,
            trigger: function (res) {
                //alert('用户点击分享到微博');
            },
            complete: function (res) {
                //alert(JSON.stringify(res));
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
        //alert('已注册获取“分享到微博”状态事件');


        // 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口

        wx.onMenuShareQZone({
            title: shareData.title,
            desc: shareData.content,
            link:shareData.url,
            imgUrl: shareData.pic,
            trigger: function (res) {
                //alert('用户点击分享到QZone');
            },
            complete: function (res) {
                //alert(JSON.stringify(res));
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
        //alert('已注册获取“分享到QZone”状态事件');
    });

    wx.error(function (res) {
        alert(res.errMsg);
    });
}
