$(function() {
	$(".download").click(function() {
		initPage()
		downloadApp();

	})
	$("#content").click(function() {
		$("#content").css("display", "none");
	})

	function initPage() {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == "micromessenger") {
			$("#content").css("display", "block");
		} else {
			$("#content").css("display", "none");
		}

	}

	function downloadApp() {
		if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
			  
			window.location.href = "https://itunes.apple.com/cn/app/id1282946357";
		} else {   
			window.location.href = "http://app.95081.com/jzjy.apk";
		}
	}

})