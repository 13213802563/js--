$(window).resize(function () {
	if ($('.clons').css("position") != "static") {
		$('.clons').css({'position': 'static'})
	} else {
		$('.clons').css({'position': 'fixed'})
	}
});
var empData;
/*倒计时*/
jzjy.newAjax({
		params: {
			key: 715400229949959,
		},
		async: false
	},
	function(data) {
		console.log(data)
		var mss;
		var exists = data.data.exists;
		var flag = data.data.flag;
		if(exists == true) {
			if(flag == 1) {
				mss = data.data.overTime; //距离结束
			} else if(flag == 2) {
				mss = data.data.remainingTime; //距离开始
			} else if(flag == 3) {
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
			if(SysSecond > 0) {
				SysSecond = SysSecond - 1000;
				var days = Math.floor(SysSecond / (1000 * 60 * 60 * 24)); //天
				var hours = Math.floor((SysSecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); //时
				var minite = Math.floor(((SysSecond % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60)); //计算分
				var second = Math.floor((((SysSecond % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) % (1000 * 60)) / 1000); // 计算秒
				var daysZero = "";
				var hoursZero = "";
				var miniteZero = "";
				var seconedZero = "";
				if(days < 10) {
					daysZero = "0";
				}
				if(hours < 10) {
					hoursZero = "0";
				}
				if(minite < 10) {
					miniteZero = "0";
				}
				if(second < 10) {
					seconedZero = "0";
				}
				if(flag == 1) {
					var html = ""
					html += '<p>' + daysZero + days + '</p><span>天</span><p>' + hoursZero + hours + '</p><span>时</span><p>' + miniteZero + minite + '</p><span>分</span><p>' + seconedZero + second + '</p><span>秒</span>'
					$("#remainTime").html(html);
					$(".datatime p").html("距离活动结束还有");
					//window.location.reload();
				} else if(flag == 2) {
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

jzjy.activityKey({
	params: {
		key: 731434597046007,
		personId: getQueryString("empid"),
		activityId:"385303394984809"
	},
	async: false
}, function(data) {
	if(data.code == 0) {
		empData = data;
		var list = data.data.list;
		var imgDetails;
		var html = "";
		//if(data.data.display == 2) { //不展示编辑
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

		/*} else {
			$(".header span").on("click", function() {
				goto("../../my/userCenter.html");
			})
		}*/
	}
})
var mySwiper = new Swiper(".swiper-container", {
	autoplay: 2000,
	loop: true,
	autoplayDisableOnInteraction: false,
	pagination: ".swiper-pagination"

})
$(".detailsBnt").on("click", function() {
	if(jzjy.getToken()) {
		var param = {
			personId: getQueryString("empid"),
			token: jzjy.getToken(),
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
				$(".voteNum").html("编号 ：" + code + "　　　　票数 ：" + voteNum);
			} else {
				tanwin(data.msg);
			}
		})
	} else {
		$(".vote-login").show()
		$(".vote-login").css("z-index", 100);
		$(".homeContent").css({"height":"83vh","overflow": "hidden"});
	}

})
/*报名数投票数*/
jzjy.activityKey({
		params: {
			key: 837909539257991,
			activityId:"385303394984809"
		},
		async: false
	},
	function(data) {
		console.log(data)
		if(data.code == 0) {
			$(".searchTop .enrollNum").html(data.data.enrollNum);
			$(".searchTop .voteNums").html(data.data.voteNum);
		}
	})

$(function() {
	$(".vote-code").on("click",function () {
		$(".vote-code").hide();
	})
	/*我要报名*/
	$(".signUp button").on("click", function() {
		$(".vote-code").show();
		$(".vote-code").css("z-index", 100)
		return;
		/*if(loadOrder.isEnd) {
			tanwin("活动已结束");
			return;
		}*/
		/*if(localStorage.getItem("verity") == "1") {
			goto("/jzjy-wechat/html/my/authentication.html");
			return;
		}*/
		if(jzjy.getToken()) {
			$(".vote-code").show();
			/*jzjy.newAjax({
                params: {
                    key: 254149593116151,
                    token: getQueryString("token")
                },
                async: false
            }, function(data) {
                console.log(data.end.end)
                if(data.end.end == 2) {
                    tanwin("活动已结束");
                    return;
                }
                window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUxNjE4MjczMQ==&scene=124#wechat_redirect";
            })*/
			/*jzjy.newAjax({
				params: {
					key: 978133006158071,
					token: jzjy.getToken()
				},
				async: false
			}, function(data) {
				console.log(data)
				if(data.code == 0) {
					localStorage.setItem('name', data.data.name);
					localStorage.setItem('mobile', data.data.mobile);
					localStorage.setItem('personId', data.data.personId);
					goto("homepage/signUp.html")
				}
				if(data.code == "-1") {

					if(data.msg == "您还不是服务人员！") {
						goto("../my/userCenter.html");
					} else {
						tanwin(data.msg);
					}
				}

			})*/

		} else {
			$(".vote-login").show();
			$(".vote-login").css("z-index", 100)
			$(".homeContent").css({"height":"83vh","overflow": "hidden"});
		}
	})

	$(".clons img").on("click", function() {
		$(".vote-login").hide();
		$(".homeContent").css({"height":"100%"});
	})

	/*获取验证码*/
	$('#time').on('click', function() {
		if($("#phonenum").val() == "") {
			tanwin("请输入手机号码");
		}  else {
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
				url: "personnelApp/verificationCode"
			}, function(data) {
				/*console.log(data)*/
				if(data.code == '-1') {
					tanwin(data.msg)
				} else if(data.code == '-2') {
					tanwin('错误')
				} else if(data.code == "0") {
					timer = setInterval(function() {
						time--;
						if(time == 0) {
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
	/*登录*/
	$(".vote-sigin").on("click", function() {
		var vercode = $('#vercode').val();
		var phonenum = $('#phonenum').val();
		if(phonenum == "") {
			tanwin("您还没有输入手机号码");
		} else if(!(/^(13|15|18|14|17|16|19)\d{9}$/i.test(phonenum))) {
			tanwin("请输入正确的手机号");
		} else if(vercode == '') {
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
				url: "personnelApp/login"
			}, function(data) {
				console.log(data);
				if(data.code == -1) {
					tanwin(data.msg);
					return;
				} else {
					// 设置值
					_localStorage.setItem('token', data.data.token);
					_localStorage.setItem('mobile', phonenum);
					_localStorage.setItem("verity", "0");
					if(data.data.verify == "1") {
						//需要验证
						_localStorage.setItem("verity", "1");
					}
					$(".vote-login").hide();
					window.location.reload();
				}
			});
			window.location.href = window.location.href + '&time=' + new Date().getTime()
		}
	});
	//分享配置
	jzjy.ajax({
		url: "weChat/signature",
		async: false,
		params: {
			url: window.location.href.split("#")[0]
		}
	}, function(data) {
		if(data.code == "-2") {
			console.log(data);
		} else {
			if(data.code == "0") {
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
				var shareData={
					title:"【三好家政服务员评选】",
					content:"三好家政服务员评选开始啦，万元现金奖等您领，快来报名吧！",
					pic:  empData.data.list[0].cover?empData.data.list[0].cover:'http://erp.95081.com/img/img/2019/01/02/dddca91df1d74efeb525e1b054ee458f.jpg',
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