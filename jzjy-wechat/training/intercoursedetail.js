var id = getQueryString('id');
var img = getQueryString('picture');
var videoData;
var isCommentPaging = false;
var shareData = {};
var courseName;
var courseContent;
var coursePic;
var courseUrl;
var totalData;
var isBechange=true;;
//请求课程请求
$(function () {
    /*目录*/
    //课程id
    // $(".zz").hide();
    // courseIndexId=id
    jzjy.newAjax({
        params: {
            id: id,
            key: 673091821974458
        },
        async: false
    }, function (data) {
        console.log('====+++++===aaaa', data)

        if (data.code == 0) {
            var listdetailData = data.data;
            totalData=listdetailData;
            console.log(listdetailData)
            var p = '';
            var html;
            var html_pic;
            p += '<div class="drop-down" data-url="' + listdetailData.url + '" data-id="' + listdetailData.id + '">' +
                '<div class="org">' +
                '<div class="org-left">' +
                '<p class="shiting">视频</p>' +
                '<span>' + listdetailData.courseCategory + '</span>' +
                '</div>' +
                '</div>' +
                '</div>'

            // }
            if (listdetailData.promotionalVideoUrl == null) {

                p += '</div>'
                var videos = "";
                videos += '   <img src="' + (listdetailData.courseCoverUrl ? listdetailData.courseCoverUrl : "../../images/Bitmap_icon@3x.png") + '" alt=""style="width: 10rem;height:5.2rem;position: relative;top: .3rem;">'
                $('.video-content').html(videos);
            } else {
                p += '</div>'
                var videos = "";
               videos += '<video height="220" width="500" data-id="' + listdetailData.id + '" src="' + listdetailData.promotionalVideoUrl + '" x5-video-player-type="h5" playsinline="true" controls loop="" muted="" id="vid" poster="' + listdetailData.courseCoverUrl + '"></video>'
                $('.video-content').html(videos);
                $("video", $('.video-content')).on("play", function () {
                    if (jzjy.getTokenSkip()) {
                        var lessonId = $(this).attr("data-id");

                    } else {
                        return false;

                    }
                });
            }


            for (let i = 0; i < listdetailData.imgUrls.length; i++) {

                // html_pic = '<div class="course-detail_pic">\n' +
                //     '                <img src="' + (listdetailData.imgUrls[i] ? listdetailData.imgUrls[i] : "../../images/Bitmap_icon@3x.png") + '" alt="">\n'
                //     + '                </div>\n'

                html_pic =
                    '                <img src="' + (listdetailData.imgUrls[i] ? listdetailData.imgUrls[i] : "../../images/Bitmap_icon@3x.png") + '" alt="">\n'

                $(".course-detail_pic").append(html_pic);

            }
            if(listdetailData.imgUrls.length==1){
                $(" .course-detail_pic img:first-child").css('border-radius','.21rem .21rem .21rem .21rem');
            }


            $(".headers p").html(listdetailData.courseCategory);
            $(".catalog").html(p);
            $(".course_detail_1 p").html(listdetailData.courseName);

            //discountedPrices     coursePrice
            if (listdetailData.discountedPrices) {
                $(".course_price h1").html("¥");
                $(".course_price h2").html(listdetailData.discountedPrices);
                $(".course_price_disc del").html("¥" + listdetailData.coursePrice);
            } else {
                $(".course_price h1").html("¥");
                $(".course_price h2").html(listdetailData.coursePrice);
                $(".course_price_disc del").html();
            }

            courseName=listdetailData.courseName;
            courseContent=listdetailData.content;
            coursePic=listdetailData.pic;
            courseUrl=listdetailData.url+"?id="+listdetailData.id;
            if(listdetailData.totalTime){
                $(".course_detail_3 p").html(listdetailData.totalTime);
            }else{
                $(".course_detail_3 p").html(listdetailData.courseDuration+'天');
            }

            $(".course_detail_4 p").html(listdetailData.address);
            //分享数据
            shareData.title = courseName;
            shareData.url =courseUrl;
            shareData.content = courseContent;
            shareData.pic = coursePic;

            if( window.parent.document.referrer.indexOf("internationCourse.html") !=-1||window.parent.document.referrer.indexOf("jzjy-wechat/html/curriculum/internationCourse/internationCourse")!= -1 ) {

                $("#lo_left").show()
            }
            else{
                $("#lo_left").hide()
            }
            }


    });
})



//是否已经报名请求
$(function () {
    if (jzjy.getToken()) {
        jzjy.newAjax({
            params: {
                internationalCourseId: id,
                token: jzjy.getToken(),
                key: 266844300307930
            },
            async: false
        }, function (data) {
            if (data.code == 0) {
                if (data.isSign == 2) {   //2 未报名
                    $('#apply').text("我要报名")
                    $("#apply").attr("disabled", false);
                } else {               //1 已报名
                    $("#apply").attr("disabled", "disabled");
                    $('#apply').text("已报名");
                }
            }

        });
    } else {
        $('#apply').text("我要报名")
        $("#apply").attr("disabled", false);
    }

})


//点击我要报名
$('.course-button').on('click', function () {
    if (jzjy.getToken()) {  //已經登錄
        courseEntry();
    } else {                                       //沒有登錄
        jzjy.getTokenSkip()
    }
})

//课程报名
function courseEntry() {
    if(isBechange==false){
        return;
    }
    jzjy.newAjax({
        params: {
            internationalCourseId: id,
            token: jzjy.getToken(),
            key: 708229141620954
        },
        async: false
    }, function (data) {
        if (data.code == 0) {
            isBechange=false;
            // $('#apply').text("已报名")
            // tanwin_sure("您已成功报名该课程，我们的工作人员将尽快与您沟通");
            // $("#apply").attr("disabled", "disabled");

            $.alert({
                title: '',
                text: '您已成功报名该课程，我们的工作人员将尽快与您沟通',
                onOK: function () {
                    $("#apply").attr("disabled", "disabled");
                    $('#apply').text("已报名");
                }})
        }

    });
}

//点击分享
$(".course-share img").on("click", function () {
    //如果不在微信，自动走try,先走OauthCode，通过返回的数据判断isLogins
    //如果是微信，自动走这里
    $("#mask").show()
    $("body").css("overflow-x", "hidden");
    // $('body').height(100);
    $("body").css("overflow", "hidden");
})
/*注册微信jssdk*/
var url = window.location.href.split("#")[0];
jzjy.ajax({
    url: "weChat/signature",
    async: false,
    params: {
        url: url
    }
}, function (data) {
    if (data.code == "-2") {
        // console.log(data);
        console.log('-------data---',data);
    } else {
        console.log('-------data---',data);
        init(data);
    }
})
var infoState = {status: true, info: ""};

function init(data) {
    var nonceStr = data.data.nonceStr;
    var timestamp = data.data.timestamp;
    var signature = data.data.signature;
    var appid = data.data.appId;
    wx.config({
        debug: false,
        appId: appid,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'getLocation'
        ]
    });

    // shareData = {
    //     title: courseName,
    //     content: courseContent,
    //     pic:coursePic,
    //     url: courseUrl
    // }
    shareData=window.shareData
    bindEvent(shareData);

}

//     }
// )
function bindEvent(shareData) {
    console.log('===shareData+++++++',shareData)
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

        // 2. 分享接口
        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口

        wx.onMenuShareAppMessage({
            title: shareData.title,
            desc: shareData.content,
            link: shareData.url,
            imgUrl: shareData.pic,
            // link: "http://t.erp.95081.com/jzjy-wechat/html/training/intercoursedetail.html?id=797503258252890",
            // imgUrl: "http://t.erp.95081.com/Service-industry/img/accept-logo.png",
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击发送给朋友');
            },
            success: function (res) {

                jzjy.newAjax({
                    params:{
                        key:'412024644477065',
                        token:localStorage.getItem('token'),
                        type:'10'
                    }
                },function (data) {
                })
                alert('已分享');
            },
            cancel: function (res) {

                alert('已取消');
            },
            fail: function (res) {
                alert('aaaaa');
                alert(JSON.stringify(res));
            }
        });
        //alert('已注册获取“发送给朋友”状态事件');


        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口

        wx.onMenuShareTimeline({
            title: shareData.title,
            desc: shareData.content,
            link: shareData.url,
            imgUrl: shareData.pic,
            // link: "http://t.erp.95081.com/jzjy-wechat/html/training/intercoursedetail.html?id=797503258252890",
            // imgUrl: "http://t.erp.95081.com/Service-industry/img/accept-logo.png",
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                //alert('用户点击分享到朋友圈');
            },
            success: function (res) {
                jzjy.newAjax({
                    params:{
                        key:'412024644477065',
                        token:localStorage.getItem('token'),
                        type:'10'
                    }
                },function (data) {
                })
                alert('已分享');
            },
            cancel: function (res) {
                alert('已取消');
            },
            fail: function (res) {
                alert('aaaaa');
                alert(JSON.stringify(res));
            }
        });
        //alert('已注册获取“分享到朋友圈”状态事件');


        // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口

        wx.onMenuShareQQ({
            title: shareData.title,
            desc: shareData.content,
            link: shareData.url,
            imgUrl: shareData.pic,
            trigger: function (res) {
                //alert('用户点击分享到QQ');
            },
            complete: function (res) {
                //alert(JSON.stringify(res));
            },
            success: function (res) {
                jzjy.newAjax({
                    params:{
                        key:'412024644477065',
                        token:localStorage.getItem('token'),
                        type:'10'
                    }
                },function (data) {
                })
                alert('已分享');
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
            link: shareData.url,
            imgUrl: shareData.pic,
            trigger: function (res) {
                //alert('用户点击分享到微博');
            },
            complete: function (res) {
                //alert(JSON.stringify(res));
            },
            success: function (res) {
                jzjy.newAjax({
                    params:{
                        key:'412024644477065',
                        token:localStorage.getItem('token'),
                        type:'10'
                    }
                },function (data) {
                })
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
            link: shareData.url,
            imgUrl: shareData.pic,
            trigger: function (res) {
                //alert('用户点击分享到QZone');
            },
            complete: function (res) {
                //alert(JSON.stringify(res));
            },
            success: function (res) {
                jzjy.newAjax({
                    params:{
                        key:'412024644477065',
                        token:localStorage.getItem('token'),
                        type:'10'
                    }
                },function (data) {
                })
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

//返回
// $("#lo_left").on("click", function () {
//     goto("../curriculum/index.html")
// })
$("#lo_left").on("click", function () {

    // goto("../curriculum/internationCourse/internationCourse.html")
    goto("../curriculum/internationCourse/internationCourse.html?id=" +id);

})


$(".catalog").on("click", ".drop-down", function () {
    console.log($(this).attr("data-url"))
    $(".catalog>div").eq($(this).index())
        .addClass("on").siblings().removeClass('on');
    $("video").attr("src", $(this).attr("data-url"));
    $("video").attr("data-id", $(this).attr("data-id"));
    $("video")[0].play();
})

/*遮罩显示隐藏*/

$("#mask").on("click", function () {
    if ($("#mask").css("display") == "none") {
        $("#mask").show()
        // $('body').height(100);
        $("body").css("overflow", "hidden");
    } else {
        // $('body').height(100);
        $("body").css("overflow", "");
        $("body").css("overflow-x", "hidden");
        $("#mask").hide()
    }

})

$(".zz").on("click", function () {
    // $("#qrcode").empty();
    // $("#qrcode").removeAttr("title")
    if ($(".zz").css("display") == 'none') {
        $(".zz").show()
    } else {
        $(".zz").hide()
        // $("body").css("overflow-x", "hidden");
    }
})

