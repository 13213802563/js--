
define(["jquery", "config", "plupload"], function ($, conf) {

  $("body").off("click").on("click", ".deleteImg", function () {
    $(this).parent().remove();

  });

  var upload = {};

  upload.getUploadImgList = function (field) {
    var imgArray = [];
    $(".file_type_pic_warp").find("li").each(function () {
      if (!$(this).hasClass("UploadProgress")) {
        var evImg = {};
        evImg[field] = $(this).find(".fileImg").attr("uploadsrc");
        imgArray.push(evImg);
      }

    });
    return imgArray;
  }


  upload.loadUploadFile = function (browse_button, FileInfoWarp, filterName, onlyOneImg, UploadCompleteFun, UploadProgressFun) {

    /*
    *
    * browse_button   添加文件的按钮盒子id
    * FileInfoWarp    放置文件盒子的id
    * filterName      选择文件名称 img/pdf/word/excel/doc/docx.....
    * onlyOne         选择可上传文件数量(true仅可一个)/(false可上传一个或多个,默认false)
    * deleteImgUrl    上传文件为img时,图片右上角的删除图标
    *
    */

    if (UploadCompleteFun == undefined) var UploadCompleteFun = function () { };
    if (UploadProgressFun == undefined) var UploadProgressFun = function () { };
    if (onlyOneImg == undefined) var onlyOneImg = false;
    else var onlyOneImg = true;

    if (filterName == undefined) var filterName = 'img';
    //		var filterName = 'other';

    if (filterName == 'img') {
      var filters = [{ //只允许上传图片
        title: "Image files", extensions: "jpg,gif,png"
      }
      ];
    }
    if (filterName == 'other') {
      var filters = [{ title: "Pdf files", extensions: "pdf" },
      { title: "Word documents", extensions: "doc,docx,docm,dotx,dotm" },
      ]
    }


    var status = {};


    function previewImage(file, callback) { //file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
      if (!file || !/image\//.test(file.type)) return; //确保文件是图片
      if (file.type == 'image/gif') { //gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
        var fr = new mOxie.FileReader();
        fr.onload = function () {
          callback(fr.result);
          fr.destroy();
          fr = null;
        }
        fr.readAsDataURL(file.getSource());
      } else {
        var preloader = new mOxie.Image();
        preloader.onload = function () {
          preloader.downsize(100, 100); //先压缩一下要预览的图片,宽300，高300
          var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
          callback && callback(imgsrc); //callback传入的参数为预览图片的url
          preloader.destroy();
          preloader = null;
        };
        preloader.load(file.getSource());
      }
    }

    var uploader = new plupload.Uploader({
      chunk_size: "200kb",
      browse_button: browse_button, //触发文件选择对话框的按钮，为那个元素id
      url: conf.baseUrl + 'prj/uploadFiles', //服务器端的上传页面地址
      flash_swf_url: 'js/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
      silverlight_xap_url: 'js/Moxie.xap', //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
      unique_names: true,
      multi_selection: false,
      //			resize: {   //文件上传的大小限制
      //				width: 200,
      //				height: 200,
      //				crop: true,
      //				quality: 60,
      //				preserve_headers: false
      //			},
      filters: {
        mime_types: filters,
      },
      views: {
        list: true,
        thumbs: true, // Show thumbs
        active: 'thumbs'
      },
      init: {

        PostInit: function () {

          //					document.getElementById(FileInfoWarp).innerHTML = '';

        },
        FilesAdded: function (up, files) {
          // 执行只上传一个图片
          if (onlyOneImg) {
            $('#' + FileInfoWarp).html("");
            $.each(up.files, function (i, file) {

              if (up.files.length > 1) {
                up.removeFile(file);
                $("#file-" + file.id).remove();
              }
            });
          }

          $("#" + FileInfoWarp).siblings('.upfile').prop("required", "true");
          if (filterName == 'img') {
            for (var i = 0, len = files.length; i < len; i++) {
              var file_name = files[i].name; //文件名
              //构造html来更新UI
              var html = '<li id="file-' + files[i].id + '" class = "UploadProgress"></li>';
              $('#' + FileInfoWarp).append(html);
              ! function (i) {
                previewImage(files[i], function (imgsrc) {
                  var filesTypeName = files[i].name.substr(files[i].name.indexOf("."));
                  $('#file-' + files[i].id).append('<div class="process_bar"></div><img uploadSrc = "' + files[i].id + filesTypeName + '" src="' + imgsrc + '" class = "fileImg"/><img src="../source/mapShow/img/deleteImg.png" class="deleteImg">');
                })
              }(i);
            }
          }



          // 执行只让一个pdf进行上传，上传第二个pdf时候进行终止
          if (filterName == 'other') {
            $.each(up.files, function (i, file) {
              if (up.files.length > 1) {
                up.removeFile(file);
              }
              document.getElementById(FileInfoWarp).innerHTML = '<div class = "otherFileWarp " id="' + up.files[0].id + '"><span>' + up.files[0].name + ' </span>(' + plupload.formatSize(up.files[0].size) + ') <b></b></div>';
            });
          }
          uploader.start();
        },

        Error: function (up, err) {
          if (err.code == -601) {
            alert("不允许上传该文件类型！");
          }
          //document.getElementById('uploadfiles').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
        },
        FileUploaded: function (up, file, res) {
          var filesTypeName = file.name.substr(file.name.indexOf("."));
          if (filterName == 'img') {
            $("#file-" + file.id).removeClass("UploadProgress");
          }
          if (filterName == 'other') {
            $("#" + file.id).attr("attachment", file.id + filesTypeName);
            attachment = JSON.parse(res.response).message;
          }

        },
      }
    });

    uploader.bind('UploadComplete', function (uploader, files) {
      $("#" + FileInfoWarp).siblings('.upfile').removeProp("required");
      $("#" + FileInfoWarp).siblings(".help-block").empty();

      for (var i in files) {
        if (files[i].type == "image/jpeg" || files[i].type == "image/png") {
          $("#file-" + files[i].id).find(".img_upload").remove();

        }
      }

    });
    uploader.bind('UploadProgress', function (up, file) {

      var processHtml = "<div class='img_upload'><p class='process_number'>" + file.percent + "%</p><div style='margin: 0px 0 0 10px;'><span class = 'process_warp'><span class='proess'></span></span></div></div>"

      $("#file-" + file.id).find(".process_bar").html(processHtml);
      $("#file-" + file.id).find(".proess").css("left", (file.percent * 0.8) - 80 + "px");
      // if (file.type == "application/pdf") {
        $("#" + file.id).find("b").html('<span>' + file.percent + "%</span>");
      // }
    });


    uploader.init();

    return function () {
      var result = {};
      var upPercent = 101;
      result.uploader = uploader;
      if (uploader.files.length != 0) {
        upPercent = uploader.files[uploader.files.length - 1].percent;
        result.percent = upPercent;
      }
      return result;
    }
      ;
  };


  upload.getAttachment = function () {
    return $(".otherFileWarp").attr("attachment");
  }

  return upload;

});

