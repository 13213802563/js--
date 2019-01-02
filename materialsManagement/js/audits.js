require.config({
  baseUrl: "../",
  paths: {
    jquery: "plugins/jquery/jquery-1.10.2",
    util: "source/public/js/util",
    page: "plugins/jquery/jquery.page",
    dhx: "plugins/dhtmlxSuite_pro/dhtmlx",
    widgets: "plugins/customPlugins/widgets",
    addPerson: "source/materialsManagement/js/addPerson",
    inputs: "source/materialsManagement/js/input",
    flatUi: "plugins/flatui/js/flat-ui.min",
    application: "plugins/flatui/js/application",
    config: "source/public/js/config", // 参数配置文件
    bootstrap: "plugins/bootstrap/js/bootstrap.min",
    'bootstrap.table': "plugins/bootstrap/bootstrap.table/bootstrap-table",
    'bootstrap.table.local': "plugins/bootstrap/js/bootstrap-table-zh-CN.min",
    template: "plugins/art-template/lib/template",
  },
  shim: {
    "flatUi": ['jquery'],
    "addPerson": ['inputs'],
    "application": ['jquery', 'flatUi'],
    "input": ['jquery'],
    'widgets': ['jquery'],
    'bootstrap': ['jquery'],
    'bootstrap.table': ['bootstrap'],
    'bootstrap.table.local': ['bootstrap.table'],
    'template': ['jquery'],
    //      'jquery.toast': ['jquery'],
    "util": ['dhx', 'jquery'],
  }
});
requirejs(['jquery', 'dhx', "config", 'template', "util", 'widgets', 'flatUi', 'widgets', 'application', 'addPerson', 'bootstrap', 'bootstrap.table', 'bootstrap.table.local'], function ($, dhx, conf, template) {
  var yt = {};
  // var baseUrl = conf.baseUrl;
  // var isUpdate = util.getQueryString("authFlag") == "update" ? true : false;

  var personType = $.cookie("trueName");
  var cookId = $.cookie("userId");

  yt.init = function () {
    yt.loadTableData();
    // 表格控件初始化
    yt.tableInit();

    yt.searchResults();
  };

  //人员信息列表表格
  yt.tableInit = function () {
    yt.gridTable = new dhtmlXGridObject('taskInfo_table');
    yt.gridTable.setHeader("序号,调运申请人,调运仓库,申请时间,审批人,审批时间,调拨人,调拨时间,状态,调运物资");
    yt.gridTable.setInitWidthsP("5,9,10,12,10,14,10,14,8,10");
    yt.gridTable.setColAlign("center,center,center,center,center,center,center,center,center,center");
    yt.gridTable.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");
    yt.gridTable.enableAutoHeight(true);
    yt.gridTable.enableTooltips("false, false, false, false, false, false, false, false, false, false");
    yt.gridTable.init();
    yt.gridTable.enableAlterCss("even", "uneven");
    yt.gridTable.setStyle(
      "font-size:12px;text-align:center;border:none;background:#ECF6FF;color:#686968;",
      "font-size:12px;border:none;color:#848484",
      "boder:none;",
      "background:''"
    );
  };

  var idName = {}
  var personName = {}
  yt.loadTableData = function (content) {
     var content_data = {};
    //　设定查询条件
    if (personType.indexOf("审核人") !== -1) content_data.audit_man = $.cookie("userId")
    if (personType.indexOf("调运人") !== -1) content_data.transported_man = $.cookie("userId")
    if (personType.indexOf("仓管人员") !== -1) { content_data.transported_stauts = (1 + "," + 3) }
    // if (personType.indexOf("仓管人员") !== -1) content_data.allot_man = $.cookie("userId") 

   if (content == undefined) {
      content_data.obj_name = ""
    } else {
      content_data.obj_name = content;
    }
    //　请求得到人员列表数据
    $.ajax({
      url: conf.baseUrl + "prj/getauditManagementList",
      data: content_data,
      success: function (jsonData) {

        util.requestData({
          url: conf.baseUrl + "prj/getTransportPersonList",

          success: function (res2) {
            util.requestData({
              url: conf.baseUrl + "prj/getMaterialStoreList",
              success: function (res) {
                var rows = [];

                for (var i = 0; i < res2.length; i++) {
                  if (res2[i].person_id === cookId && res2[i].relevance_store) {
                    var stId = res2[i].relevance_store.split(",")
                  }
                }
                if (personType.indexOf("仓管人员") !== -1) {
                  var jsonDataArr = []
                  for (var k = 0; k < stId.length; k++) {
                    for (var i = 0; i < jsonData.length; i++) {
                      if (jsonData[i].transported_store === stId[k]) {
                        jsonDataArr.push(jsonData[i]);
                        console.log(jsonDataArr);
                      }
                    }
                  }
                  jsonData = jsonDataArr
                }

                if (jsonData.length === 0) {
                  var rows1 = { rows: [{ id: 0, data: ['', '', '', '', '', '暂无数据...', '', '', '', '',] }] }
                  yt.gridTable.clearAll();
                  yt.gridTable.parse(rows1, "json");
                  return
                }

                for (var i = 0; i < res.length; i++) {
                  var sId = res[i].store_id
                  idName[sId] = res[i].store_name
                }

                for (var i = 0; i < jsonData.length; i++) {
                  var rowsData = {};
                  var rowsContent = [];
                  var transported_stauts = ""

                  if (jsonData[i].transported_stauts === "0") {
                    transported_stauts = "待审批"
                  } else if (jsonData[i].transported_stauts === "1") {
                    if (personType.indexOf("管理员") !== -1 || personType.indexOf("仓管人员") !== -1) {
                      transported_stauts = '<a class="transported" data-reviewId=' + jsonData[i].review_id + '>待调拨</a>'
                    } else {
                      transported_stauts = "待调拨"
                    }
                  } else if (jsonData[i].transported_stauts === "2") {
                    transported_stauts = '<span class="color">未通过</span>'
                  } else if (jsonData[i].transported_stauts === "3") {
                    transported_stauts = "完成"
                  }

                  rowsContent.push(i + 1);
                  rowsContent.push(jsonData[i].transported_man_name);
                  rowsContent.push(idName[jsonData[i].transported_store]);
                  rowsContent.push(jsonData[i].apply_time);
                  rowsContent.push(jsonData[i].audit_man_name);
                  rowsContent.push(jsonData[i].audit_time);
                  rowsContent.push(jsonData[i].allot_man_name);
                  rowsContent.push(jsonData[i].allot_time);
                  rowsContent.push(transported_stauts);
                  rowsContent.push('<a class="details" data-id=' + jsonData[i].review_id + '>详情</a>');
                  rowsData.id = i + 1;
                  rowsData.data = rowsContent;
                  rows.push(rowsData);
                };
                var data1 = { rows: rows };
                yt.rows = rows;
                yt.gridTable.clearAll();
                yt.gridTable.parse(data1, "json");

                if (personType.indexOf("管理员") !== -1 || personType.indexOf("仓管人员") !== -1) {
                  $(".transported").click(function () {
                    $('#myDelModal').modal('show');
                    var review_id = $(this).attr("data-reviewId");
                    var allot_man = cookId
                    allot(review_id, allot_man)
                  });
                }

                $(".details").on("click", function () {
                  var detailsId = $(this).attr("data-id")
                  yt.inOutSuppliesWin(detailsId);
                })
              }
            });
          }
        });
      }
    });
  };

  // 调拨物资
  function allot(review_id, allot_man) {
    $(".btn-del").on("click", function () {
      var allot_time = new Date().Format('yyyy-MM-dd hh:mm');

      var data = {
        review_id: review_id,
        allot_man: allot_man,
        allot_time: allot_time,
        transported_stauts: "3"
      }
      util.requestData({
        url: conf.baseUrl + "prj/updateAuditManagementManAndStauts",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (res) {
          if (res.result === true) {
            util.showToast("调拨物资成功", "success");
            yt.loadTableData();
          }
        }
      })
    })
  }

  //点击搜索
  yt.searchResults = function () {
    $(".search_btn").on("click", function () {
      var content = $(".search_input").val();
      yt.loadTableData(content);
    })
    $(".search_input").on("keyup", function (e) {
      if (e.keyCode === 13) {
        $(".search_btn").click()
      }
    })
  };

  // 调运物资详情
  yt.inOutSuppliesWin = function (detailsId) {
    $(".detailsBox").addClass("detailsMask");

    $.window({
      title: name + "调运物资详情",
      fullScreen: false,
      width: 700,
      height: $(window).height() * 0.8,
      text: "<table style='padding:0 5px' id='inOutSuppliesTable'></table>"
    });

    $("#inOutSuppliesTable").bootstrapTable({
      url: conf.baseUrl + "prj/getMaterialApplyList",
      queryParams: {
        review_id: detailsId
      },
      height: $(window).height() * 0.8 - 40,
      columns: [{
        title: '序号',
        align: 'center',
        formatter: function (value, row, index) {
          var option = $("#tableWrap").bootstrapTable("getOptions");
          return index + 1;
        }
      }, {
        title: '物资名称',
        field: 'material_name',
        align: 'center'
      }, {
        title: '调运数量',
        field: 'apply_number',
        align: 'center'
      }, {
        title: '图片',
        field: 'prj_materiapply',
        align: 'center',
        formatter: function (value, row, index) {
          if (value != undefined && value != "") {
            var id = row.material_id;
            var has = value != undefined && value.length > 0;
            return "<a style=\"cursor:pointer\" ><img src=\"../source/public/img/pic_001.png\"/></a>";
          }
          return '-';
        }
      }],
      onClickCell: function (field, value, row) {
        switch (field) {
          case "prj_materiapply":
            yt.picShow(row);
            break;
        }
      }

    });

    $(".window_closeIcon").on("click", function () {
      $(".detailsBox").removeClass("detailsMask");
    });
  };


  // 物资图片显示
  yt.picShow = function (row) {
    var materialpicList = row.prj_materiapply;

    var imgList = "";
    for (var j = 0; j < materialpicList.length; j++) {
      imgList +=
        '<li class="swiper-slide goods_pic">' +
        '<img src="' + conf.baseUrl + materialpicList[j].material_picurl + '"width="100%">' +
        '</li>'
    }

    $.window({
      title: name + "-物资图片",
      fullScreen: false,
      width: $(window).width() * 0.8,
      height: $(window).height() * 0.8,
      text:
        '<div id="banner-list" class="swiper-container">' +
        '<ul class="swiper-wrapper goods_ul">' + imgList + '</ul>' +
        '<div class="left_icon"><</div>' +
        '<div class="right_icon">></div>' +
        '</div>',
    });

    var picCount = 0;
    $(".right_icon").on("click", function () {
      picCount++;
      if (picCount > $(".goods_pic").length - 1) {
        picCount = 0;
      }
      $(".goods_pic").eq(picCount).fadeIn().siblings().fadeOut();
    });

    $(".left_icon").on("click", function () {
      picCount--;
      console.log(picCount);
      if (picCount < 0) {
        picCount = $(".goods_pic").length - 1;
      }
      $(".goods_pic").eq(picCount).fadeIn().siblings().fadeOut();
    });
  }

  yt.init();
});
