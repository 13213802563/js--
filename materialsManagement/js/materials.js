require.config({
  baseUrl: "../",
  paths: {
    jquery: "plugins/jquery/jquery-1.10.2",
    config: "source/public/js/config", // 参数配置文件
    util: "source/public/js/util",
    ztree: "plugins/jquery/ztree/jquery.ztree.all.min",
    widgets: "plugins/customPlugins/widgets",
    sweetAlert: 'plugins/sweetalert/sweetalert.min',
    bootstrap: "plugins/bootstrap/js/bootstrap.min",
    uploadFiles: 'source/materialsManagement/js/uploadFiles',
    'plupload': "plugins/plupload/plupload.full.min",
    'bootstrap.table': "plugins/bootstrap/bootstrap.table/bootstrap-table",
    'bootstrap.local': "plugins/bootstrap/js/bootstrap-table-zh-CN.min",
    slimscroll: "plugins/jquery/jquery.mCustomScrollbar",
    'jquery-mousewheel': "plugins/jquery/jquery.mousewheel.min",
    'bootstrap.validate': "plugins/bootstrap/js/bootstrap-validator.min",
    'bootstrap-datetimepicker': "plugins/bootstrap/js/bootstrap-datetimepicker.min",
    'bootstrap-datetimepicker-local': "plugins/bootstrap/js/bootstrap-datetimepicker.zh-CN",
    uploadFiles: 'source/materialsManagement/js/uploadFiles',
    xlsx: 'plugins/xlsx/xlsx.full.min.js'
  },
  shim: {
    "util": ["jquery"],
    "ztree": ["jquery"],
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

requirejs(["jquery", "config", 'uploadFiles', 'xlsx', "widgets", "util", "sweetAlert", "ztree", 'bootstrap.table', 'bootstrap.local', 'bootstrap.validate', 'bootstrap-datetimepicker', 'bootstrap-datetimepicker-local'], function ($, conf, upload) {

  var yt = {};
  var personType = $.cookie("trueName")
  var cookId = $.cookie("userId")

  if (personType.indexOf("仓管人员") !== -1 || personType.indexOf("管理员") !== -1) {
    $(".button_warp").removeClass("hide")
    $(".leadingIn").removeClass("hide")
  } else {
    $(".button_warp").addClass("hide")
    $(".leadingIn").addClass("hide")
  }

  // 页面初始化
  yt.init = function () {
    this.treeInit();

    // 初始化表格
    yt.loadPrjectManage();

    // 绑定增、删、改按钮事件
    yt.bindBtnEvent();

  }

  // 组织结构初始化
  yt.treeInit = function () {
    //　树结构配置参数
    var setting = {
      view: {
        addHoverDom: yt.treeEvent.addHoverDom,
        removeHoverDom: yt.treeEvent.removeHoverDom,
        selectedMulti: false
      },
      data: {
        simpleData: {
          enable: true,
        }
      },
      callback: {
        beforeDrag: yt.treeEvent.beforeDrag,
        //　绑定结点单击事件
        onClick: yt.treeEvent.onClick,
      }
    };

    if (personType.indexOf("管理员") !== -1) {
      util.requestData({
        url: conf.baseUrl + "prj/getMaterialStoreList",
        success: function (res) {
          // 　生成树结点数组
          var zNodes = [{ name: "义乌防汛物资总仓", pId: 0, id: "root", open: true, }];
          for (var i = 0; i < res.length; i++) {
            var node = {
              pId: res[i].up_store_id,
              id: res[i].store_id,
              name: res[i].store_name,
            }
            zNodes.push(node);
          }

          // 初始化树
          var zTree = $.fn.zTree.init($("#treeView"), setting, zNodes);

          var treeObj = $.fn.zTree.getZTreeObj("treeView");
          var node1 = treeObj.getNodeByTId("tree_1");
          var node2 = treeObj.getNodesByParamFuzzy("id", "STO0048", null);
          var node3 = treeObj.getNodesByParamFuzzy("id", "STO0049", null);
          var node4 = treeObj.getNodesByParamFuzzy("id", "STO0050", null);
          var node5 = treeObj.getNodesByParamFuzzy("id", "STO0071", null);

          // 选中第一个结点
          var zNode = treeObj.getNodeByTId("tree_3");
          yt.treeEvent.selectNode(zNode);

          $(".add_info_btn").attr("data-id", zNode.id)
          $(".edit_info_btn ").attr("data-id", zNode.id)
          $(".delete_info_btn").attr("data-id", zNode.id)
          $(".leadingIn").attr("data-id", zNode.id)
          $(".derive").attr("data-id", zNode.id)
          $(".leadingIn").attr("data-name", zNode.name)
          $(".derive").attr("data-name", zNode.name)

          var storeLocationId = { store_location: zNode.id }
          yt.tableInit(storeLocationId);

          treeAppend($("#treeView_1"), "mask_box", "mask_add", node1);
          treeAppend($("#treeView_1_ul>li:nth-child(1)"), "maskBox1", "maskAdd1", node2[0]);
          treeAppend($("#treeView_1_ul>li:nth-child(2)"), "maskBox2", "maskAdd2", node3[0]);
          treeAppend($("#treeView_1_ul>li:nth-child(3)"), "maskBox3", "maskAdd3", node4[0]);
          treeAppend($("#treeView_1_ul>li:nth-child(4)"), "maskBox4", "maskAdd4", node5[0]);
        },
        error: function () {
          //　提示得到管理单位列表失败
          util.showToast("得到管理单位列表失败!", "error");
        }
      });
      return;
    }

    util.requestData({
      url: conf.baseUrl + "prj/getTransportPersonList",
      data: { person_id: cookId },
      success: function (info) {
        console.log(info)
        if (info.length === 0) {
          console.log("没有关联仓库")
          util.showToast("暂无数据", "error");

          return;
        }

        var relevance_store = info[0].relevance_store

        util.requestData({
          url: conf.baseUrl + "prj/getMaterialStoreList",
          data: { store_id: relevance_store },
          success: function (res) {
            console.log(res)
            if (res.length !== 0) {
              var storeLocationId = { store_location: res[0].store_id }

              $(".add_info_btn").attr("data-id", res[0].store_id)
              $(".edit_info_btn ").attr("data-id", res[0].store_id)
              $(".delete_info_btn").attr("data-id", res[0].store_id)

              yt.tableInit(storeLocationId);
            }

            for (var i = 0; i < res.length; i++) {
              if (res[i].up_store_id !== "root") {
                res[i].up_store_id = "root"
              }
            }
            // 　生成树结点数组
            var zNodes = [{ name: "我的防汛物资仓库", pId: 0, id: "root", open: true, }];
            for (var i = 0; i < res.length; i++) {
              var node = {
                pId: res[i].up_store_id,
                id: res[i].store_id,
                name: res[i].store_name,
              }
              zNodes.push(node);
            }

            // 初始化树
            var zTree = $.fn.zTree.init($("#treeView"), setting, zNodes);
            // 选中第一个结点
            yt.treeEvent.selectFirstNode();

            $("#treeView_1").append('<div class="mask_box"><div>');

          },
          error: function () {
            //　提示得到管理单位列表失败
            util.showToast("得到管理单位列表失败!", "error");
          }
        });
      }
    })
  };

  // 树相关的各种事件绑定
  yt.treeEvent = {
    selectNode: function (treeNode) {// 选中某一结点
      //　得到当前树对象
      var zTree = $.fn.zTree.getZTreeObj("treeView");

      zTree.selectNode(treeNode);
      // yt.loadContent(treeNode.id);
    },
    selectFirstNode: function () {// 选中 树中第一个结点
      //　得到当前树对象
      var zTree = $.fn.zTree.getZTreeObj("treeView");
      // console.log(zTree);
      var node = zTree.getNodes()[0].children;
      if (node.length > 0) {
        yt.treeEvent.selectNode(node[0]);
      }
    },
    beforeDrag: function (treeId, treeNodes) { // 拖动事件
      return false;
    },
    addHoverDom: function (treeId, treeNode) {// 显示增加结点钮
      //　得到各结点对象的容器
      var sObj = $("#" + treeNode.tId + "_span");
      //　如果已经存在结点操作按钮，不再添加结点操作按钮
      if ($("#addBtn_" + treeNode.tId).length > 0) return;
      if ($("#delBtn_" + treeNode.tId).length > 0) return;
      if ($("#updataBtn_" + treeNode.tId).length > 0) return;

      // 添加增加单位按钮
      var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
        + "' title='增加单位' onfocus='this.blur();'></span>";
      // 添加删除单位按钮
      var delStr = "<span class='button remove' id='delBtn_" + treeNode.tId
        + "' title='删除单位' onfocus='this.blur();'></span>";
      // 添加更新单位按钮
      var updata = "<span class='button updata' id='updataBtn_" + treeNode.tId
        + "' title='编辑单位' onfocus='this.blur();'></span>";
      // 如果是根结点，不添加删除按钮
      if (treeNode.id == "root" || treeNode.id == "STO0048" || treeNode.id == "STO0049" || treeNode.id == "STO0050" || treeNode.id == "STO0071") {
        delStr = "";
        updata = "";
        addStr = "";
      }
      // 添加按钮到各结点的后面
      sObj.after(addStr + updata + delStr);

      //　得到增加结点按钮并事件绑定
      var btn = $("#addBtn_" + treeNode.tId);

      $(".button.add").addClass("hide")
      $(".button.updata").addClass("hide")
      $(".button.remove").addClass("hide")

      if (personType.indexOf("管理员") !== -1) {
        $(".button.add").removeClass("hide")
        $(".button.updata").removeClass("hide")
        $(".button.remove").removeClass("hide")
      } else {
        $(".button.add").addClass("hide")
        $(".button.updata").addClass("hide")
        $(".button.remove").addClass("hide")
      }

      if (btn) btn.on("click", function () {
        // 调用管理单位增加函数
        var pId = treeNode.id
        yt.treeEvent.addDepartment(treeNode, pId);
      });

      //　得到删除结点按钮并事件绑定
      btn = $("#delBtn_" + treeNode.tId);
      if (btn) btn.on("click", function () {
        // 调用管理单位删除函数
        yt.treeEvent.delDepartment(treeId, treeNode);
      });

      //　得到编辑结点按钮并事件绑定
      btn = $("#updataBtn_" + treeNode.tId);
      if (btn) btn.on("click", function () {
        yt.treeEvent.updataDepartment(treeId, treeNode);
      });
    },
    removeHoverDom: function (treeId, treeNode) {// 隐藏增加结点钮
      // console.log(1)
      $("#addBtn_" + treeNode.tId).unbind().remove();
      $("#delBtn_" + treeNode.tId).unbind().remove();
      $("#updataBtn_" + treeNode.tId).unbind().remove();
    },
    addDepartment: function (treeNode, pId) {
      // 弹出增加结点对话框
      swal(
        {
          title: "增加物资仓库名称",
          //						text: "请输入单位名称",
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          animation: "slide-from-top",
          inputPlaceholder: "请输入单位名称"
        },
        function (inputValue) {
          if (inputValue === "") {
            swal.showInputError("单位名称不能为空!");
            return false;
          }
          if (inputValue === false) return false;
          else {
            if (treeNode) {
              var data = {
                store_name: inputValue,
                // superior_management: treeNode.id,
                up_store_id: treeNode.id
              }
            } else {
              var data = {
                store_name: inputValue,
                // superior_management: "root",
                up_store_id: "root"
              }
            }

            data = JSON.stringify(data);
            var zTree = $.fn.zTree.getZTreeObj("treeView");//　得到当前树对象
            util.requestData({
              url: conf.baseUrl + "prj/addMaterialStore",
              type: "post",
              contentType: "application/json",
              data: data,
              success: function (res) {
                if (res.result) { // 单位增加成功时
                  // 得到新加入的结点ID
                  var nodeId = res.object;
                  //　在客户端加入新结点
                  var obj = {
                    id: nodeId,
                    pId: pId,
                    name: inputValue
                  }
                  var newNodes = zTree.addNodes(treeNode, obj);

                  //　提示新结点加入成功
                  swal("提示", "单位“" + inputValue + "”增加成功!", "success");
                  //　得到新加入的结点对象
                  var newNode = newNodes[0];
                  // 选中新加入的结点对象
                  yt.treeEvent.selectNode(newNode);

                  $(".fixed-table-pagination").hide();
                  var tbodyTr = '<tr style="border-bottom: 1px solid #C9DCFF">' + '<td colspan="14" style="text-align:center; padding:8px 0">' + '没有数据' + '</td></tr>'

                  $("#tableWrap tbody").replaceWith(tbodyTr);

                } else {// 单位增加失败时
                  swal("提示", "单位“" + inputValue + "”增加失败!", "error");
                }

              },
              error: function () {
                swal("提示", "单位“" + inputValue + "”增加失败!", "error");
              }
            });
          }
        }
      );
      return false;
    },
    getChildren: function (ids, node) {// 递归得到所有子结点
      ids.push(node.id);
      if (node.isParent) {
        for (var obj in node.children) {
          this.getChildren(ids, node.children[obj]);
        }
      }
      return ids;
    },
    delDepartment: function (treeId, treeNode) {// 删除管理单位操作

      var ids = [];

      //　得到自身和所有子结点
      var nodes = yt.treeEvent.getChildren(ids, treeNode);

      //　显示删除确认框
      swal({
        title: "删除?",
        text: "你确认删除吗？",
        imageSize: "40x36",
        imageUrl: "../plugins/sweetalert/img/tips.png",
        showCancelButton: true,
        confirmButtonColor: "#4285F4",
        confirmButtonText: "确认删除",
        closeOnConfirm: true
      },
        function (isConfirm) {//　确认框回调函数
          if (isConfirm) {//确认执行删除操作
            util.requestData({//　提交删除操作到服务端
              url: conf.baseUrl + "prj/delMaterialStore",
              type: "post",
              //　生成所有删除结点的字符串，解决删除父结点时，子结点的删除问题
              data: { store_id: nodes.join(",") },
              success: function (res) {
                if (res.result) {// 服务端删除操作成功时
                  //　得到当前树对象
                  var zTree = $.fn.zTree.getZTreeObj("treeView");
                  // 删除客户端的删除结点
                  zTree.removeNode(treeNode);
                  // 选中树中的第一个结点
                  yt.treeEvent.selectFirstNode();
                  //　显示删除成功提示框
                  util.showToast("单位“" + treeNode.name + "”删除成功!", "success");
                } else {// 服务端删除操作失败时
                  //　显示删除失败提示框
                  util.showToast("单位“" + treeNode.name + "”删除失败!", "error");
                }
              },
              error: function () {// 服务端删除操作失败时
                //　显示删除失败提示框
                util.showToast("单位“" + treeNode.name + "”删除失败!", "error");
              }
            });
          } else {// 确认框中选择不执行删除操作
            //不执行删除操作
            return false;
          }
        });
    },
    updataDepartment: function (treeId, treeNode) {
      swal(
        {
          title: "修改物资仓库名称",
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          animation: "slide-from-top",
          inputPlaceholder: treeNode.name
        },
        function () {
          var data = {
            up_store_id: treeNode.pId,
            store_id: treeNode.id,
            store_name: $("fieldset input").val(),
          }
          if ($("fieldset input").val() === "") { // 输入内容为空，提示并阻止提交
            swal.showInputError("单位名称不能为空!");
            return false;
          }
          var upText = $("fieldset input").val();
          util.requestData({
            url: conf.baseUrl + "prj/updateMaterialStore",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (res) {
              if (res.result) { // 单位增加成功时
                swal("提示", "修改成功!", "success");
                $("#" + treeNode.tId + "_span").text(upText);
              } else {// 单位增加失败时
                swal("提示", "修改失败!", "error");
              }
            }
          })
        }
      );
      $("fieldset input").val(treeNode.name)
    },
    onClick: function (event, treeId, treeNode) {// 点击树结点时
      $(".add_info_btn").attr("data-id", treeNode.id);
      $(".edit_info_btn").attr("data-id", treeNode.id);
      $(".delete_info_btn").attr("data-id", treeNode.id);

      $(".leadingIn").attr("data-id", treeNode.id)
      $(".derive").attr("data-id", treeNode.id)
      $(".leadingIn").attr("data-name", treeNode.name)
      $(".derive").attr("data-name", treeNode.name)

      if (treeNode.id == "root") {
        storeLocationId = ""
      } else {
        storeLocationId = { store_location: treeNode.id }
      }
      yt.tableInit(storeLocationId);
    },
  }

  yt.loadPrjectManage = function () {
    util.requestData({
      url: conf.baseUrl + "prj/getPrjList",
      success: function (res) {
        yt.projectManage = {};
        for (var i = 0; i < res.length; i++) {
          // if (prjId == res[i].prj_code) yt.management_id = res[i].management_id;
          if (yt.projectManage.hasOwnProperty(res[i].management_id)) {
            yt.projectManage[res[i].management_id].push(res[i].prj_code);
          } else {
            yt.projectManage[res[i].management_id] = [res[i].prj_code];
          }
        }
        yt.prjManageList = yt.projectManage[yt.management_id];
        // yt.tableInit();
      }
    })
  }

  // 入库登记
  yt.inSuppliesWin = function (row, $element) {
    var mId = row.material_id;
    var name = row.material_name;
    var tdNum = $element.parents("tr").children().eq(4);

    $.formWin({
      // $.window({
      title: name + "-入库登记",
      fullScreen: false,
      width: 560,
      height: 350,
      btnVal: "入库确认",
      contentTag: "#inSuppliesDig",
      // modal: false,
      submitFn: function () {
        var validator = $("#inSuppliesForm").data("bs.validator");
        validator.validate();
        var addNum = $("#inSuppliesForm .amount").val()

        if (validator.hasErrors()) return false;
        var Data = util.getFormData2Json("#inSuppliesForm");
        Data.change_type = "入库";
        Data.material_id = mId;
        Data.amount = $("#inSuppliesForm .amount").val();

        storeLocationId = { store_location: $(".add_info_btn").attr("data-id") }
        util.requestData({
          url: conf.baseUrl + "prj/addMaterialChange",
          type: "post",
          data: Data,
          success: function (res) {
            if (res.result) {
              tdNum.text((+tdNum.text()) + (+addNum))
              util.showToast("入库成功", "success");
            } else {
              util.showToast("入库失败", "error");
            }
          },
          error: function () {
            console.log("error");
          }
        });
      },
      initEvent: function () {
        var thisForm = $("#inSuppliesForm");
        thisForm.find("input[name='material_name']").val(name);
        thisForm.find("input[name='change_date']").val(new Date().Format("yyyy-MM-dd"));
        // 加日历的初始化
        thisForm.find("input[name='change_date']").datetimepicker({
          forceParse: true,
          startView: 4,
          minView: 2,
          autoclose: true,
          format: 'yyyy-mm-dd',
          language: 'zh-CN',
        });

        thisForm.validator({
          feedback: {
            success: 'glyphicon glyphicon-ok',
            error: 'glyphicon glyphicon-remove'
          },

        });

      }
    });

  };

  // 出库登记
  yt.outSuppliesWin = function (row, $element) {
    var mId = row.material_id;
    var name = row.material_name;
    var stock_amount = row.stock_amount;
    var tdNum = $element.parents("tr").children().eq(4);

    $.formWin({
      title: name + "-出库登记",
      fullScreen: false,
      width: 560,
      height: 350,
      btnVal: "出库确认",
      dataFlag: "outSuppliesWin",
      contentTag: "#outSuppliesDig",
      submitFn: function () {
        var validator = $("#outSuppliesForm").data("bs.validator");
        validator.validate();
        var delNum = $("#outSuppliesForm .amount").val()

        if (validator.hasErrors()) return false;

        var Data = util.getFormData2Json("#outSuppliesForm");
        Data.change_type = "出库";
        Data.material_id = mId;
        Data.amount = $("#outSuppliesForm .amount").val();

        storeLocationId = { store_location: $(".add_info_btn").attr("data-id") }
        util.requestData({
          url: conf.baseUrl + "prj/addMaterialChange",
          type: "post",
          data: Data,
          success: function (res) {
            if (res.result) {
              tdNum.text((+tdNum.text()) - (+delNum))
              util.showToast("出库登记成功", "success");
              // yt.tableInit(storeLocationId);
            } else {
              util.showToast("出库登记失败", "error");
            }
          },
          error: function () {
            console.log("error");
          }
        });

      },
      initEvent: function () {
        var thisForm = $("#outSuppliesForm");
        thisForm.find("input[name='material_name']").val(name);
        thisForm.find("input[name='change_date']").val(new Date().Format("yyyy-MM-dd"));

        // 加日历的初始化
        thisForm.find("input[name='change_date']").datetimepicker({
          forceParse: true,
          startView: 4,
          minView: 2,
          autoclose: true,
          format: 'yyyy-mm-dd',
          language: 'zh-CN',
        });


        $("#outSuppliesForm .amount").attr("max", (+tdNum.text()));
        thisForm.validator({
          feedback: {
            success: 'glyphicon glyphicon-ok',
            error: 'glyphicon glyphicon-remove'
          },
        });

      }
    });
  };

  // 获取物资
  yt.tableInit = function (storeLocationId) {
    util.requestData({
      url: conf.baseUrl + "prj/getMaterialList",
      data: storeLocationId,
      success: function (res) {
        console.log(res)

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
            title: '物质名称',
            field: 'material_name',
            align: 'center'
          }, {
            title: '规格',
            field: 'material_spec',
            align: 'center'
          }, {
            title: '库存',
            field: 'stock_amount',
            align: 'center'
          }, {
            title: '保管人姓名',
            field: 'custodian_name',
            align: 'center'
          }, {
            title: '保管人手机',
            field: 'custodian_phone',
            align: 'center'
          }, {
            title: '生产日期',
            field: 'use_year',
            align: 'center'
          }, {
            title: '当前状态',
            field: '',
            align: 'center'
          }, {
            title: '价格',
            field: 'price',
            align: 'center'
          },
          {
            title: '出入库',
            field: 'inOutSupplies',
            align: 'center',
            formatter: function (value, row, index) {
              return "<a>详情</a>"
            }
          },
          {
            title: '图片',
            field: 'prj_materialpic',
            align: 'center',
            formatter: function (value, row, index) {
              if (value != undefined && value != "") {
                var id = row.material_id;
                var has = value != undefined && value.length > 0;
                return "<a style=\"cursor:pointer\" ><img src=\"../source/public/img/pic_001.png\"/></a>";
              }
              return '-';
            }
          }
          ],
          onClickCell: function (field, value, row, $element) {
            switch (field) {
              case "prj_materialpic": // 物资图片显示
                yt.picShow(row);
                break;
              case "inOutSupplies": // 出入库详情
                yt.inOutSuppliesWin(row);
                break;
              case "inSupplies": // 入库登记
                yt.inSuppliesWin(row, $element);
                break;
              case "outSupplies": // 出库登记
                yt.outSuppliesWin(row, $element);
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

  if (personType.indexOf("管理员") !== -1 || personType.indexOf("仓管人员") !== -1) {
    // var storeLocationId = { store_location: "STO0001" }
    yt.tableInit = function (storeLocationId) {
      util.requestData({
        url: conf.baseUrl + "prj/getMaterialList",
        data: storeLocationId,
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
              title: '物质名称',
              field: 'material_name',
              align: 'center'
            }, {
              title: '规格',
              field: 'material_spec',
              align: 'center'
            }, {
              title: '库存',
              field: 'stock_amount',
              align: 'center'
            }, {
              title: '保管人姓名',
              field: 'custodian_name',
              align: 'center'
            }, {
              title: '保管人手机',
              field: 'custodian_phone',
              align: 'center'
            }, {
              title: '生产日期',
              field: 'use_year',
              align: 'center'
            }, {
              title: '当前状态',
              field: '',
              align: 'center'
            }, {
              title: '价格',
              field: 'price',
              align: 'center'
            },
            {
              title: '出入库',
              field: 'inOutSupplies',
              align: 'center',
              formatter: function (value, row, index) {
                return "<a>详情</a>"
              }
            },
            {
              title: '入库',
              field: 'inSupplies',
              align: 'center',
              formatter: function (value, row, index) {
                return "<a>入库</a>"
              }
            }, {
              title: '出库',
              field: 'outSupplies',
              align: 'center',
              formatter: function (value, row, index) {
                return "<a >出库</a>"
              }
            },
            {
              title: '图片',
              field: 'prj_materialpic',
              align: 'center',
              formatter: function (value, row, index) {
                if (value != undefined && value != "") {
                  var id = row.material_id;
                  var has = value != undefined && value.length > 0;
                  return "<a style=\"cursor:pointer\" ><img src=\"../source/public/img/pic_001.png\"/></a>";
                }
                return '-';
              }
            }
            ],
            onClickCell: function (field, value, row, $element) {
              switch (field) {
                case "prj_materialpic": // 物资图片显示
                  yt.picShow(row);
                  break;
                case "inOutSupplies": // 出入库详情
                  yt.inOutSuppliesWin(row);
                  break;
                case "inSupplies": // 入库登记
                  yt.inSuppliesWin(row, $element);
                  break;
                case "outSupplies": // 出库登记
                  yt.outSuppliesWin(row, $element);
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

    // 导入按钮的事件绑定
    yt.leadingInMaterial();

    // 导出按钮的事件绑定
    $(".derive").click(function () {
      yt.deriveMaterial();
    });

  };

  // 增加物资
  yt.addMaterial = function () {
    $.formWin({
      title: "增加物资",
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

        JsonData.prj_materialpic = upload.getUploadImgList('material_picurl');
        JsonData.store_location = $(".add_info_btn").attr("data-id");


        var material_name = JsonData.material_name
        var material_spec = JsonData.material_spec
        var custodian_name = JsonData.custodian_name
        var custodian_phone = JsonData.custodian_phone
        var use_year = JsonData.use_year
        var price = JsonData.price
        var prj_materialpic = JsonData.prj_materialpic
        var materialpic = prj_materialpic.length > 0 ? "<a style=\"cursor:pointer\" ><img src=\"../source/public/img/pic_001.png\"/></a>" : ""

        JsonData = JSON.stringify(JsonData);

        storeLocationId = { store_location: $(".add_info_btn").attr("data-id") }
        util.requestData({
          url: conf.baseUrl + "prj/addMaterial",
          type: "post",
          'contentType': "application/json",
          data: JsonData,
          success: function (res) {
            if (res.result) {
              util.showToast("增加物资成功", "success");

              $("#tableWrap").bootstrapTable(
                'insertRow',
                {
                  index: 0,
                  row: {
                    'material_name': material_name,
                    'material_spec': material_spec,
                    'stock_amount': "0",
                    'custodian_name': custodian_name,
                    'custodian_phone': custodian_phone,
                    'use_year': use_year,
                    '': "-",
                    'price': price,
                    'material_id': res.object,
                    'prj_materialpic': materialpic,
                    'prj_materialpic': prj_materialpic
                  }
                }
              );
            } else {
              util.showToast("增加物资失败", "error");
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

        // 加日历的初始化
        $('.use_year').datetimepicker({
          forceParse: true,
          startView: 4,
          minView: 2,
          autoclose: true,
          format: 'yyyy-mm-dd',
          language: 'zh-CN',
        });

        upload.loadUploadFile('addDeviceImg', 'imgDeviceFilesName', 'img');
      }
    });
  }

  // 删除物资
  yt.delMaterial = function () {
    //　得到当前选择行

    var ids = $.map($("#tableWrap").bootstrapTable('getSelections'), function (row) {
      return row.material_id;
    });
    var nameList = $.map($("#tableWrap").bootstrapTable('getSelections'), function (row) {
      return row.material_name;
    });
    var idList = ids.toString();

    swal({
      title: "删除物资?",
      text: "你确认删除吗？",
      imageSize: "40x36",
      imageUrl: "../../plugins/sweetalert/img/tips.png",
      showCancelButton: true,
      confirmButtonColor: "#4285F4",
      confirmButtonText: "确认删除",
      closeOnConfirm: false
    },
      function () {
        storeLocationId = { store_location: $(".add_info_btn").attr("data-id") }

        util.requestData({
          url: conf.baseUrl + "prj/delMaterial",
          type: "post",
          data: {
            material_id: idList
          },
          success: function (res) {
            if (res.result) {
              swal({ title: "删除!", text: "你已经删除成功.", type: "success", confirmButtonColor: "#4285F4" })

              util.showToast("删除物资成功", "success");
              yt.tableInit(storeLocationId);
              //							$("#tableWrap").bootstrapTable("refresh", { silent: true });
              $(".edit_info_btn").addClass("disable");
              $(".delete_info_btn").addClass("disable")
            } else {
              swal({ title: "删除!", text: "删除失败.", type: "error", confirmButtonColor: "#4285F4" })
              util.showToast("删除物资失败", "error");
            }
          },
          error: function () {
            console.log("error");
          }
        });
      });
  }

  var flag = false;

  // 编辑物资
  yt.editMaterial = function () {
    //　得到当前选择行
    var selRows = $("#tableWrap").bootstrapTable("getSelections");
    var curRow = selRows[0];
    var material = $("table input:checked").parents("tr").children();
    storeLocationId = { store_location: $(".edit_info_btn").attr("data-id") }

    $.formWin({
      title: "编辑物资",
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
        JsonData.prj_materialpic = upload.getUploadImgList('material_picurl');
        JsonData.material_id = selRows[0].material_id;
        JsonData.store_location = $(".edit_info_btn").attr("data-id");

        var material_name = JsonData.material_name
        var material_spec = JsonData.material_spec
        var custodian_name = JsonData.custodian_name
        var custodian_phone = JsonData.custodian_phone
        var use_year = JsonData.use_year
        var price = JsonData.price
        JsonData = JSON.stringify(JsonData);

        storeLocationId = { store_location: $(".edit_info_btn").attr("data-id") }
        util.requestData({
          url: conf.baseUrl + "prj/updateMaterial",
          type: "post",
          data: JsonData,
          'contentType': "application/json",
          success: function (res) {
            if (res.result) {
              util.showToast("编辑物资成功", "success");
              if (flag) {
                yt.tableInit(storeLocationId);
                flag = false;
                return;
              }

              material.eq(2).text(material_name)
              material.eq(3).text(material_spec)
              material.eq(5).text(custodian_name)
              material.eq(6).text(custodian_phone)
              material.eq(7).text(use_year)
              material.eq(9).text(price)
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

        var thisForm1 = $("#suppliesInfoForm>div:nth-child(1) input");
        var thisForm2 = $("#suppliesInfoForm>div:nth-child(2) input");
        var thisForm3 = $("#suppliesInfoForm>div:nth-child(3) input");
        var thisForm4 = $("#suppliesInfoForm>div:nth-child(4) input");
        var thisForm5 = $("#suppliesInfoForm>div:nth-child(5) input");
        var thisForm6 = $("#suppliesInfoForm>div:nth-child(6) input");
        var material = $("table input:checked").parents("tr").children();

        thisForm1.val(material.eq(2).text());
        thisForm2.val(material.eq(3).text());
        thisForm3.val(material.eq(5).text());
        thisForm4.val(material.eq(6).text());
        thisForm5.val(material.eq(7).text());
        thisForm6.val(material.eq(9).text());

        var imgList = curRow.prj_materialpic;
        var imgContainHtml = "";

        var thisForm = $("#suppliesInfoForm>div:nth-child(1) input");
        thisForm.on("change", function () {
          flag = true;
        })

        //				编辑图片时候,首先读取图片
        for (var i in imgList) {
          imgContainHtml +=
            '<li>' +
            '<img uploadsrc="' + imgList[i].material_picurl + '" src= "' + conf.baseUrl + imgList[i].material_picurl + '" class="fileImg deviceLocalImg">' +
            '<img src="../source/mapShow/img/deleteImg.png" class="deleteImg">' +
            '</li>'
        }
        $("#imgDeviceFilesName").prepend(imgContainHtml);
        upload.loadUploadFile('addDeviceImg', 'imgDeviceFilesName', 'img');
        // $(".use_year").ytCalendar({});
        // 加日历的初始化
        $('.use_year').datetimepicker({
          forceParse: true,
          startView: 4,
          minView: 2,
          autoclose: true,
          format: 'yyyy-mm-dd',
          language: 'zh-CN',
        });
      }
    });
  }

  // 导入物资
  yt.leadingInMaterial = function () {
    var obj = $("input")[0]
    $("input").on("change", function () {
      if (!obj.files) {
        return;
      }

      if (obj.files[0].name.indexOf("xls") === -1) {
        alert("请导入excel文件");
        return;
      }

      var f = obj.files[0];
      var reader = new FileReader();
      reader.readAsBinaryString(f);
      reader.onload = function (e) {
        var data = e.target.result;
        var zzexcel = XLSX.read(data, {
          type: 'binary'
        });

        var result = XLSX.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[0]])

        var arr = [];
        var id = $(".leadingIn").attr("data-id");
        storeLocationId = { store_location: id }
        for (var i = 0; i < result.length; i++) {
          var dateArr = result[i].生产日期.split("/")
          var DateStr = "20" + dateArr[2] + "-" + (dateArr[1].length === 1 ? "0" + dateArr[1] : dateArr[1]) + "-" + (dateArr[0].length === 1 ? "0" + dateArr[0] : dateArr[0]);

          var obj = {};
          obj.material_name = result[i].物资名称;
          obj.material_spec = result[i].规格;
          obj.store_location = id;
          obj.custodian_name = result[i].保管人姓名;
          obj.custodian_phone = result[i].保管人手机;
          obj.stock_amount = result[i].库存;
          if (result[i].生产日期) obj.use_year = DateStr;
          obj.status = result[i].当前状态 || "";
          obj.price = result[i].价格;
          arr.push(obj)
        }

        util.requestData({
          url: conf.baseUrl + "prj/addMultiMaterial",
          data: JSON.stringify(arr),
          contentType: "application/json",
          type: "post",
          success: function (res) {
            util.showToast("导入物资成功", "success");
            yt.tableInit(storeLocationId);
          }
        })
      }
    })
  }

  // 导出物资
  yt.deriveMaterial = function () {
    var titleId = $(".derive").attr("data-id");
    var titleText = $(".derive").attr("data-name");

    util.requestData({
      url: conf.baseUrl + "prj/getMaterialList",
      data: { store_location: titleId },
      success: function (res) {
        var res = res.reverse()
        console.log(res)
        $(".derive_table tr").remove()
        var contentHtml = '<tr class="firstTr">' +
          '<td colspan="12" align="center" style="font-size: 18px;">' + titleText + '防汛物资</td></tr>' +
          '<tr class="theader content">' +
          '<td colspan="2">物资名称</td>' +
          '<td colspan="1">规格</td>' +
          '<td colspan="2">库存</td>' +
          '<td colspan="2">保管人姓名</td>' +
          '<td colspan="2">保管人手机</td>' +
          '<td colspan="2">生产日期</td>' +
          '<td colspan="1">价格</td>' +
          '</tr>';

        for (var i = 0; i < res.length; i++) {
          contentHtml += '<tr class = "content">' +
            '<td colspan="2">' + (res[i].material_name || "-") + '</td>' +
            '<td colspan="1">' + (res[i].material_spec || "-") + '</td>' +
            '<td colspan="2">' + (res[i].stock_amount || "-") + '</td>' +
            '<td colspan="2">' + (res[i].custodian_name || "-") + '</td>' +
            '<td colspan="2">' + (res[i].custodian_phone || "-") + '</td>' +
            '<td colspan="2">' + (res[i].use_year || "-") + '</td>' +
            '<td colspan="1">' + (res[i].price || "-") + '</td>' +
            '</tr>';
        }

        $(".derive_table").append(contentHtml);
        util.downLoadExcel("table")
      }
    })
  }

  // 物资图片显示
  yt.picShow = function (row) {
    var id = row.material_id;
    var name = row.material_name;
    var materialpicList = row.prj_materialpic;

    var imgList = "";
    for (var j = 0; j < materialpicList.length; j++) {
      imgList += "<li class='swiper-slide goods_pic'><img src='" + conf.baseUrl + materialpicList[j].material_picurl + "'width='100%'></li>"
    }

    $.window({
      title: name + "-实物图片",
      fullScreen: false,
      width: $(window).width() * 0.8,
      height: $(window).height() * 0.8,
      text:
        "<div id='banner-list'class='swiper-container'>" +
        "<ul class='swiper-wrapper goods_ul'>" + imgList + "</ul>" +
        "<div class='left_icon'><</div>" +
        "<div class='right_icon'>></div>" +
        "</div>",
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
      // console.log(picCount);
      if (picCount < 0) {
        picCount = $(".goods_pic").length - 1;
      }
      $(".goods_pic").eq(picCount).fadeIn().siblings().fadeOut();
    });
  }

  // 出入库详情
  yt.inOutSuppliesWin = function (row) {
    $(".detailsBox").addClass("detailsMask");

    var name = row.material_name;
    var mId = row.material_id;
    $.window({
      title: name + "-出入库详情",
      fullScreen: false,
      width: 700,
      height: $(window).height() * 0.8,
      text: "<table style='padding:0 5px' id='inOutSuppliesTable'></table>"
    });

    $("#inOutSuppliesTable").bootstrapTable({
      url: conf.baseUrl + "prj/getMaterialChange",
      queryParams: {
        material_id: mId
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
        title: '类型',
        field: 'change_type',
        align: 'center'
      }, {
        title: '时间',
        field: 'change_date',
        align: 'center'
      }, {
        title: '用途/来源',
        field: 'purpose',
        align: 'center'
      }, {
        title: '变化数量',
        field: 'amount',
        align: 'center'
      }, {
        title: '当前数量',
        field: 'remain_amount',
        align: 'center'
      }]

    });

    $(".window_closeIcon").on("click", function () {
      $(".detailsBox").removeClass("detailsMask");
    });
  };

  // 给虚拟仓库加个DIV，取消点击
  function treeAppend(Dom, mask_box, mask_add, nodeAdd) {
    Dom.append('<div class="' + mask_box + '"></div>');
    $("." + mask_box).append('<span class="' + mask_add + ' hide"></span>');
    $("." + mask_add).on("click", function () {
      yt.treeEvent.addDepartment(nodeAdd, "root");
    })

    if (personType.indexOf("管理员") !== -1) {
      $("#manageUnitContainer").on("mouseover", "." + mask_box, function () {
        $("." + mask_add).removeClass("hide")
      });
    }
    $("#manageUnitContainer").on("mouseout", "." + mask_box, function () {
      $("." + mask_add).addClass("hide")
    });
  }
  // 页面初始化
  yt.init();

});
