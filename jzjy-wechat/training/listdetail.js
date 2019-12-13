var id = getQueryString('id');
var img = getQueryString('picture');
var videoData;
var commentPaging//评论分页
var isCommentPaging=false;
var shareData = {};
$(function() {
	/*目录*/
	//课程id
	jzjy.ajax({
		params: {
			combinationId: id
		},
		async: false,
		url: "appraise/queryCatalog"
	}, function(data) {
		if(data.code == 0) {
			var listdetailData = data.data;
			console.log(listdetailData)

			var p = '';
			for(var i = 0; i < listdetailData.length; i++) {
				p += '<div class="catalog-catalog">' +
                        '<p class="catalog-one">' + listdetailData[i].chapter + '</p> ' +
                        '<img class="stop" src="../../images/triangle.png" />' +
                    '</div><div>'
				/*$(".stop").on('click', function() {
					$('.drop-down').toggle()
				})*/
				var listData = listdetailData[i].courseList;
				var dropDown = '';

				for(var j = 0; j < listData.length; j++) {
                    shareData.title = listData[j].shareName;
                    shareData.url = listData[j].shareUrl+"?id="+listData[j].id;
                    shareData.content = listData[j].describe;
                    shareData.pic =  listData[j].picture;

					var shaers = listData[j].url;
					p+='<div class="drop-down" data-url="'+listData[j].url+'" data-id="'+listData[j].id+'">' +
                            '<div class="org">' +
                                '<div class="org-left">' +
                                '<p class="shiting">视频</p>' +
                                '<span>' + listData[j].name + '</span>' +
                                '</div>' +
                            '</div>' +
                        '</div>'

				}
                p+='</div>'
                var videos = "";
                videos += '<video height="220" width="500" data-id="'+listData[0].id+'" src="' + listData[0].url + '" x5-video-player-type="h5" playsinline="true" controls loop="" muted="" id="vid" poster="'+listData[0].picture +'"></video>'
                $('.video-content').html(videos);
                $("video",$('.video-content')).on("play", function() {
                    if(jzjy.getTokenSkip()) {
                        var lessonId = $(this).attr("data-id");
                        jzjy.ajax({
                            url: "userApp/insertCourseRecord",
                            params: {
                                token: jzjy.getToken(),
                                courseId: id,
                                lessonId: lessonId
                            }
                        }, function (data) {
                            if (data.code != "0") {
                                tanwin(data.msg);
                            }
                        })
                    }
                    else{
                        return false;
                    }
                });
			}
            $(".catalog").html(p);
			videoData=listData[0];
			console.log(videoData)
		} else {
			console.log(data.msg)
		}

	});

	$('.listdetail').on('click','.catalog-catalog',function () {
        $(this).next('div').toggle()
    })
	/*课程详情*/
	jzjy.ajax({
		params: {
			id: id
		},
		async: false,
		url: "personnelApp/loadCourse"
	}, function(data) {
		if(data.code == 0) {
			console.log(data)
			var courses = data.data.course;
			var teachers = data.data.teacher;
			var courseData = "";
			var courseOne = "";
			var teacherData = "";
			var teacherOne = "";
			var videos = "";
            // courseUrl=listdetailData.url+"?id="+courses.id;
            // "http://video.95081.com/OnlineTeachingVideo/31VideoOfTheFirstStage/%E6%9D%8E%E4%BF%8A%E6%A5%A0/%E6%AF%8D%E5%A9%B4%E6%8A%A4%E7%90%86%E5%B8%88%E7%9A%84%E6%A6%82%E8%BF%B0%E5%92%8C%E5%B7%A5%E4%BD%9C%E5%86%85%E5%AE%B9.mp4"


			courseData += '<h1>' + courses.name + '</h1>' +
				'<div class="introduce-two">' +
				'<div class="left">' + courses.priceStr + '</div>' +
				'<div class="right">' + courses.progress + '</div>' +
				'</div>' +
				'<div class="introduce-three">' +
				'<div>购买人数' + courses.browseCount + '</div>' +
				'<p>|</p>' +
				'<div>好评度' + courses.goodCount + '</div>' +
				'<p>|</p>' +
				'<div>评论数' + courses.appraiseCount + '</div>' +
				'</div>';
			$('.introduce').html(courseData);
			/*课程介绍*/
			courseOne += '<p>' + courses.describe + '</p>';
			$('.size-bot').html(courseOne);
			/*老师*/
			for(var i = 0; i < teachers.length; i++) {
				teacherData += '<div class="style">' +
					'<div class="style-left">' +
					'<img style="width: 78px; height: 78px;" src="' + teachers[i].headPath + '" style="border-radius: 50%;" />' +
					'</div>' +
					'<div class="style-right">' +
					'<h2>' + teachers[i].name + '</h2>' +
					'<div class="right-con">' +
					'<div>课程数</div>' +
					'<p>' + teachers[i].courseCount + '</p>' +
					'<div>学员数</div>' +
					'<p>' + teachers[i].studentCount + '</p>' +
					'<div>播放量</div>' +
					'<p>' + teachers[i].recordCount + '</p>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'<div class="size">' + teachers[i].describe + '</div>';

				$('.style-one').html(teacherData);

			}
		} else {
			console.log(data.msg)
		}

	});
	/*评论*/
	loadComment(1,10);
	/*发表评论*/
	$('.comment li').click(function() { //首页的那个星星
        $(".content").val("")
		if(jzjy.getTokenSkip()) {
            var index = $(this).attr("data-index");
            $("#commentId2 li").each(function () {
                if ($(this).attr("data-index") <= index) {
                    $(this).attr("class", "star");
                } else {
                    $(this).attr("class", "");
                }
            });
            $("#commentId1 li").each(function () {
                if ($(this).attr("data-index") <= index) {
                    $(this).attr("class", "star");
                } else {
                    $(this).attr("class", "");
                }
            });
            $('.xzz').css("display", "block");
            $(".lidiv").css("display", "block");
        }
	});


	/*点击评星的时候弹出*/
	$(".catalog .djpx").click(function() {
		$('.xzz').css("display", "block");
		$(".lidiv").css("display", "block");
	})

	/*评论点击提交*/
	$('.submit').on('click', function() {
		if(jzjy.getTokenSkip()) {
            var Content = $('.content').val();
            var int = $('#commentId2 .star').length; //提交页面的那个星星
            var tags = "";
            $('.comment-ul-three .comselect').each(function () {
                tags += $(this).attr("data-id") + ","
            });
            tags = tags.length > 0 ? tags.substr(0, tags.length - 1) : "";

            var param={};
            if(Content){
            	param={
                    token: jzjy.getTokenSkip(),
                    reId: id,
                    content: Content,
                    starLevel: int, //星星的字段
                    tags: tags
                }
			}
			else{
            	param={
                    token: jzjy.getTokenSkip(),
                    reId: id,
                    starLevel: int, //星星的字段
                    tags: tags
                }
			}
			if(!tags){
            	 tanwin("请选择描述标签");
            	return false;
            }

            jzjy.ajax({
                params: param,
                async: false,
                url: "appraise/insertAppraise"
            }, function (data) {
            	console.log(data)
                if (data.code == 0) {
                    tanwin("提交成功");
                    $('.pl-contentUL').empty();
                    isCommentPaging=false;
                    loadComment(1,10);
                }

            });

            $('.xzz').css("display", "none");
            $(".lidiv").css("display", "none");
            $("#commentId1 li").removeClass();

        }

	})
	/*判断是否收藏*/
	if(jzjy.getToken()){
        jzjy.ajax({
            params: {
                token: jzjy.getToken(),
                courseId: id
            },
            async: false,
            url: "userApp/whetherCollection"
        }, function(data) {
            console.log(data.data.type);
            var type = data.data.type
            if(type == 1) {
                $('.position-left span').text("已收藏");
                $('.position-left img').replaceWith('<img src="../../images/collectionstar.png"/>')

            } else if(type == 2) {
                $('.position-left span').text("收藏");
                $('.position-left img').replaceWith('<img src="../../images/course-list_collection_default.png"/>')

            }
        });
	}

	/*收藏*/
	$('.position-left').on('click', function() {
		if(jzjy.getTokenSkip()) {
            jzjy.ajax({
                params: {
                    token: jzjy.getTokenSkip(),
                    courseId: id
                },
                async: false,
                url: "userApp/collect"
            }, function (data) {
                console.log(data);
                if (data.data == 1) {
                    tanwin("已收藏");
                    $('.position-left span').text("已收藏");
                    $('.position-left img').replaceWith('<img src="../../images/collectionstar.png"/>')
                } else if (data.data == 2) {
                    tanwin("取消收藏");
                    $('.position-left span').text("收藏");
                    $('.position-left img').replaceWith('<img src="../../images/course-list_collection_default.png"/>')

                }
            });
        }
	})

})

/*课程品论列表*/
function loadComment(curPage,PageCount) {
	 //$('.pl-contentUL').empty();
    $("#info").remove();
	jzjy.ajax({
		params: {
			curPage: curPage,
			courseId: id,
			pageCount: PageCount
		},
		async: false,
		url: "appraise/queryAppraise"
	}, function(data) {
		if(data.code == 0) {
			console.log(data);
			var titleList = data.data.titleList; //可供选择标签
			var appraiseTitle = data.data.appraiseTitle; //已评论标签
            commentPaging=data.data.appraise.page
			var appraise = data.data.appraise.data; //评论信息
			console.log(appraise);
			$("#totolComment").html(' ('+data.data.appraise.page.totalRecord+') ');
			var TitleList = "";
			var Appraise = "";
			var AppraiseTitle = ""
			for(var i = 0; i < appraiseTitle.length; i++) {
				TitleList += '<li data-id="' + appraiseTitle[i].id + '">' + appraiseTitle[i].content + '<span>(' + appraiseTitle[i].count + ')</span></li>'
				$(".comment-ul-two").html(TitleList)
			}
			for(var i = 0; i < titleList.length; i++) {
				AppraiseTitle += '<li data-id="' + titleList[i].id + '">' + titleList[i].content + '</li>'
				$(".comment-ul-three").html(AppraiseTitle)
			}
			if(appraise.length>0&&appraise){
                for(var j = 0; j < appraise.length; j++) {
                    Appraise = '<li>' +
                        '<div class="pl-left">' +
                        '<img src="' + (appraise[j].appraiserPic ? appraise[j].appraiserPic : "../../images/person/userphoto.png") + '" />' +
                        '<div class="pl-left-top">' +
                        '<p>' + appraise[j].appraiserName + '</p>' +
                        '<p>' + appraise[j].createTime + '</p>' +
                        '<div style="margin-top: .3rem; width:179%;">' + (appraise[j].ordContent ? appraise[j].ordContent : "") + '</div>' +
                        '<div class="pl-top-bottom">' + (appraise[j].replyStr ? appraise[j].replyStr : "") + '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="pl-right" style="width: 35%;"><ul class="comment-ul">';
                    for(var i = 0; i < 5; i++) {
                        if(i < appraise[j].starLevel) {
                            Appraise += "<li class='newStar'></li>"
                        } else {
                            Appraise += "<li class='noStar'></li>";
                        }
                    }
                    Appraise += "</ul></div></li>";
                    $(".pl-contentUL").append(Appraise);

                }
                if(appraise.length<commentPaging.pageCount){
                    $(".pl-contentUL").after("<p id='info' style='text-align: center;color: #666666;'>已加载全部</p>")
                    isCommentPaging=true
                }
			}else{


			}

            /*点击弹出的li*/
            $(".lidiv .comment-ul-three>li").on('click', function() {
                $(this).toggleClass("comselect");

            })
		} else {
			console.log(data)
		}
	});
}


//返回
$("#lo_left").on("click",function () {
    window.history.back(-1)
})

//    滚动刷新
$(window).scroll(function () {
    //已经滚动到上面的页面高度
    var scrollTop = $(this).scrollTop();
    //页面高度
    var scrollHeight = $(document).height();
    //浏览器窗口高度
    var windowHeight = $(this).height();
    //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
    if (scrollTop + windowHeight == scrollHeight) {
        if(commentPaging&&!isCommentPaging){
            loadComment(commentPaging.curPage+1,commentPaging.pageCount);
        }else{

        }
    }
});
$(".catalog").on("click",".drop-down",function () {
    console.log($(this).attr("data-url"))
    $(".catalog>div").eq($(this).index())
    		.addClass("on").siblings().removeClass('on');
    	$("video").attr("src", $(this).attr("data-url"));
    	$("video").attr("data-id", $(this).attr("data-id"));
    	$("video")[0].play();
})


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
//
// $(".zz").on("click", function () {
//     // $("#qrcode").empty();
//     // $("#qrcode").removeAttr("title")
//     if ($(".zz").css("display") == 'none') {
//         $(".zz").show()
//     } else {
//         $(".zz").hide()
//         // $("body").css("overflow-x", "hidden");
//     }
// })
