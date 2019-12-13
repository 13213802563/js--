$('.two').height($(window).height()-$(".rankingUl").height()-($(".ranking").offset().top)-$(".index-footer").height()-$(".index-footer").height()+10);
var page,isAll;

/*下拉刷新*/
$("#rankList").pullToRefresh({
    onRefresh: function() {
        setTimeout(function() {
            currPage = 0;
            $(".two").empty();
            rank.query(1, 15);
            $("#rankList").pullToRefreshDone();
            $(".loadFinish").hide();
            // if($(".loading").css("display")=="none"){
            //     rank.initFinite();
            // }
        },2000);
    },
    onPull: function() {
    }

});
$(function(){
	$(".lingjiang").on("click",function () {
        window.location.href="prize.html";
    })
    rank.query(1,15);
    $(window).scroll(function() {
        //已经滚动到上面的页面高度
        var scrollTop = $(this).scrollTop();
        //页面高度
        var scrollHeight = $(document).height();
        //浏览器窗口高度
        var windowHeight = $(this).height();
        //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
        if (scrollTop + windowHeight >= scrollHeight - 100) {
            if(loading) return;
            loading = true;
            $(".loading").show();
            setTimeout(function() {
                loading = false;
                if(rank.page&&!isAll) {
                    rank.query(rank.page.curPage + 1, rank.page.pageCount);
                }
            },0);
            $(".loading").hide();
        }
    });


    // $("#lo_left").unbind().on("click",function () {
    //     window.location.href="homePage.html";
    // })
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
                    title:"【三好家政服务员评选】",
                    content:"三好家政服务员评选开始啦，万元现金奖等您领，快来报名吧！",
                    pic:'http://erp.95081.com/img/img/2019/01/02/dddca91df1d74efeb525e1b054ee458f.jpg',
                    url:jzjy.shareVoteIndexUrl
                }
                registeEvent(shareData);
            }
        }
    })

})
var loading = false;
var rank={
    /*滚动刷新*/
    // initFinite:function () {
    //     /*滚动刷新*/
    //     $(".two").infinite().on("infinite", function() {
    //
    //     });
    // },
    page:{},
	query:function (curPage,pageCount) {
        jzjy.activityKey({
            params: {
                key: 218972982525687,
                curPage:curPage,
                pageCount:pageCount,
                activityId:385303394984809
            },
            async: false
        }, function(data) {
            if(data.code=="0"){
                if(data.data.display!=1){
                    //$(".two").destroyInfinite();
                    //$(".content").show();
                    $(".lingjiang").hide();
                    //return;
                }
                var list=data.data.list;
                var page=data.data.page;
                rank.page=page;
                if(rank.page.curPage==1){
                    $(".two").empty();
                }

                if(list.length>0) {
                    var index = (page.curPage - 1) * (page.pageCount);
                    for (var i = 0; i < list.length; i++) {
                        var ul = "<ul><li class='" + (list[i].isPrize == "1" ? "prize" : "") + "'>第" + (index + i + 1) + "名</li><li>" + list[i].code + "</li><li>" + list[i].name + "</li><li>" + list[i].voteNum + "</li></ul>";
                        $(".two").append(ul);
                    }
                    if(list.length<rank.page.pageCount){
                        isAll=true;
                    }
                }
                else {
                    if (rank.page.curPage == 1) {
                        isAll=true;
                        $(".two").destroyInfinite();
                        $(".two").append('<div class="loadFinish">\n' +
                            '<span class="weui-loadmore__tips">数据加载完成</span>\n' +
                            '</div>');
                    }
                }
            }
            else if(data.code=="-1"){
                $(".content").show();
                $(".content p").html("活动暂未开始");
            }
        })
    }
}


function registeEvent(sharData) {
    wx.ready(function() {
        // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
        wx.checkJsApi({
            jsApiList: [
                'getNetworkType',
                'previewImage'
            ],
            success: function(res) {
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
            trigger: function(res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击发送给朋友');
            },
            success: function(res) {
                alert('已分享');
            },
            cancel: function(res) {
                alert('已取消');
            },
            fail: function(res) {
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
            trigger: function(res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击分享到朋友圈');
            },
            success: function(res) {
                alert('已分享');
            },
            cancel: function(res) {
                alert('已取消');
            },
            fail: function(res) {
                alert(JSON.stringify(res));
            }
        });
        //alert('已注册获取“分享到朋友圈”状态事件');

        // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口

        wx.onMenuShareQQ({
            title: sharData.shareName,
            desc: sharData.describe,
            link: sharData.url,
            imgUrl: sharData.pic ? sharData.pic : "http://erp.95081.com/Service-industry/img/accept-logo.png",
            trigger: function(res) {
                //alert('用户点击分享到QQ');
            },
            complete: function(res) {
                //alert(JSON.stringify(res));
            },
            success: function(res) {
                alert('已分享');
            },
            cancel: function(res) {
                alert('已取消');
            },
            fail: function(res) {
                alert(JSON.stringify(res));
            }
        });
        //alert('已注册获取“分享到 QQ”状态事件');

        // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口

        wx.onMenuShareWeibo({
            title: sharData.shareName,
            desc: sharData.describe,
            link: sharData.url,
            imgUrl: sharData.pic ? sharData.pic : "http://erp.95081.com/Service-industry/img/accept-logo.png",
            trigger: function(res) {
                //alert('用户点击分享到微博');
            },
            complete: function(res) {
                //alert(JSON.stringify(res));
            },
            success: function(res) {
                alert('已分享');
            },
            cancel: function(res) {
                alert('已取消');
            },
            fail: function(res) {
                alert(JSON.stringify(res));
            }
        });
        //alert('已注册获取“分享到微博”状态事件');

        // 2.5 监听“分享到QZone”按钮点击、自定义分享内容及分享接口

        wx.onMenuShareQZone({
            title: sharData.shareName,
            desc: sharData.describe,
            link: sharData.url,
            imgUrl: sharData.pic ? sharData.pic : "http://erp.95081.com/Service-industry/img/accept-logo.png",
            trigger: function(res) {
                //alert('用户点击分享到QZone');
            },
            complete: function(res) {
                //alert(JSON.stringify(res));
            },
            success: function(res) {
                alert('已分享');
            },
            cancel: function(res) {
                alert('已取消');
            },
            fail: function(res) {
                alert(JSON.stringify(res));
            }
        });
        //alert('已注册获取“分享到QZone”状态事件');
    });

    wx.error(function(res) {
        alert(res.errMsg);
    });
}
