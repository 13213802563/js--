require.config({
    baseUrl: "./",
    paths: {
        jquery: "plugins/jquery/jquery-1.10.2",
        'jquery.validate':"plugins/jquery/validate/jquery.validate",
        bootstrap: "plugins/bootstrap/js/bootstrap",
        cookie:"plugins/jquery/jquery.cookie",
        'util':"source/public/js/util",
        config:"source/public/js/config", // 参数配置文件
        'jquery.toast': "plugins/jquery/jquery.toast",
        'rem':"source/public/js/rem",
        'audit':"source/videoMonitoring/js/audit"
    },
  shim:{
  		bootstrap: ["jquery"],
        'jquery.validate': ['jquery', "bootstrap"],
        cookie: ['jquery'],
        'util': ['jquery'],
        'jquery.toast': ['jquery'],
        'audit':['jquery']
    } 
    
});

requirejs(['jquery', 'config', 'jquery.validate', 'cookie', 'util', 'jquery.toast','audit'], function($,conf,audit) {
    var yt = {};

    yt.init = function() {
        // 登录框定位
        yt.loginLocation();

        // 用户登录事件绑定
        yt.bindLoginEvent();

        // 表单核验设置
        $("form").validate({
            onFocus: function() {
                  this.parent().addClass('active');
                  return false;
                },
            onBlur: function() {
              var $parent = this.parent();
              var _status = parseInt(this.attr('data-status'));
              $parent.removeClass('active');
                if (!_status) {
                    $parent.addClass('error');
              }
              return false;
            }
        });

        // rem布局操作
        window.onresize = function () {
            rem();
        }
        function rem() {
            var  width = document.body.clientWidth
             $('html')[0].style.fontSize = width / 19.2 + "px"
        }
        rem();
    };

    // 登录框定位
    $(window).resize(function() {
       yt.loginLocation();
    });
    yt.loginLocation = function(){
        var winHight= document.body.clientHeight;
        var loginArea=$(".login-area");
        var marginTop = winHight/2-loginArea.height()/2-90 >= 20 ? winHight/2-loginArea.height()/2-90 : 20;
        // loginArea.css("top", marginTop /);
    };

    // 提示信息
    yt.toastInfo = function(text, iconType) {
        $.toast({
            text: text,
            icon: iconType,
            position: 'bottom-right',
            stack: false,
            allowToastClose: false,
            loader: false,
            textColor: "#000"
        });
    };

    // 用户登录事件绑定
    yt.bindLoginEvent = function(){    	
    	if (parent.account && parent.pwd) {
    		var url = conf.authUrl + "getUserLoginInfo";
			$.ajax({
				url:url,
				type:"post",
				data:{
					userName: parent.account,
					userPwd: parent.pwd,
					sysName:conf.sysName
				},
				success:function(res){
					if(res.result){ // 如果登录成功						
						// 用户认证，得到token
						var token = res.object.token;
						var userName = res.object.user.userName;
						var organization = res.object.user.organization;
			       		// 创建一个cookie并设置cookie的有效路径：  
			        	$.cookie('token', token, {path: '/' });
			        	$.cookie('userName', userName, {path: '/' });
			        	$.cookie('organization', organization, {path: '/' });
						
	   					// 得到用户权限信息
						parent.window.userAuth = util.getUserAuthInfo(res.object.sysModule);
						//console.log(res);
						
						self.location = "index.html";
						
					}else{// 如果登录失败
						yt.toastInfo("用户名或密码错误！","error");
					}
				},
				error:function(){
					yt.toastInfo("网络出错，请确认！","error");
				}
			});
    }  	
        $(".login").click(function(){
            if(!$("form").validate("submitValidate")) {
                return;
            };
            
            var url = conf.authUrl + "getUserLoginInfo";
            var userName = $(".userName").val();
            var userPwd = $(".userPwd").val();
            $.ajax({
                url:url,
                type:"post",
                data:{
                    userName: userName,
                    userPwd: userPwd,
                    sysName:conf.sysName
                },
                success:function(res){
                    if(res.result){ // 如果登录成功
                        // 用户认证，得到token用户认证，得到token
                        var token = res.object.token;
                        var userName = res.object.user.userName;
                        var userId = res.object.user.userId;
                        var trueName = res.object.user.trueName;
                        // 创建一个cookie并设置cookie的有效路径：  
                        $.cookie('token', token, { expires: 7, path: '/' });
                        $.cookie('userName', userName, { expires: 7, path: '/' });  
                        $.cookie('trueName', trueName, { expires: 7, path: '/' });  
                        $.cookie('userId', userId, { expires: 7, path: '/' });
						
                        parent.window.userAuth = util.getUserAuthInfo(res.object.sysModule);

                        //console.log(parent.window.userAuth);

                        //console.log(res);

                        //sessionStorage.setItem('userAuth' , JSON.stringify(parent.window.userAuth));
                       
                        self.location = "index.html";    
                    }else{// 如果登录失败
                        yt.toastInfo("用户名或密码错误！","error");
                    }
                },
                error:function(){
                    yt.toastInfo("网络出错，请确认！","error");
                }
            })
        })
    };
  
// 实现rem布局操作
     yt.rem=function(){
        var  width = document.body.clientWidth

        var  fontSize = document.getElementsByTagName('html')[0].style.fontSize = width / 19.2 + "px"
}


    // 键盘enter事件
    $("input").on("keydown", function(event) {
        if (event.keyCode === 13) {
           $(".login").trigger("click"); 
        }
    })
    yt.init();
})
