require.config({
  baseUrl: "../",
  paths: {
    jquery: "plugins/jquery/jquery-1.10.2",
    config: "source/public/js/config", // 参数配置文件
    util: "source/public/js/util",
    widgets: "plugins/customPlugins/widgets",
    sweetAlert: 'plugins/sweetalert/sweetalert.min',
    // ztree: "plugins/jquery/ztree/jquery.ztree.all.min",
    bootstrap: "plugins/bootstrap/js/bootstrap.min",
    uploadFiles: 'source/materialsManagement/js/uploadFiles',
    'plupload': "plugins/plupload/plupload.full.min",
    'bootstrap.table': "plugins/bootstrap/bootstrap.table/bootstrap-table",
    'bootstrap.local': "plugins/bootstrap/js/bootstrap-table-zh-CN.min",
    slimscroll: "plugins/jquery/jquery.mCustomScrollbar",
    'jquery-mousewheel': "plugins/jquery/jquery.mousewheel.min",
    'bootstrap.validate': "plugins/bootstrap/js/bootstrap-validator.min",
    'bootstrap-datetimepicker': "plugins/bootstrap/js/bootstrap-datetimepicker.min",
    'bootstrap-datetimepicker-local': "plugins/bootstrap/js/bootstrap-datetimepicker.zh-CN"
  },
  shim: {
    "util": ["jquery"],
    // "ztree": ["jquery"],
    'bootstrap': ['jquery'],
    'bootstrap.validate': ['bootstrap'],
    'bootstrap.table': ['bootstrap'],
    'bootstrap.local': ['bootstrap', 'bootstrap.table'],
    'slimscroll': ['jquery-mousewheel'],
    'widgets': ['jquery', 'slimscroll'],
    'bootstrap-datetimepicker': ['bootstrap.table'],
    'bootstrap-datetimepicker-local': ['bootstrap-datetimepicker']
  }
});

requirejs(["jquery", "config", 'uploadFiles', "widgets", "util", "sweetAlert", 'bootstrap.table', 'bootstrap.local', 'bootstrap-datetimepicker', 'bootstrap-datetimepicker-local', 'bootstrap.validate'], function ($, conf, upload) {

  var yt = {};

  // 页面初始化
  yt.init = function () {
    // 绑定增、删、改按钮事件
    yt.bindBtnEvent();

    // 获取物资
    yt.tableInit();

    // 下拉框
    dropDownBox();
  }

  // 获取列表
  yt.tableInit = function () {
    util.requestData({
      url: conf.baseUrl + "prj/getTransportStandingBookList",
      success: function (res) {
        var materialList = [];

        for (var j = res.length - 1; j >= 0; j--) {
          materialList.push(res[j]);
        }
        $("#tableWrap").bootstrapTable('destroy');
        $("#tableWrap").bootstrapTable({
          data: materialList,
          height: $(window).height() - 10,
          pagination: true,
          sidePagination: "client",
          classes: 'table table-no-bordered table-bordered table-hover',
          pageSize: 10,
          search: true,
          searchAlign: 'left',
          maintainSelected: false,
          columns: [{
            field: 'rowCheck',
            checkbox: true
          },
          {
            title: '序号',
            align: 'center',
            formatter: function (value, row, index) {
              var option = $("#tableWrap").bootstrapTable("getOptions");
              return index + 1;
            }
          }, {
            title: '调运申请人',
            field: 'transported_man',
            align: 'center'
          }, {
            title: '调运仓库',
            field: 'transported_store',
            align: 'center'
          }, {
            title: '申请时间',
            field: 'apply_time',
            align: 'center'
          }, {
            title: '审批人',
            field: 'audit_man',
            align: 'center'
          }, {
            title: '审批时间',
            field: 'audit_time',
            align: 'center'
          }, {
            title: '调拨人',
            field: 'allot_man',
            align: 'center'
          }, {
            title: '调拨时间',
            field: 'allot_time',
            align: 'center'
          }, {
            title: '状态',
            field: 'transported_stauts',
            align: 'center',
            formatter: function (value, row, index) {
              if (value == "0") {
                return '待审批'
              } else if (value == "1") {
                return '待调拨'
              } else if (value == "2") {
                return '<span class="color">未通过</span>'
              } else if (value == "3") {
                return '完成'
              }
            }
          },
          {
            title: '附件名称',
            field: 'transport_standing_book_file',
            align: 'center',
            formatter: function (value, row, index) {
              if (value.length > 0) {
                return '<a>' + value[0].review_file_name + '</a>'
              }
            }
          },
          ],
          onClickCell: function (field, value, row, $element) {
            switch (field) {
              case "transport_standing_book_file": // 出入库详情
                window.open(conf.baseUrl + row.transport_standing_book_file[0].review_file_url);
                break;
            }
          },
          onCheck: function (row) { // 选中某一行
            yt.resetBtn();
          },
          onUncheck: function (row) { // 反选某一行
            yt.resetBtn();
          },
          onCheckAll: function (rows) {
            yt.resetBtn();
          },
          onUncheckAll: function (rows) {
            yt.resetBtn();
          },
          onPageChange: function () {
            yt.resetBtn();
          }

        });

        $(".search .form-control").attr("placeholder", "搜索物质名称、规格、姓名")
      }
    })

  }

  //　增、删、改按钮状态设置
  yt.resetBtn = function () {
    var selRows = $("#tableWrap").bootstrapTable("getSelections");
    // console.log(selRows)

    $(".delete_info_btn").addClass("disable");
    $(".edit_info_btn").addClass("disable");

    if (selRows.length > 0) {
      $(".delete_info_btn").removeClass("disable");
    }

    if (selRows.length == 1) {
      $(".edit_info_btn").removeClass("disable");
    }
  };

  // 绑定增、删、改按钮事件
  yt.bindBtnEvent = function () {

    // 增加按钮的事件绑定
    $(".add_info_btn").click(function () {
      yt.addMaterial();
    });

    // 删除按钮的事件绑定
    $(".delete_info_btn").click(function () {
      if ($(this).hasClass("disable")) return;
      yt.delMaterial();
    });

    // 编辑按钮的事件绑定
    $(".edit_info_btn").click(function () {
      if ($(this).hasClass("disable")) return;
      yt.editMaterial();
    });

  };

  // 增加台账
  yt.addMaterial = function () {
    $.formWin({
      title: "增加台账",
      fullScreen: false,
      width: 560,
      height: 0.8,
      btnVal: "增加",
      dataFlag: "suppliesInfoDig",
      contentTag: "#suppliesInfoDig",
      submitFn: function () {
        var validator = $("#suppliesInfoForm").data("bs.validator");
        validator.validate();
        if (validator.hasErrors()) return false;

        var JsonData = util.getFormData2Json("#suppliesInfoForm");
        if ($(".otherFileWarp").length > 0) {
          var transport_standing_book_file = []
          transport_standing_book_file.push({
            review_file_url: $(".otherFileWarp").attr("attachment"),
            review_file_name: $(".otherFileWarp span").text()
          });
          JsonData.transport_standing_book_file = transport_standing_book_file
        }

        JsonData.transported_stauts = $(".status input").attr("data-val")
        JsonData = JSON.stringify(JsonData);
        util.requestData({
          url: conf.baseUrl + "prj/addTransportStandingBook",
          type: "post",
          'contentType': "application/json",
          data: JsonData,
          success: function (res) {
            if (res.result) {
              util.showToast("增加台账成功", "success");
              yt.tableInit()
            } else {
              util.showToast("增加台账失败", "error");
            }
          },
          error: function () {
            console.log("error");
          }
        });

      },
      initEvent: function () {
        $('#suppliesInfoForm').validator({
          feedback: {
            success: 'glyphicon glyphicon-ok',
            error: 'glyphicon glyphicon-remove'
          },
        });

        $('.use_year').datetimepicker({
          forceParse: true,
          startView: 4,
          minView: 2,
          autoclose: true,
          format: 'yyyy-mm-dd',
          language: 'zh-CN',
        });

        upload.loadUploadFile('addDeviceImg', 'imgDeviceFilesName', 'other');
      }
    });
  }

  // 删除台账
  yt.delMaterial = function () {
    //　得到当前选择行

    var ids = $.map($("#tableWrap").bootstrapTable('getSelections'), function (row) {
      return row.review_id;
    });
    var nameList = $.map($("#tableWrap").bootstrapTable('getSelections'), function (row) {
      return row.material_name;
    });
    var idList = ids.toString();

    swal({
      title: "删除台账?",
      text: "你确认删除吗？",
      imageSize: "40x36",
      imageUrl: "../../plugins/sweetalert/img/tips.png",
      showCancelButton: true,
      confirmButtonColor: "#4285F4",
      confirmButtonText: "确认删除",
      closeOnConfirm: false
    },
      function () {
        util.requestData({
          url: conf.baseUrl + "prj/delTransportStandingBook",
          type: "post",
          data: {
            review_id: idList
          },
          success: function (res) {
            if (res.result) {
              swal({ title: "删除!", text: "你已经删除成功.", type: "success", confirmButtonColor: "#4285F4" })
              util.showToast("删除台账成功", "success");
              yt.tableInit();
              //							$("#tableWrap").bootstrapTable("refresh", { silent: true });
              $(".edit_info_btn").addClass("disable");
              $(".delete_info_btn").addClass("disable")
            } else {
              swal({ title: "删除!", text: "删除失败.", type: "error", confirmButtonColor: "#4285F4" })
              util.showToast("删除台账失败", "error");
            }
          },
          error: function () {
            console.log("error");
          }
        });
      });
  }

  // 编辑台账
  yt.editMaterial = function () {
    //　得到当前选择行
    var selRows = $("#tableWrap").bootstrapTable("getSelections");
    var curRow = selRows[0];

    $.formWin({
      title: "编辑台账",
      fullScreen: false,
      width: 560,
      height: 0.8,
      btnVal: "保存",
      dataFlag: "suppliesInfoDig",
      contentTag: "#suppliesInfoDig",
      submitFn: function () {
        var validator = $("#suppliesInfoForm").data("bs.validator");
        validator.validate();
        if (validator.hasErrors()) return false;

        var JsonData = util.getFormData2Json("#suppliesInfoForm");
        var transport_standing_book_file = []
        transport_standing_book_file.push({
          review_file_url: $(".otherFileWarp").attr("attachment"),
          review_file_name: $(".otherFileWarp span").text()
        })
        JsonData.transport_standing_book_file = transport_standing_book_file

        JsonData.review_id = selRows[0].review_id;
        JsonData.transported_stauts = $(".status input").attr("data-val")

        JsonData = JSON.stringify(JsonData);

        util.requestData({
          url: conf.baseUrl + "prj/updateTransportStandingBook",
          type: "post",
          data: JsonData,
          'contentType': "application/json",
          success: function (res) {
            if (res.result) {
              util.showToast("编辑物资成功", "success");
              yt.tableInit();
            } else {
              util.showToast("编辑物资失败", "error");
            }
          },
          error: function () {
            console.log("error");
          }
        });

      },
      initEvent: function () {
        $('#suppliesInfoForm').validator({
          feedback: {
            success: 'glyphicon glyphicon-ok',
            error: 'glyphicon glyphicon-remove'
          },
        });

        var thisForm = $("#suppliesInfoForm");
        thisForm.find("input").each(function () {
          $(this).val(curRow[$(this).attr("name")]);
        });

        $('.use_year').datetimepicker({
          forceParse: true,
          startView: 4,
          minView: 2,
          autoclose: true,
          format: 'yyyy-mm-dd',
          language: 'zh-CN',
        });

        if ($(".status input").val() === "3") {
          $(".status input").val("完成")
        } else if ($(".status input").val() === "2") {
          $(".status input").val("未通过")
        } else if ($(".status input").val() === "1") {
          $(".status input").val("待调拨")
        } else if ($(".status input").val() === "0") {
          $(".status input").val("待审批")
        }

        if (curRow.transport_standing_book_file.length == 0) {
          return;
        }
        var review_file_name = curRow.transport_standing_book_file[0].review_file_name;
        var review_file_url = curRow.transport_standing_book_file[0].review_file_url;
        var fileListDom = '<div class="otherFileWarp" attachment="' + review_file_url + '">' +
          '<span>' + review_file_name + '</span>' +
          '</div>'
        $("#imgDeviceFilesName").html(fileListDom);
        upload.loadUploadFile('addDeviceImg', 'imgDeviceFilesName', 'other');
      }
    });
  }

  function dropDownBox() {
    $("body").on("click", ".status input", function () {
      $(".status ul").toggleClass("hide")

    })
    $("body").on("click", ".status li", function () {
      $(".status input").val($(this).text());
      $(".status ul").addClass("hide");

      $(".status input").attr("data-val", $(this).attr("data-val"))
    });

    util.requestData({
      url: conf.baseUrl + "/prj/getMaterialStoreList",
      success: function (res) {
        // console.log(res)
        var liHtml = ""
        for (var i = 0; i < res.length; i++) {
          liHtml += '<li>' + res[i].store_name + '</li>'
        }
        $(".warehouse ol").html(liHtml)
      }
    })
    $("body").on("click", ".material_spec", function () {
      $(".warehouse ol").toggleClass("hide")
    })

    $("body").on("click", ".warehouse li", function () {
      $(".warehouse ol").addClass("hide");
      $(".material_spec").val($(this).text()).blur();
    })
  }

  // 页面初始化
  yt.init();

});
