$(function() {
    $(".index-footer li:last-child p").html("排名")
	jzjy.newAjax({
		params: {
			key: 784214756151543
		},
		async: false
	}, function(data) {
		console.log(data)
		var html = "";
		var p = "";
		var prize=data.data.prize;
		var mode=data.data.mode;
		if(data.code == "0") {
			for(var i = 0; i < prize.length; i++) {
				html += '<tr><td>' + prize[i].title + '</td>' +
					'<td>' + prize[i].ranking + '</td>' +
					'<td style="width:50%;">' + prize[i].content + '</td></tr>'
			}
			
			$(" table tbody ").html(html);
			for(var j = 0; j < mode.length; j++) {
				var content=mode[j].content
				p += '<h2>' + mode[j].title + '</h2>';
				for(var z=0;z<content.length;z++){
					p += '<div>' + content[z] + '</div>'
				}
				$(".prizeRule").html(p)
			}	
		}

	})


    /*分享*/
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