var info,isEnd=false;
var token,isLogin;
$(function() {
	var personId = getQueryString("empid");
	var buttonId = getQueryString("button");
	if(getQueryString("token")){
        token=getQueryString("token")
		isLogin='true'
	}else{
		token=jzjy.getToken();
		isLogin='false'
	}

	if(buttonId == 1) {
		$(".detailsBnt button:first-child").hide();
	}
	jzjy.newAjax({
		params: {
			key: 254149593116151,
			token: token,
			activityId:385303394984809
		},
		async: false
	}, function(data) {
        if (data.code == 0) {
            var list = data.data.list;
            if (list.length > 0) {
                if (data.data.end == 2) {
                     $(".detailsBnt").hide();
                     isEnd = true;
                }
            }
        }
	})

	jzjy.activityKey({
		params: {
			key: 731434597046007,
			token: token,
			personId: personId,
            activityId:385303394984809
		},
		async: false
	}, function(data) {
		if(data.code == 0) {
			var list = data.data.list;
			var imgDetails;
			var html = "";
			if(data.data.display == 2) { //不展示编辑
				info = list[0];
				$(".header span").hide();
				$(".header p").html(list[0].name);
				$(".description p").html(list[0].describe);
				$(".voteNum").html('编号：' + list[0].code + '　　　　票数 ：' + list[0].voteNum);
				imgDetails = data.data.list[0].imgDetails.split('|-|');
				for(var i = 0; i < imgDetails.length; i++) {
					html += '<div class="swiper-slide"><img src="' + imgDetails[i] + '" style="height:11rem;width: 100%;"/></div>'
				}
				$(".swiper-wrapper").html(html);
			} else {
				$(".header span").on("click", function() {
					//goto("../../my/userAuthentication.html");
				})
			}
		}
	 })
	var mySwiper = new Swiper(".swiper-container", {
		autoplay: 2000,
		loop: true,
		autoplayDisableOnInteraction: false,
		pagination: ".swiper-pagination"

	})
    $(".swiper-container img:first-child").on("load",function () {
        $('body').height($(document).height());
    })
	//投票
	var isVote = false;
	$("#voteBtn").on("click", function() {
        if(isVote)return;
		isVote = true;
		var param = {
			personId: getQueryString("empid"),
			token: token,
			key: "572275157481463",
            activityId:385303394984809
		}
		jzjy.activityKey({
			params: param,
			async: false
		}, function(data) {
			if(data.code == "0") {
				tanwin("投票成功");
				var voteNum = data.data.voteNum;
				var code = data.data.code;
				isVote = false
				$(".voteNum").html("编号 ：" + code + "　　　　票数 ：" + voteNum);
			} else {
				tanwin(data.msg);
				isVote = false
			}
		})
	})
	/*分享投票*/
	$("#shareVote").on("click", function() {
		if(!jzjy.isWechat()){
			    bridgeObj.share({
                    'isLogin':isLogin,
                    'title':"我是【" + info.name + "】，正在参加【三好家政服务员评选】",
                    'content':"快来为我投上一票吧？",
                    'url':jzjy.shareVoteUrl + "?empid=" +getQueryString("empid"),
                    "imgUrl":info.cover
                }, function(responseData) {

                });
		}
		else{
            $("#rgbn").show();
		}
	})
	$("#rgbn").on("click", function() {
		$("#rgbn").hide()
	})

	if(isEnd){
		jzjy.hideShare(wx);
	}
	else {
        //分享配置
        jzjy.ajax({
                url: "weChat/signature",
                async: false,
                params: {
                    url: window.location.href.split("#")[0]
                }
            },
            function (data) {
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
                            title: "我是【" + info.name + "】，正在参加【三好家政服务员评选】",
                            content: "快来为我投上一票吧？",
                            pic:info.cover,
                            url: jzjy.shareVoteUrl + "?empid=" + info.empId + "&token=" + jzjy.getToken()
                        }
                        registeEvent(shareData);
                    }
                }
            })
    }
})

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