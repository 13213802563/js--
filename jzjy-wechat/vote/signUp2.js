$(window).resize(function () {
    if ($('#signup').css("position") != "static") {
        $('#signup').css({'position': 'static'})
    } else {
        $('#signup').css({'position': 'fixed'})
    }
});
var status="",isFinish=false;
$(function() {
	var id = _localStorage.getItem("id");
	var personId = _localStorage.getItem("personId");
    $("#name").val( getQueryString("name"));
    $("#mobile").val(getQueryString("mobile"));
	var type = getQueryString("type");


	/*个人详情*/
	if(type == 1) {
		$(".orgName").hide();
		jzjy.activityKey({
			params: {
				key: 731434597046007,
				token: getQueryString("token"),
				personId: getQueryString("personId"),
				activityId:'385303394984809'
			},
			async: false
		}, function(data) {
			console.log(data);
			if(data.code == 0) {
				$("#name").val(data.data.list[0].name);
				$("#address").val(data.data.list[0].receiveAddr);
				$("#tile").html(data.data.list[0].describe);

				status=data.data.list[0].status;
				$("#behindImage").attr("src", data.data.list[0].cover);
                $("#uploadBehindImage").attr("data-src",data.data.list[0].cover);
				var imgDetails=data.data.list[0].imgDetails.split('|-|');
				for(var i=0;i<imgDetails.length;i++){
                    var imgLi = $('<li data-src="' + imgDetails[i] + '"> <img src="../../../images/cha.png" class="chaImg"/>' +
                        "<img src='" +imgDetails[i] + "' class='uploadImgShow jsImg'/> </li>");
                    $(".chaImg", imgLi).on("click", function() {
                        var self = this;
                        $(self).parent().remove();
                        if($(".upload li").length < 7) {
                            $("#fontImage").parent().show();
                        } else {
                            $("#fontImage").parent().hide();
                        }
                    });
                    $("#fontImage").parent().before(imgLi);
				}
			}

		})
	}

	//上传图片事件
	/*封面*/
	$("#behindImage").on("click", function() {
		$("#uploadBehindImage").click();
	});
	$("#uploadBehindImage").change(function() {
		$(".upload .one").hide();
		var self = $(this);
		let formData = new FormData();
		formData.append('files', $(this)[0].files[0]);  //添加图片信息的参数
		formData.append('type', 'ZPQ');
		$.ajax({
			url: '/img_service/ul/uploadImg.action',
			type: 'POST',
			cache: false, //上传文件不需要缓存
			data: formData,
			processData: false, // 告诉jQuery不要去处理发送的数据
			contentType: false, // 告诉jQuery不要去设置Content-Type请求头
			success(data){
				if(data.recode == "0") {
					console.log(data);
					data.reUrl.forEach(function(t, number) {
						$("#behindImage").attr("src",t);
						$(self).attr("data-src",t);
					})
				} else {
					if(data.recode == "20006") {
						tanwin("不允许上传的类型，只支持GIF、PNG、JPG、JPEG");
						return false;
					} else {
						tanwin(data.errMsg);
						console.log(JSON.stringify(data))
					}
				}
			}
		})

		// jzjy.ajaxFile(self[0].files, function(data) {
		// 	if(data.recode == "0") {
		// 		console.log(data);
		// 		data.reUrl.forEach(function(t, number) {
		// 			$("#behindImage").attr("src",t);
		// 			$(self).attr("data-src",t);
		// 		})
		// 	} else {
		// 		if(data.recode == "20006") {
		// 			tanwin("不允许上传的类型，只支持GIF、PNG、JPG、JPEG");
		// 			return false;
		// 		} else {
		// 			tanwin(data.errMsg);
		// 			console.log(JSON.stringify(data))
		// 		}
		// 	}
		// })

	})
	$("#fontImage").on("click", function() {
		$("#uploadfontImage").click();
	})
	$("#iptModule").on('change','#uploadfontImage',function() {
		//$(".upload .two").hide()
		var self = $(this);
		if($(".upload li").length - 2 + self[0].files.length > 5) {
			tanwin("您上传的照片数量已达到上限哦!")
			return
		}
		let fileObj = $(this)[0].files[0] //上传文件的对象
		let reader = new FileReader()
		reader.readAsDataURL(fileObj)
		reader.onload = function(e) {
			let image = new Image() //新建一个img标签（还没嵌入DOM节点)
			image.src = e.target.result
			image.onload = function() {
				let canvas = document.createElement('canvas'),
					context = canvas.getContext('2d'),
					imageWidth = image.width / 2,    //压缩后图片的大小
					imageHeight = image.height / 2,
					data = ''

				canvas.width = imageWidth
				canvas.height = imageHeight

				context.drawImage(image, 0, 0, imageWidth, imageHeight)

				data = canvas.toDataURL('image/jpeg')
				let arr = data.split(','), mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
				while(n--){
					u8arr[n] = bstr.charCodeAt(n);
				}
				let files = new window.File([new Blob([u8arr], {type:mime})], 'test', {type: 'image/jpeg'})

			}
		}

		let formData = new FormData();
		formData.append('files', $(this)[0].files[0]);  //添加图片信息的参数
		formData.append('type', 'ZPQ');
		$(this).remove()
		$.ajax({
			url: '/img_service/ul/uploadImg.action',
			type: 'POST',
			cache: false, //上传文件不需要缓存
			data: formData,
			processData: false, // 告诉jQuery不要去处理发送的数据
			contentType: false, // 告诉jQuery不要去设置Content-Type请求头
			success(data){
				if(data.recode == "0") {
					data.reUrl.forEach(function(t, number) {
						var imgLi = $('<li data-src="' + t + '"> <img src="../../../images/cha.png" class="chaImg"/>' +
							"<img src='" + t + "' class='uploadImgShow jsImg'/> </li>");
						$("#fontImage").parent().before(imgLi);
						$(".chaImg", imgLi).on("click", function() {
							var self = this;
							$(self).parent().remove();
							if($(".upload li").length < 7) {
								$("#fontImage").parent().show();
							} else {
								$("#fontImage").parent().hide();
							}

						});
						if($(".upload li").length < 7) {
							$("#fontImage").parent().show();
						} else {
							$("#fontImage").parent().hide();
						}
					})
					let el = document.createElement('input')
					el.type = 'file'
					el.accept = 'image/*'
					el.id = 'uploadfontImage'
					el.style = 'display: none'
					el.value = ''
					document.getElementById('iptModule').appendChild(el)

				} else {
					if(data.recode == "20006") {
						tanwin("不允许上传的类型，只支持GIF、PNG、JPG、JPEG");
						return false;
					} else {
						tanwin(data.errMsg);
						console.log(JSON.stringify(data))
					}
				}
			}
		})

		// function compress() {
		// 	let fileObj = document.getElementById('file').files[0] //上传文件的对象
		// 	let reader = new FileReader()
		// 	reader.readAsDataURL(fileObj)
		// 	reader.onload = function(e) {
		// 		let image = new Image() //新建一个img标签（还没嵌入DOM节点)
		// 		image.src = e.target.result
		// 		image.onload = function() {
		// 			let canvas = document.createElement('canvas'),
		// 				context = canvas.getContext('2d'),
		// 				imageWidth = image.width / 2,    //压缩后图片的大小
		// 				imageHeight = image.height / 2,
		// 				data = ''
		//
		// 			canvas.width = imageWidth
		// 			canvas.height = imageHeight
		//
		// 			context.drawImage(image, 0, 0, imageWidth, imageHeight)
		// 			data = canvas.toDataURL('image/jpeg')
		//
		// 		}
		// 	}
		// }
		// $(this)[0].type = 'text'
		// $(this)[0].type = 'file'

		/*var typeCode = $(this).attr("data-typeCode");
		lrz($(this)[0].files[0], {
			width: 800
		}).then(function(rst) {
			$("#fontImage").attr("src", rst.base64);
			$.grep(pictures, function(t) {
				if(t.typeCode == typeCode) {
					t.fileName = new Date().getTime() + rst.origin.name;
					t.file = rst.file;
				}
			})
		})*/
	})

	$("#signup").on("click", function() {
		if(isFinish){
			return;
		}
        isFinish=true;
		if(!$("#name").val()) {
			tanwin("请您输入您的姓名");
            isFinish=false;
			return;
		}
		if(!type){
			if(!$("#orgName").val()) {
				tanwin("请您输入您的家政公司");
				isFinish=false;
				return;
			}
		}

		if(!$("#address").val()) {
			tanwin("请您输入您的详细地址");
            isFinish=false;
			return;
		}
		if(!$("#tile").val()) {
			tanwin("请描述您的荣誉、优势等等来拉票");
            isFinish=false;
			return;
		}
		if(!$('#uploadBehindImage').attr("data-src")){
            tanwin("请上传封面图片");
            isFinish=false;
            return;
		}
		if($(".upload li").length <3) {
            tanwin("请上传照片");
            isFinish=false;
            return;
		}
		var imgUrl=$.map($(".upload .jsImg"),function (item) {
			return $(item).attr("src");
        }).join("|-|");
        $("#signup").attr("disabled",true)
		/*添加*/

		if(type == null||!type||type==undefined) {
			jzjy.newAjax({
				params: {
					key: 466695831557111,
                    activityId:'385303394984809',
					type:1,
					token: getQueryString("token"),
                    mobile:$("#mobile").val(),
					name:$("#name").val(),
					orgName: $("#orgName").val(),
					describe: $("#tile").val(),
					receiveAddr: $("#address").val(),
					imgDetails: imgUrl, //详情图片
					cover: $('#uploadBehindImage').attr("data-src") //封面
				},
				async: false
			}, function(data) {
				if(data.code == 0) {
					goto("../homePage.html")
				}
				if(data.code == "-1") {
					tanwin(data.msg);
                    isFinish=false;
				}
			})
		}
		if(type == 1) {
			/*修改信息*/
			jzjy.newAjax({
				params: {
                    name:$("#name").val(),
					key: 872952906392839,
					id: getQueryString("idInfo"),
					describe: $("#tile").val(),
					receiveAddr: $("#address").val(),
					imgDetails: imgUrl, //详情图片
					cover: $('#uploadBehindImage').attr("data-src"), //封面
					status: status
				},
				async: false
			}, function(data) {
				console.log(data);
				if(data.code == 0) {
					goto("../homePage.html")
				}
				else{
                    isFinish=false;
                    tanwin(data.msg);
					console.log(JSON.stringify(data))

				}
			})
		}
        $("#signup").attr("disabled",false);
	});
	jzjy.hideShare(wx);
})