require.config({
	baseUrl: "../",
	paths: {
		jquery: "plugins/jquery/jquery-1.10.2",
		dhx: "plugins/dhtmlxSuite_pro/dhtmlx",
		createMenu: "source/public/js/createMainMenu",
		util: "source/public/js/util",
		leafLet: "plugins/leaflet/leaflet",
		config: "source/public/js/config", // 参数配置文件
		subConfig: "source/materialsManagement/js/config", // 参数配置文件
		bootstrap: "plugins/bootstrap/js/bootstrap",
		widgets: "plugins/customPlugins/widgets"
	},

	shim: {
		'bootstrap': ["jquery"],
		'util': ['jquery'],
		'widgets': ['jquery'],
	}
});

requirejs(['jquery', 'config', 'subConfig', 'util', "widgets"], function ($, conf, subConf) {

  var personType = $.cookie("trueName")
	var yt = {
		init: function () {
			this.renderMenuNavigation();
			this.bindEvent();

			// 得到用户所有权限
			var userAuthModel = parent.parent.window.userAuth;
			// 得到用户当前模块的权限
			var authModelMenu = util.getAuthModelMenu(userAuthModel, conf, subConf);
			var authModelMenu = subConf.modelMenu;
	
			if (personType.indexOf("管理员") === -1) {
				authModelMenu.splice(2, 1);
			
			}
			// 初始化菜单
			$(".leftMenu").modelMenu({
				menuList: authModelMenu,
				urlContainer: "#container",
				width: 192,
				height: 40,
				direction: "vertical"
			});

		},
		bindEvent: function () {
			$(".menu_navigation li").click(function () {
				parent.$(".containers").show();
				parent.$("#mainContent").hide();
			});
			var src;
			var img;
			var text;
			$('.menu_navigation li').hover(function () {
				img = $(this).find('img');
				src = img.attr('src');
				text = $(this).find('p').eq(1).html();
				img.attr('src', '../source/public/img/home.png');
				$(this).find('p').eq(1).html('返回首页');
			}, function () {
				img.attr('src', src);
				$(this).find('p').eq(1).html(text);
			})
		},

		// 左侧返回首页
		renderMenuNavigation: function () {
			var modelId = parent.$("iframe").attr("id");
			var liHtml = "";
			var menu = conf.navigationMenuInfo;
			for (var i = 0, len = menu.length; i < len; i++) {
				liHtml += "<li data-url=\"" + menu[i].pageUrl + "\" data-id=\"" + menu[i].modelId + "\"><p>" + menu[i].img + "</p><p>" + menu[i].Name + "</p></li>";
			}
			$(".menu_navigation").html(liHtml);

			$(".menu_navigation li").each(function () {
				if ($(this).attr("data-id") === modelId) {
					$(this).addClass("active").show();
				} else {
					$(this).hide();
				}
			});
		}
	};

	yt.init();
})