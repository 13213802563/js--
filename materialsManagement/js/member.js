require.config({
  baseUrl: "../",
  paths: {
    jquery: "plugins/jquery/jquery-1.10.2",
    config: "source/public/js/config", // 参数配置文件
    // subConfig: "source/systemManage/js/config", // 参数配置文件
    util: "source/public/js/util",
    bootstrap: "plugins/bootstrap/js/bootstrap.min",
    'bootstrap.table': "plugins/bootstrap/bootstrap.table/bootstrap-table",
    'bootstrap.local': "plugins/bootstrap/js/bootstrap-table-zh-CN.min",
    'bootstrap.validate': "plugins/bootstrap/js/bootstrap-validator.min"
  },
  shim: {
    "util": ["jquery"],
    'bootstrap': ['jquery'],
    'bootstrap.validate': ['bootstrap'],
    'bootstrap.table': ['bootstrap'],
    'bootstrap.local': ['bootstrap', 'bootstrap.table'],
  }

});

requirejs(["jquery", "config", "util", 'bootstrap.table', 'bootstrap.local', 'bootstrap.validate'], function ($, conf) {

  var yt = {};

  // 页面初始化
  yt.init = function () {
    yt.tableInit();
  }

  // 获取物资
  yt.tableInit = function () {
    util.requestData({
      url: conf.baseUrl + "prj/getYtPrjMaterialCount",
      data: { store_location: "STO0071" },
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
          searchAlign: 'left',
          maintainSelected: false,
          columns: [
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
              field: 'material_count',
              align: 'center'
            }],
        });
      }
    })

  }

  // 导出功能
  $(".derive").on("click", function () {
    util.requestData({
      url: conf.baseUrl + "prj/getYtPrjMaterialCount",
      data: { store_location: "STO0071" },
      success: function (res) {
        var res = res.reverse()

        var contentHtml = '<tr class="firstTr">' +
          '<td colspan="12" align="center" style="font-size: 18px;">防指成员单位防汛物资统计</td></tr>' +
          '<tr class="theader content">' +
          '<td colspan="4">物资名称</td>' +
          '<td colspan="4">规格</td>' +
          '<td colspan="4">库存</td>' +
          '</tr>';

        for (var i = 0; i < res.length; i++) {
          contentHtml += '<tr class = "content"><td colspan="4">' + res[i].material_name + '</td>' +
            '<td colspan="4">' + res[i].material_spec + '</td>' +
            '<td colspan="4">' + res[i].material_count + '</td></tr>';
        }

        $(".derive_table").append(contentHtml);
        util.downLoadExcel("table")
      }
    })
  });

  // 打印功能
  var count = 34;
  var num = 37;
  var page = 3;
  $(".print").on("click", function () {
    util.requestData({
      url: conf.baseUrl + "prj/getYtPrjMaterialCount",
      data: { store_location: "STO0071" },
      success: function (res) {
        var res = res.reverse()
        var title = '<p style="text-align: center;  font-size: 28px; ">' + '防指成员单位防汛物资统计</p>'
        if (res.length > count) {
          firstSum = count
        } else {
          firstSum = res.length;
        }
        render(title, res, 0, firstSum)

        if (res.length > count) {
          for (var j = 0; j < Math.ceil((res.length - 34) / 37); j++) {
            var sum = count + num
            if (sum > res.length) sum = res.length

            render("", res, count, sum)
            count = (37 * (page - 2)) + 34;
            page++;
          }
        }

        var newWin = window.open("");//新打开一个空窗口
        newWin.document.write('<style>table{page-break-after:always}</style>');//将表格添加进新的窗口
        newWin.document.write($("#realHtml").prop("outerHTML"));//将表格添加进新的窗口
        newWin.document.close();//在IE浏览器中使用必须添加这一句
        newWin.focus();//在IE浏览器中使用必须添加这一句
        newWin.print();//打印
        newWin.close();//关闭窗口
      }
    })
  })

  function render(title, res, count, sum) {
    var html = title +
      '<table border="1" cellspacing="0"  cellpadding="5" class="realHtml" style="border-collapse:collapse;font-size: 12px; text-align: center; width:100%">' +
      '<tr>' +
      '<td>序号</td>' +
      '<td>物质名称</td>' +
      '<td>规格</td>' +
      '<td>库存</td>' +
      '</tr>';
    for (var i = count; i < sum; i++) {
      html += '<tr class="tbody">' +
        '<td>' + (i + 1) + '</td>' +
        '<td>' + res[i].material_name + '</td>' +
        '<td>' + res[i].material_spec + '</td>' +
        '<td>' + res[i].material_count + '</td>' +
        '</tr>'
    }
    html += '</table>';
    $("#realHtml").append(html);
  }
  // 页面初始化
  yt.init();
});
