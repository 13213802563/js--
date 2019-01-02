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
    'bootstrap.validate': "plugins/bootstrap/js/bootstrap-validator.min",
    template: "plugins/art-template/lib/template",
    //      'jquery.toast': "plugins/jquery/jquery.toast"
    bootstrapPaginator: "plugins/bootstrap/bootstrap-paginator/bootstrap-paginator.min",
  },
  shim: {
    "flatUi": ['jquery'],
    "addPerson": ['inputs'],
    "application": ['jquery', 'flatUi'],
    'bootstrap.validate': ['bootstrap'],
    "input": ['jquery'],
    'widgets': ['jquery'],
    'bootstrap': ['jquery'],
    'bootstrap.table': ['bootstrap'],
    'bootstrap.table.local': ['bootstrap.table'],
    'template': ['jquery'],
    //      'jquery.toast': ['jquery'],
    "util": ['dhx', 'jquery'],
    bootstrapPaginator: ["bootstrap"],
  }
});
requirejs(['jquery', 'dhx', "config", 'template', "util", 'widgets', 'flatUi', 'widgets', 'application', 'addPerson', 'bootstrap', 'bootstrap.validate', 'bootstrapPaginator', 'bootstrap.table', 'bootstrap.table.local'], function ($, dhx, conf, template) {
  var yt = {};
  var baseUrl = conf.baseUrl;
  var isUpdate = util.getQueryString("authFlag") == "update" ? true : false;
  var personUpdateId;
  var personUpdataType;
  var warehouseRes;
  //页面列表渲染数剧
  var count = 0; //获取前页的数量
  var num = 10; //页面当前数量
  var page = 1; //当前的页码
  var pageSize = 10; //每页的数量

  yt.init = function () {
    //人员类型
    yt.peopleType();
    //所属地区下拉选择
    yt.peopleClassSelect(".sel_position");

    // 表格控件初始化
    yt.tableInit();

    //添加人员
    yt.bindAddPersonEvent();

    //点击搜索
    yt.searchResults();

    //更新关联关系
    yt.upDateProject();

    //删除人员
    yt.delPeople();

    //下拉框
    yt.dropDownBox()
  };

  //人员信息列表表格
  yt.tableInit = function () {
    yt.gridTable = new dhtmlXGridObject('taskInfo_table');
    yt.gridTable.setHeader("序号,姓名,人员类型,所在单位,联系电话,关联仓库,操作");
    yt.gridTable.setInitWidthsP("7,12,13,13,13,27,16");
    yt.gridTable.setColAlign("center,center,center,center,center,center,center");
    yt.gridTable.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro");
    yt.gridTable.enableAutoHeight(true);
    yt.gridTable.enableTooltips("false, false, false, false, false, false, false");
    yt.gridTable.init();
    yt.gridTable.enableAlterCss("even", "uneven");
    yt.gridTable.setStyle(
      "font-size:12px;text-align:center;border:none;background:#ECF6FF;color:#686968;",
      "font-size:12px;border:none;color:#848484",
      "boder:none;",
      "background:''"
    );
  };

  /** 加载表格数据
   * checkerType:人员类型
   * addvcd:所在乡镇
   * content:查询内容
   */
  var idName = {}

  yt.loadTableData = function (person_type, place_unit, obj_name) {
    var data = null;
    if (obj_name == undefined) {
      data = {
        person_type: person_type,
        place_unit: place_unit,
      }
    } else {
      data = {
        person_type: person_type,
        place_unit: place_unit,
        obj_name: obj_name
      }
    }
    //　请求得到人员列表数据
    util.requestData({
      url: conf.baseUrl + "prj/getTransportPersonList",
      data: data,
      type: "get",
      success: function (jsonData) {
        // console.log(jsonData)
        yt.jsonData = jsonData
        yt.userTableInit = [];

        util.requestData({
          url: conf.baseUrl + "prj/getMaterialStoreList",
          success: function (res) {
            if (jsonData.length === 0) {
              var rows1 = { rows: [{ id: 0, data: ['', '', '', '', '暂无数据...', '', '',] }] }
              yt.gridTable.clearAll();
              yt.gridTable.parse(rows1, "json");
              return
            }

            for (var j = 0; j < res.length; j++) {
              var sId = res[j].store_id
              idName[sId] = res[j].store_name
            }
            var a = num + count;
            if (a > jsonData.length) {
              a = jsonData.length;
            }

            for (var i = count; i < a; i++) {
              var rowsData = {};
              var rowsContent = [];
              var warehouseId = jsonData[i].relevance_store
              if (warehouseId == undefined) {
                var sName = ""
              } else {
                var sName = warehouseId.split(",")
              }

              var storeNameC = ""

              if (sName) {
                sName.forEach(function (e) {
                  storeNameC += idName[e] + ","
                });
              }

              if (storeNameC == "") storeNameC = ""
              // console.log(storeNameC)
              if (jsonData[i].person_type === "0") {
                jsonData[i].person_type = "审核人员"
              } else if (jsonData[i].person_type === "1") {
                jsonData[i].person_type = "仓管人员"
              } else if (jsonData[i].person_type === "2") {
                jsonData[i].person_type = "调运人员"
              } else {
                jsonData[i].person_type = ""
              }

              var iconfontElement =
                '<i class="icon iconfont icon-link connect_project" data-id=' + jsonData[i].person_id + ' data-store=' + storeNameC + ' data-storeId=' + jsonData[i].relevance_store + '></i>' +
                '<i class="icon iconfont icon-zhangshangyunweiicon_fuzhi- option_bj" data-id=' + jsonData[i].person_id + ' data-type=' + jsonData[i].person_type + '></i>' +
                '<i class="icon iconfont icon-shanchu delete_project" data-id=' + jsonData[i].person_id + ' ></i>'
              rowsContent.push(i + 1);
              rowsContent.push(jsonData[i].person_name);
              rowsContent.push(jsonData[i].person_type);
              rowsContent.push(jsonData[i].place_unit);
              rowsContent.push(jsonData[i].person_phone);
              rowsContent.push(storeNameC.slice(0, storeNameC.length - 1));
              rowsContent.push(iconfontElement);

              rowsData.id = i + 1;
              rowsData.data = rowsContent;
              rows.push(rowsData);

              var data1 = { rows: rows };

              yt.rows = rows;
              yt.gridTable.clearAll();
            };

            yt.gridTable.parse(data1, "json");
            $(".delete_project").click(function () {
              var checkerId = $(this).attr("data-id");
              $('#myDelModal').modal('show');
              yt.checkerId2 = checkerId;
            });

            //点击更新关联
            $(".connect_project").click(function () {
              $('#myProjectModal').modal('show');
              var personId = $(this).siblings(".delete_project").attr("data-id");
              yt.personId = personId;
              var nameArr1 = $(this).attr("data-store");
              var nameArr = nameArr1.slice(0, nameArr1.length - 1).split(",");

              if ($(this).attr("data-storeId")) {
                var idArr = $(this).attr("data-storeId").split(",");
              } else {
                var idArr = ""
              }

              var dataArr = [];
              for (var i = 0; i < nameArr.length; i++) {
                var dataObj = {};
                dataObj.name = nameArr[i];
                dataObj.value = idArr[i];
                dataArr.push(dataObj);
              }

              $('#myProjectModal').on('shown.bs.modal', function (e) {
                $("#myProjectModal .modal-body").html('<div id="link_project1"></div>');
                yt.addLinkProject("#link_project1", dataArr);
                if (nameArr1 === "data-storeId=undefined") {
                  $(".ytRangeSelect_selected_wrap").remove();
                  $(".ytRangeSelect_input_tip").css("margin-left", 0)
                  $(".ytRangeSelect_input_field").css("margin-left", 0)
                }
              })
              $('#myProjectModal').on('hidden.bs.modal', function (e) {
                $("#link_project1").remove();
              })
            });

            //点击更新人员
            $(".option_bj").click(function () {
              var that = $(this)
              $.formWin({
                title: "编辑台账",
                fullScreen: false,
                width: 480,
                height: 0.5,
                btnVal: "保存",
                dataFlag: "suppliesInfoDig",
                contentTag: "#suppliesInfoDig",
                submitFn: function () {
                  var validator = $("#suppliesInfoForm").data("bs.validator");
                  validator.validate();
                  if (validator.hasErrors()) return false;

                  var JsonData = util.getFormData2Json("#suppliesInfoForm");
                  if (JsonData.person_type === "审核人员") {
                    JsonData.person_type = "0"
                  } else if (JsonData.person_type === "仓管人员") {
                    JsonData.person_type = "1"
                  } else if (JsonData.person_type === "调运人员") {
                    JsonData.person_type = "2"
                  }
                  JsonData.person_id = personUpdateId
                  JsonData = JSON.stringify(JsonData);

                  util.requestData({
                    url: baseUrl + "prj/updateTransportPerson",
                    'contentType': "application/json",
                    data: JsonData,
                    type: "post",
                    success: function (res) {
                      util.showToast("更新用户信息成功！", "success");
                      $(".search_btn").trigger('click');
                      $("#myUpDateModal .btn-default").trigger('click');
                    }
                  })

                },
                initEvent: function () {
                  $('#suppliesInfoForm').validator({
                    feedback: {
                      success: 'glyphicon glyphicon-ok',
                      error: 'glyphicon glyphicon-remove'
                    },
                  });
                  personUpdateId = that.attr("data-id");

                  var trDom = that.parents("tr").children()
                  $(".person_name").val(trDom.eq(1).text())
                  $(".person_type").val(trDom.eq(2).text())
                  $(".place_unit").val(trDom.eq(3).text())
                  $(".person_phone").val(trDom.eq(4).text())
                }
              });
            });

            if ($(window).height() < 640) {
              $(".table_warp td").css({
                "line-height": "30px"
              });
              $(".xhdr").css({
                "height": "30px"
              })
            }

            // 分页
            $("#paginator").bootstrapPaginator({
              bootstrapMajorVersion: 3, //指定bootstrap的版本
              currentPage: page,//指定当前页数
              totalPages: Math.ceil(jsonData.length / pageSize),//设置总页数
              size: 'big', //调整分页控件的尺寸
              onPageClicked: function (a, b, c, p) {//当点击分页的按钮的时候，会触发
                count = 10 * (p - 1);
                page = p;
                yt.loadTableData("", "");
              }
            });
          }
        });
        var rows = [];
      }
    });
  };

  // 更新人员信息下拉框
  yt.dropDownBox = function () {
    $("body").on("click", ".status input", function () {
      $(".status ol").toggleClass("hide")
    })
    $("body").on("click", ".status li", function () {
      $(".status input").val($(this).text()).blur();
      $(".status ol").addClass("hide");

      $(".status input").attr("data-val", $(this).attr("data-val"))
    });
  }

  //更新关联关系
  yt.upDateProject = function () {
    $("#myProjectModal .btn-del").click(function () {
      var relevanceStoreId = "";
      var len = $("#myProjectModal .ytRangeSelect_selected_item").size();
      if (len < 1) {
        $(".ytRangeSelect_input_wrap").css("height", 30);
      }
      $("#myProjectModal .ytRangeSelect_selected_item").each(function (i, v) {
        relevanceStoreId += $(v).attr("value") + ",";
      });
      relevanceStoreId = relevanceStoreId.slice(0, relevanceStoreId.length - 1);
      util.requestData({
        type: "post",
        url: baseUrl + "prj/updateRelevanceStore",
        data: { person_id: yt.personId, relevance_store: relevanceStoreId },
        success: function (res) {
          util.showToast("关联关系更新成功！", "success");
          $(".search_btn").trigger('click');
        }
      });
    })
  }

  //删除人员
  yt.delPeople = function () {
    $("#myDelModal .btn-del").click(function () {
      util.requestData({
        type: "post",
        url: baseUrl + "prj/delTransportPerson",
        data: { person_id: yt.checkerId2 },
        success: function (res) {
          util.showToast("删除人员成功！", "success");
          $(".search_btn").trigger('click');
        }
      })
    });
  };

  //点击搜索
  yt.searchResults = function () {
    $(".search_btn").on("click", function () {
      var person_type = $(".people_type .ytSelect_showbox").text();
      var place_unit = $(".sel_position .ytSelect_showbox").text();

      if (person_type === "全部") {
        person_type = ""
      }
      if (place_unit === "全部") {
        place_unit = ""
      }

      var obj_name = $(".search_input").val();
      yt.loadTableData(person_type, place_unit, obj_name);
    })
  };

  yt.loadAllUserInfoList = function (loadAllUserSccessFun) {
    if (loadAllUserSccessFun == undefined) loadAllUserSccessFun = function () { };
    $.ajax({
      url: conf.authUrl + "getUserList",
      type: "get",
      success: function (res) {
        if (res.result) {
          var Data = res.object;
          yt.Data = Data;
          // console.log(yt.Data)
          var ev = {};
          yt.userAllList = {};

          // console.log(Data)
          for (var i in Data) {
            yt.userAllList[Data[i].userId] = Data[i];
            // console.log(yt.userAllList[Data[i].userId]);
          }
        }
        loadAllUserSccessFun(Data);
        yt.loadTableData("", "");
      }
    })


  }


  yt.loadAllUserInfoList();
  yt.loadUserListTable = function (data) {
    var jsonData = yt.jsonData
    var jsonDataObj = {}

    yt.jsonData.forEach(function (e, i) {
      jsonDataObj[jsonData[i].person_id] = true;
    });

    var newData = [];
    for (var i = 0; i < data.length; i++) {
      var key = data[i].userId
      if (jsonDataObj[key] !== true) {
        newData.push(data[i])
      }
    }

    $("#userTable").bootstrapTable({
      data: newData,
      classes: 'table table-no-bordered table-bordered table-hover',
      height: $(window).height() * 0.8 - 100,
      pagination: true,
      sidePagination: "client",
      pageSize: 10,
      search: true,
      clickToSelect: false,
      searchAlign: 'left',
      columns: [{
        field: 'rowCheck',
        checkbox: true,
      },
      {
        title: '序号',
        field: 'userId',
        align: 'center',
        formatter: function (value, row, index) {
          var option = $("#tableWrap").bootstrapTable("getOptions");
          return index + 1;
        }
      }, {
        title: '用户名',
        field: 'userName',
        align: 'center'
      }, {
        title: '真实姓名',
        field: 'trueName',
        align: 'center'
      },
      {
        title: '性别',
        field: 'sex',
        align: 'center'
      },
      {
        title: '学历',
        field: 'degree',
        align: 'center'
      }, {
        title: '工作单位',
        field: 'organization',
        align: 'center'
      }, {
        title: '电话号码',
        field: 'phone',
        align: 'center'
      }
      ],
      onClickCell: function (field, value, row) {

      },
      // onCheck: function () {
      //   // yt.resetBtn();
      // },
      // onUncheck: function () {
      //   yt.resetBtn();
      // },
      onCheckAll: function (rows) {
        yt.resetBtn();
      },
      onUncheckAll: function (rows) {
        yt.resetBtn();
      },
      // onPageChange: function (number, size) {
      //   // yt.resetBtn();
      // }
    });
  }

  //添加人员
  yt.bindAddPersonEvent = function () {

    $(".add_person").click(function () {
      $.formWin({
        title: "导入用户",
        fullScreen: false,
        width: 0.8,
        height: 0.8,
        dataFlag: "1",
        contentTag: "#addUserForm",
        initEvent: function () {
          yt.loadUserListTable(yt.Data);

        },
        submitFn: function () {

          var selectInfoArray = [];
          var ids = $.map($("#userTable").bootstrapTable('getSelections'), function (row) {
            var rowInfo = row.userId + "$" + row.trueName + "$" + row.phone + "$" + row.organization;
            return rowInfo;
          });
          ids = ids.toString();

          util.requestData({
            url: conf.baseUrl + 'prj/addTransportPerson',
            data: { userstr: ids },
            type: "POST",
            success: function (res) {
              if (res.result) {
                yt.loadTableData("", "")
              }
            },
            error: function () {

            }
          });

        },
        cancelFn: function () { },
        errorCheck: function () { }

      });


    })
  };

  //关联仓库添加
  yt.addLinkProject = function (dom, args) {
    args = !args ? [{ name: "", value: "" }] : args;
    $(dom).ytRangeSelect({
      url: { url: conf.baseUrl + "prj/getMaterialStoreList" },
      existField: args,
      textField: "store_name",
      valueField: "store_id",
      dataFormat: yt.dataFormat,
      labelSize: { width: 60, height: 30, name: "关联仓库：" },
      selectBarSize: { width: 390, height: 30 },
      placeholderText: "请输入要添加仓库",
    });
  };

  yt.dataFormat = function (resonpse, dataField, existField) {
    var res = resonpse;
    var textField = dataField.textField;
    var valueField = dataField.valueField;
    var data = dataField.data;
    for (var i = 0; i < res.length; i++) {
      var flag = true;
      for (var j = 0; j < existField.length; j++) {
        if (res[i][valueField] == existField[j].value) {
          flag = false;
        }
      }
      if (flag) {
        data.option.push(res[i][textField]);
        data.value.push(res[i][valueField]);
      }
    }
  }


  //判断输入是否为空
  yt.isEmpty = function (str) {
    str = str.replace(/^\s*|\s*$/g, "");
    if (str == "" || str == null) {
      return false;
    }
    return true;
  }


  // 所属地区下拉选择
  yt.peopleClassSelect = function (dom, flag) {
    util.requestData({
      url: conf.baseUrl + "prj/getTransportPersonList",
      type: "get",
      success: function (res) {
        var dataArr = [];
        var value = [
          { v: "-1", t: "全部" }
        ];

        for (var i = 0; i < res.length; i++) {
          if (dataArr.indexOf(res[i].place_unit) == -1 && res[i].place_unit != undefined) {
            dataArr.push(res[i].place_unit);
          }
        }

        for (var i = 0; i < dataArr.length; i++) {
          value.push({ v: i.toString(), t: dataArr[i] })
        }

        $(dom).ytSelect({
          data: {
            label: "所在单位", value: value
          },
          url: "",
          textField: "t",
          valueField: "v",
          successFun: function () {
          }
        }).change(function () {
          $(".search_btn").trigger('click');
        });
      }
    });
  };


  //人员类型下拉选择
  yt.peopleType = function () {
    value =
      $(".ytSelect .people_type").ytSelect({
        data: {
          label: "人员类型", value: [
            { v: "-1", t: "全部" },
            { v: "0", t: "调运人员" },
            { v: "1", t: "审核人员" },
            { v: "2", t: "仓管人员" },
          ]
        },
        url: "",
        textField: "t",
        valueField: "v",
        successFun: function () {
        }
      }).change(function () {
        $(".search_btn").trigger('click');
      });
  };

  yt.init();

});
