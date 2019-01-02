define(['jquery', 'dhx', "config", "util", 'widgets', 'flatUi', 'widgets', 'application', "inputs"], function($, dhx, conf) {
	//定义全局变量DL

	var DL = {
		delete: function(ob) {
			var projectPerson = $(".project_connent .project_person .project_name");
			for(var i = 0; i < projectPerson.length; i++) {
				var divContent = $(".project_connent .project_person .project_name:eq(" + i + ")");
				if(divContent.text() == $(ob).text()) {
					divContent.parent().removeClass("click_green");
				}
			}
			$(ob).remove();
		}
	};

	$(".search_project").keyup(function() {
		$(".project_connent").html("内容检索由此处传参到数据库检索出来的");
	});
	$(".project_person").click(function() {
		var str = $(this).attr('class');
		var content = $(this).children(".project_name").text();
		if(str == 'project_person click_green') {
			$(this).removeClass("click_green");
			var contentLi = $(".link_project ul li");
			for(var i = 0; i < contentLi.length; i++) {
				var liContent = $(".link_project ul li:eq(" + i + ")");
				if(liContent.text() == content) {
					liContent.remove();
				}
			}
		} else if(str == 'project_person') {
			$(this).addClass("click_green");
			$(".link_project ul").append("<li>" + content + "<i class='fa fa-close'></i></li>");
		}
	});

	$(".link_project ul").on("click", 'li', function() {
		DL.delete(this);
	});

});